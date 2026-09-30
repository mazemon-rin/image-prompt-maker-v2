import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createPromptModel, buildCore, adaptPrompt } from '../src/prompt-builder.mjs';
import { ids } from '../src/prompt-dictionary.mjs';
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
