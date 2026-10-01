import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createPromptModel, buildCore, adaptPrompt, createCharacterSheetModel, buildCharacterSheetPrompt } from '../src/prompt-builder.mjs';
import { ids, textIds } from '../src/prompt-dictionary.mjs';
import { validateBackupPayload } from '../src/storage.mjs';

test('Prompt Dictionary has the formal 8x8x8 combinations', () => {
  assert.equal(ids.style.length, 8);
  assert.equal(ids.composition.length, 8);
  assert.equal(ids.lighting.length, 8);
  assert.equal(ids.style.length * ids.composition.length * ids.lighting.length, 512);
});

test('Prompt Builder keeps the PromptModel core fields', () => {
  const model = createPromptModel({ subject: 'a girl by the sea', style: 'watercolor', composition: 'wide-shot', lighting: 'sunset' });
  const prompt = buildCore(model);
  assert.match(prompt, /a girl by the sea/);
  assert.match(prompt, /watercolor/);
  assert.match(prompt, /wide shot/);
  assert.match(prompt, /sunset/);
});

test('Adapters preserve the same semantic core', () => {
  const model = createPromptModel({ subject: 'a cat', negative: ['text', 'watermark'] });
  for (const adapter of ['generic', 'chatgpt', 'gemini']) assert.match(adaptPrompt(model, adapter), /a cat/);
});

test('Adjustment values are bounded to the dictionary levels', () => {
  const prompt = buildCore(createPromptModel({ subject: 'test', adjustments: { detail: 99, color: -5 } }));
  assert.match(prompt, /highly detailed/);
  assert.match(prompt, /muted colors/);
});

test('Backup validation rejects empty, malformed, and unknown versions', () => {
  for (const payload of [null, {}, { schemaVersion: 999, stores: {} }, { schemaVersion: 1 }]) {
    assert.throws(() => validateBackupPayload(payload), /Unsupported or invalid backup/);
  }
  assert.equal(validateBackupPayload({ schemaVersion: 1, stores: {} }), true);
});

test('Text overlay disabled preserves the legacy prompt and model compatibility', () => {
  const legacy = createPromptModel({ subject: 'a cat' });
  assert.equal(legacy.textOverlay.enabled, false);
  assert.doesNotMatch(buildCore(legacy), /include the text/);
});

test('Text overlay adds content, style, layout, position, size, and overlap guidance', () => {
  const model = createPromptModel({ subject: 'a girl', negative: ['text', 'logo'], textOverlay: { enabled: true, content: '夏の思い出', style: 'bold', layout: 'top-title', position: 'top-center', size: 'large', avoidSubjectOverlap: true } });
  const prompt = buildCore(model);
  assert.match(prompt, /夏の思い出/);
  assert.match(prompt, /bold strong typography/);
  assert.match(prompt, /top title text/);
  assert.match(prompt, /top center/);
  assert.match(prompt, /large/);
  assert.match(prompt, /do not cover the main subject/);
  assert.doesNotMatch(prompt, /text, logo/);
  for (const adapter of ['chatgpt', 'gemini', 'generic']) assert.match(adaptPrompt(model, adapter), /夏の思い出/);
});

test('Text dictionaries expose the formal 8 layouts, 9 positions, and 3 sizes', () => {
  assert.equal(textIds.style.length, 8);
  assert.equal(textIds.layout.length, 8);
  assert.equal(textIds.position.length, 9);
  assert.equal(textIds.size.length, 3);
});

test('Character Sheet prompt is optional and keeps legacy prompts unchanged', () => {
  const sheet = createCharacterSheetModel({ characterInfo: { name: 'Mina', hair: 'brown bob', fixed: 'blue pendant' }, adapter: 'chatgpt' });
  const prompt = buildCharacterSheetPrompt(sheet, sheet.adapter);
  assert.match(prompt, /attached reference image/);
  assert.match(prompt, /front, three-quarter, side, and back/);
  assert.match(prompt, /neutral, smiling, surprised/);
  assert.match(prompt, /Keep the face/);
  assert.match(prompt, /Mina/);
  for (const adapter of ['chatgpt', 'gemini', 'generic']) assert.match(buildCharacterSheetPrompt(sheet, adapter), /character sheet/iu);
  assert.doesNotMatch(buildCore(createPromptModel({ subject: 'a cat' })), /character sheet/iu);
});

test('Character Sheet supports optional legacy-safe character information', () => {
  const sheet = createCharacterSheetModel();
  assert.equal(sheet.characterInfo.name, '');
  assert.equal(sheet.adapter, 'generic');
  assert.doesNotThrow(() => buildCharacterSheetPrompt(sheet));
});

test('Character Sheet keeps type and outfit choices optional and consistency-safe', () => {
  const sheet = createCharacterSheetModel({ characterType: 'female', outfitStyle: 'winter', characterInfo: { outfit: '' } });
  const prompt = buildCharacterSheetPrompt(sheet);
  assert.equal(sheet.characterType, 'female');
  assert.equal(sheet.outfitStyle, 'winter');
  assert.match(prompt, /female character/);
  assert.match(prompt, /winter clothing/);
  assert.match(prompt, /changing only the clothing/);
  const legacy = createCharacterSheetModel({ characterInfo: { name: 'Legacy' } });
  assert.doesNotThrow(() => buildCharacterSheetPrompt(legacy));
});

test('Character Sheet prioritizes a specific outfit over the visual outfit mood', () => {
  const prompt = buildCharacterSheetPrompt(createCharacterSheetModel({ outfitStyle: 'casual', characterInfo: { outfit: 'red kimono' } }));
  assert.match(prompt, /red kimono/);
  assert.match(prompt, /prioritize that specific outfit/);
});

test('Normal flow keeps character usage optional and supports outfit override', () => {
  const legacy = createPromptModel({ subject: 'a temple' });
  assert.equal(legacy.characterUsage, 'without-character');
  assert.doesNotMatch(buildCore(legacy), /character identity|outfit/iu);
  const free = createPromptModel({ subject: 'a person', characterUsage: 'with-character', characterMode: 'free-character', outfitStyle: 'summer' });
  assert.match(buildCore(free), /summer clothing/);
  const sheet = createPromptModel({ subject: 'a person', characterUsage: 'with-character', characterMode: 'character-sheet', outfitStyle: 'uniform' });
  assert.match(buildCore(sheet), /same character identity/);
  assert.match(buildCore(sheet), /uniform/);
});

test('No-character flow uses five scenery compositions without person terms', () => {
  const ids = ['closeup', 'near', 'standard', 'wide', 'panorama'];
  const prompts = ids.map((sceneryComposition) => buildCore(createPromptModel({ subject: 'a Japanese temple', characterUsage: 'without-character', sceneryComposition })));
  assert.match(prompts[0], /close-up detail-focused/);
  assert.match(prompts[4], /panoramic expansive establishing/);
  prompts.forEach((prompt) => assert.doesNotMatch(prompt, /bust-up|full-body|character identity|outfit/iu));
  assert.match(buildCore(createPromptModel({ subject: 'a person', characterUsage: 'with-character', composition: 'bust-up' })), /bust-up/);
});

test('人物あり without Character Sheet explicitly includes a person', () => {
  const prompt = buildCore(createPromptModel({ subject: 'a temple', characterUsage: 'with-character', characterMode: 'free-character' }));
  assert.match(prompt, /include a person in the scene/);
  assert.doesNotMatch(prompt, /same face|Character Sheet/iu);
});

test('人物あり with Character Sheet includes the reference person and preserves identity', () => {
  const prompt = buildCore(createPromptModel({ subject: 'a temple', characterUsage: 'with-character', characterMode: 'character-sheet' }));
  assert.match(prompt, /referenced Character Sheet image/);
  assert.match(prompt, /same face/);
  assert.match(prompt, /reference image outfit/);
});

test('人物なし excludes person, Character Sheet, and outfit instructions', () => {
  const prompt = buildCore(createPromptModel({ subject: 'a temple', characterUsage: 'without-character', characterMode: 'character-sheet', outfitStyle: 'uniform', character: { prompt: 'Character Sheet person' } }));
  assert.doesNotMatch(prompt, /include a person|Character Sheet|outfit|uniform|character sheet person/iu);
});

test('Character Sheet outfit change keeps identity and changes only the outfit', () => {
  const prompt = buildCore(createPromptModel({ subject: 'a temple', characterUsage: 'with-character', characterMode: 'character-sheet', outfitStyle: 'summer' }));
  assert.match(prompt, /include the person from the referenced Character Sheet image/);
  assert.match(prompt, /same character identity/);
  assert.match(prompt, /Change only the outfit/);
  assert.match(prompt, /summer clothing/);
});
