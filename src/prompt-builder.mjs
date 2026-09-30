import { dictionary } from './prompt-dictionary.mjs';

export function createPromptModel(overrides = {}) {
  return {
    version: 1,
    subject: '',
    character: null,
    style: 'anime',
    composition: 'bust-up',
    lighting: 'natural-light',
    adjustments: { detail: 2, color: 2, background: 2, mood: 2 },
    negative: [],
    adapter: 'generic',
    ...overrides,
    adjustments: { detail: 2, color: 2, background: 2, mood: 2, ...(overrides.adjustments || {}) }
  };
}

export function buildCore(model) {
  const m = createPromptModel(model);
  const parts = [m.subject.trim(), m.character?.prompt || '', dictionary.style[m.style], dictionary.composition[m.composition], dictionary.lighting[m.lighting]];
  for (const key of Object.keys(dictionary.adjustment)) parts.push(dictionary.adjustment[key][Math.max(0, Math.min(4, Number(m.adjustments[key] ?? 2)))]);
  return parts.filter(Boolean).join(', ');
}

export function adaptPrompt(model, adapter = model.adapter || 'generic') {
  const core = buildCore(model);
  const negatives = (model.negative || []).map((id) => dictionary.negative[id]).filter(Boolean);
  if (adapter === 'chatgpt') return `Create an image based on this description:\n${core}${negatives.length ? `\nAvoid: ${negatives.join(', ')}` : ''}`;
  if (adapter === 'gemini') return `Image prompt:\n${core}${negatives.length ? `\nPlease avoid ${negatives.join(', ')}.` : ''}`;
  return `${core}${negatives.length ? `\nNegative: ${negatives.join(', ')}` : ''}`;
}
