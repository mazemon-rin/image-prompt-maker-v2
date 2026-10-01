import { dictionary } from './prompt-dictionary.mjs';

export function createPromptModel(overrides = {}) {
  return {
    version: 1,
    subject: '',
    character: null,
    characterUsage: 'without-character',
    characterMode: 'free-character',
    outfitStyle: '',
    sceneryComposition: '',
    style: 'anime',
    composition: 'bust-up',
    lighting: 'natural-light',
    adjustments: { detail: 2, color: 2, background: 2, mood: 2 },
    negative: [],
    adapter: 'generic',
    textOverlay: { enabled: false, content: '', style: 'simple', layout: 'center-large', position: 'center', size: 'medium', avoidSubjectOverlap: true },
    ...overrides,
    adjustments: { detail: 2, color: 2, background: 2, mood: 2, ...(overrides.adjustments || {}) },
    textOverlay: { enabled: false, content: '', style: 'simple', layout: 'center-large', position: 'center', size: 'medium', avoidSubjectOverlap: true, ...(overrides.textOverlay || {}) }
  };
}

export function buildCore(model) {
  const m = createPromptModel(model);
  const outfitLabels = { casual: 'casual clothing', smart: 'smart casual clothing', sporty: 'sporty clothing', outer: 'outerwear', uniform: 'uniform', summer: 'summer clothing', winter: 'winter clothing', unique: 'distinctive clothing' };
  const composition = m.characterUsage === 'without-character' && m.sceneryComposition ? dictionary.sceneryComposition[m.sceneryComposition] || dictionary.sceneryComposition.standard : dictionary.composition[m.composition];
  const usesCharacter = Object.prototype.hasOwnProperty.call(model, 'characterUsage') ? m.characterUsage === 'with-character' : Boolean(m.character?.prompt);
  const personInstruction = usesCharacter
    ? m.characterMode === 'character-sheet'
      ? 'include the person from the referenced Character Sheet image in the scene; preserve the same face, perceived age, hairstyle, hair color, eyes, body proportions, height ratio, and distinctive features'
      : 'include a person in the scene without fixing gender, age, or appearance'
    : '';
  const parts = [m.subject.trim(), personInstruction, usesCharacter ? m.character?.prompt || '' : '', dictionary.style[m.style], composition, dictionary.lighting[m.lighting]];
  if (usesCharacter && m.outfitStyle) {
    if (m.characterMode === 'character-sheet') parts.push(`Keep the same character identity, face, perceived age, hairstyle, hair color, eyes, body proportions and distinctive features. Change only the outfit according to the selected style: ${outfitLabels[m.outfitStyle] || m.outfitStyle}. Prioritize this selected outfit over the Character Sheet base outfit.`);
    else parts.push(`Create the character wearing ${outfitLabels[m.outfitStyle] || m.outfitStyle}.`);
  } else if (usesCharacter && m.characterMode === 'character-sheet') {
    parts.push('keep the Character Sheet or reference image outfit, colors, and accessories consistent');
  }
  for (const key of Object.keys(dictionary.adjustment)) parts.push(dictionary.adjustment[key][Math.max(0, Math.min(4, Number(m.adjustments[key] ?? 2)))]);
  if (m.textOverlay.enabled && m.textOverlay.content.trim()) {
    const t = m.textOverlay;
    parts.push(`include the text "${t.content.trim()}" in ${dictionary.textStyle[t.style] || dictionary.textStyle.simple}, ${dictionary.textLayout[t.layout] || dictionary.textLayout['center-large']}, at the ${dictionary.textPosition[t.position] || dictionary.textPosition.center} in a ${dictionary.textSize[t.size] || dictionary.textSize.medium} size`);
    if (t.avoidSubjectOverlap) parts.push('do not cover the main subject or face, use available whitespace');
  }
  return parts.filter(Boolean).join(', ');
}

export function adaptPrompt(model, adapter = model.adapter || 'generic') {
  const core = buildCore(model);
  const negatives = (model.negative || []).filter((id) => !(model.textOverlay?.enabled && id === 'text')).map((id) => dictionary.negative[id]).filter(Boolean);
  if (adapter === 'chatgpt') return `Create an image based on this description:\n${core}${negatives.length ? `\nAvoid: ${negatives.join(', ')}` : ''}`;
  if (adapter === 'gemini') return `Image prompt:\n${core}${negatives.length ? `\nPlease avoid ${negatives.join(', ')}.` : ''}`;
  return `${core}${negatives.length ? `\nNegative: ${negatives.join(', ')}` : ''}`;
}

export function createCharacterSheetModel(overrides = {}) {
  return { characterType: overrides.characterType || 'unspecified', outfitStyle: overrides.outfitStyle || '', characterInfo: { name: '', age: '', gender: '', hair: '', eyes: '', outfit: '', body: '', features: '', fixed: '', ...(overrides.characterInfo || {}) }, views: true, expressions: true, details: true, adapter: overrides.adapter || 'generic' };
}

export function buildCharacterSheetPrompt(model, adapter = model.adapter || 'generic') {
  const info = model.characterInfo || {};
  const typeLabels = { male: 'male character', female: 'female character', unspecified: '' };
  const outfitLabels = { casual: 'casual', smart: 'smart casual', sporty: 'sporty', outer: 'outerwear', uniform: 'uniform', summer: 'summer clothing', winter: 'winter clothing', unique: 'distinctive clothing' };
  const typedDetails = [typeLabels[model.characterType] || '', model.outfitStyle ? `preferred outfit mood: ${outfitLabels[model.outfitStyle] || model.outfitStyle}` : ''].filter(Boolean);
  const details = [...typedDetails, ...Object.entries(info).filter(([, value]) => String(value).trim()).map(([key, value]) => `${key}: ${String(value).trim()}`)].join(', ');
  const outfitRule = model.outfitStyle || info.outfit ? 'Keep the same face, perceived age, hairstyle, hair color, eyes, body proportions, height ratio, and distinctive features while changing only the clothing. If a specific outfit is written by the user, prioritize that specific outfit over the selected outfit mood.' : '';
  const core = `Using the attached reference image as the highest priority, create an organized character sheet for the same character. ${details ? `Optional character information: ${details}. ` : ''}Show full-body views from front, three-quarter, side, and back; face views from front, three-quarter, and side; expressions including neutral, smiling, surprised, and worried or sad; and clear details of hair, eyes, outfit, shoes, accessories, and distinctive features. Keep the face, perceived age, hairstyle, hair color, eyes, body proportions, outfit, colors, accessories, and unique traits consistent in every view. ${outfitRule} Do not change the face, age, clothes, or accessories unless the selected outfit change specifically requests a clothing-only change. Do not add extra people or objects. Use a simple background, separate each view clearly, and format everything as a readable character sheet. Attach the reference image with this prompt.`;
  if (adapter === 'chatgpt') return `Create an image based on this character sheet instruction:\n${core}`;
  if (adapter === 'gemini') return `Character sheet image prompt:\n${core}`;
  return core;
}
