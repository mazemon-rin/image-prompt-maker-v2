export const dictionary = {
  style: {
    anime: 'Japanese anime-style illustration, clean linework, clear character features, balanced cel-style coloring',
    illustration: 'polished digital illustration, clean shapes, balanced detail, natural stylization, refined illustration finish',
    realistic: 'realistic visual rendering, natural proportions, detailed textures, realistic depth and lighting, lifelike appearance',
    'manga-lineart': 'manga-style line art, expressive ink lines, monochrome drawing, clear contour work',
    watercolor: 'delicate watercolor illustration, translucent colors, soft paper texture, gentle brushwork',
    'oil-painting': 'oil painting style, visible brush strokes, rich pigment, warm painterly texture',
    'simple-flat': 'simple flat illustration, clean shapes, limited colors, minimal detail, clear composition',
    'pop-cute': 'cute pop illustration, cheerful colors, charming simplified features, playful atmosphere'
  },
  composition: {
    'face-closeup': 'face close-up composition', 'bust-up': 'bust-up composition', 'upper-body': 'upper-body composition',
    'full-body': 'full-body composition', 'wide-shot': 'wide shot composition', 'side-view': 'side view composition',
    'low-angle': 'low-angle composition', 'high-angle': 'high-angle composition'
  },
  sceneryComposition: {
    closeup: 'close-up detail-focused composition', near: 'close view subject-dominant composition', standard: 'medium-wide balanced environmental composition', wide: 'wide environmental composition', panorama: 'panoramic expansive establishing view'
  },
  lighting: {
    'natural-light': 'natural light', bright: 'bright lighting', 'soft-light': 'soft soft-lighting', sunset: 'warm sunset light',
    night: 'quiet night lighting', cinematic: 'cinematic lighting', dreamy: 'dreamy atmospheric light', dramatic: 'dramatic vivid lighting'
  },
  adjustment: {
    detail: ['simple details', 'balanced details', 'moderate detail', 'rich detail', 'highly detailed'],
    color: ['muted colors', 'natural colors', 'balanced colors', 'vivid colors', 'bold saturated colors'],
    background: ['simple background', 'clean background', 'supporting background', 'detailed background', 'rich environmental detail'],
    mood: ['calm mood', 'gentle mood', 'balanced mood', 'lively mood', 'dramatic mood']
  },
  negative: {
    text: 'text', logo: 'logo', watermark: 'watermark', 'extra-objects': 'extra objects', clutter: 'clutter', distortion: 'distortion'
  },
  textStyle: {
    simple: 'simple readable typography', bold: 'bold strong typography', elegant: 'elegant refined typography', cute: 'cute friendly typography', handwritten: 'handwritten typography', retro: 'retro typography', pop: 'pop typography', futuristic: 'futuristic typography'
  },
  textLayout: {
    'center-large': 'large centered text', 'top-title': 'top title text', 'bottom-title': 'bottom title text', 'left-aligned': 'left-aligned text', vertical: 'vertical text', diagonal: 'diagonal text', arch: 'arched text', dynamic: 'dynamic text layout'
  },
  textPosition: {
    'top-left': 'top left', 'top-center': 'top center', 'top-right': 'top right', 'center-left': 'center left', center: 'center', 'center-right': 'center right', 'bottom-left': 'bottom left', 'bottom-center': 'bottom center', 'bottom-right': 'bottom right'
  },
  textSize: { small: 'small', medium: 'medium', large: 'large' }
};

export const sampleLabels = {
  style: { anime: 'アニメ風', illustration: 'イラスト風', realistic: 'リアル風', 'manga-lineart': 'マンガ風（線画）', watercolor: '水彩風', 'oil-painting': '油彩風', 'simple-flat': 'シンプル・フラット', 'pop-cute': 'ポップ・かわいい' },
  composition: { 'face-closeup': '顔アップ', 'bust-up': 'バストアップ', 'upper-body': '上半身', 'full-body': '全身', 'wide-shot': '引き', 'side-view': '横から', 'low-angle': 'ローアングル', 'high-angle': '俯瞰（上から）' },
  lighting: { 'natural-light': '自然光', bright: '明るい', 'soft-light': '柔らかい', sunset: '夕暮れ', night: '夜', cinematic: 'シネマティック', dreamy: '幻想的', dramatic: 'ドラマチック' }
};

export const textLabels = {
  style: { simple: 'シンプル', bold: '力強い', elegant: '上品', cute: 'かわいい', handwritten: '手書き風', retro: 'レトロ', pop: 'ポップ', futuristic: '未来的' },
  layout: { 'center-large': '中央に大きく', 'top-title': '上部タイトル', 'bottom-title': '下部タイトル', 'left-aligned': '左寄せ', vertical: '縦書き', diagonal: '斜め', arch: 'アーチ', dynamic: 'ダイナミック' },
  position: { 'top-left': '左上', 'top-center': '上', 'top-right': '右上', 'center-left': '左', center: '中央', 'center-right': '右', 'bottom-left': '左下', 'bottom-center': '下', 'bottom-right': '右下' },
  size: { small: '小さめ', medium: '標準', large: '大きめ' }
};

export const ids = {
  style: Object.keys(dictionary.style),
  composition: Object.keys(dictionary.composition),
  lighting: Object.keys(dictionary.lighting),
  adjustment: Object.keys(dictionary.adjustment),
  negative: Object.keys(dictionary.negative)
};

export const textIds = { style: Object.keys(dictionary.textStyle), layout: Object.keys(dictionary.textLayout), position: Object.keys(dictionary.textPosition), size: Object.keys(dictionary.textSize) };
