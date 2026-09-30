# 画像生成プロンプトメーカー Ver.2
# Prompt Dictionary設計書 v1.0

## 1. 文書情報

- 文書名：画像生成プロンプトメーカー Ver.2 Prompt Dictionary設計書
- Version：1.0
- 対象：image-prompt-maker-v2
- 状態：正式設計
- 上位仕様：01-requirements.md
- UI仕様：02-ui-ux-design.md
- データ仕様：03-data-design.md

## 2. 目的

本辞書は、ユーザーが視覚的に選択した内容を
画像生成AIへ渡す意味情報へ変換するための正式辞書である。

基本構造：

作りたいもの
＋
絵柄
＋
構図
＋
光・雰囲気
＋
微調整
＋
キャラクター
＋
避けたいもの
↓
PromptModel
↓
Prompt Builder
↓
Adapter
↓
完成プロンプト

## 3. 基本方針

8絵柄 × 8構図 × 8光・雰囲気について、
512個の完成プロンプトを個別登録しない。

各要素を独立した意味ブロックとして管理し、
Prompt Builderで組み合わせる。

これにより、

8 × 8 × 8 = 512

の基本組み合わせを少数の辞書データから生成する。

さらにsubject、微調整、Character、negative等を加えることで、
固定512種類を超えた組み合わせを生成できる。

## 4. 辞書データ原則

各辞書項目は最低限、

- id
- label
- category
- prompt
- description

を持てる構造とする。

概念例：

{
  "id": "watercolor",
  "label": "水彩風",
  "category": "style",
  "prompt": "soft watercolor illustration...",
  "description": "..."
}

表示名とAI向け表現を分離する。

## 5. ID

IDは03-data-design.mdで定義した安定IDを使用する。

表示文言を変更してもIDを変更しないことを基本とする。

## 6. 日本語UI

ユーザー向けUIは日本語を基本とする。

例：

水彩風

内部：

watercolor

Prompt Dictionary：

soft watercolor illustration...

のように分離する。

## 7. Prompt言語

MVPではAIへ渡す意味ブロックとして、
英語表現を正式辞書として保持可能とする。

ただしユーザーへ完成プロンプトを日本語で表示するAdapterも
将来的に実装可能な構造とする。

辞書そのものをUI表示文章として直接使用しない。

## 8. subject

subjectは辞書化しない。

ユーザーが入力した「作りたいもの」を中心要素として扱う。

例：

夕暮れの海辺を歩く女の子

Prompt Builderは、
この入力を勝手に別テーマへ変更しない。

## 9. style辞書

正式8種類：

01 anime
02 illustration
03 realistic
04 manga-lineart
05 watercolor
06 oil-painting
07 simple-flat
08 pop-cute

正式比較シート：

images/samples/reference/style-reference.png

と対応する。

## 10. STYLE 01 anime

ID：

anime

表示：

アニメ風

意味：

日本の現代的なアニメーションを連想させる、
明瞭な輪郭、整理された色面、
読み取りやすい表情を持つスタイル。

Prompt Core：

Japanese anime-style illustration,
clean linework,
clear character features,
balanced cel-style coloring,
expressive but controlled facial features

避ける方向：

特定作品・特定作家の模倣を辞書へ固定しない。

## 11. STYLE 02 illustration

ID：

illustration

表示：

イラスト風

意味：

汎用性の高いデジタルイラスト。
写真ほど写実的ではなく、
アニメほど記号化しすぎない。

Prompt Core：

polished digital illustration,
clean shapes,
balanced detail,
natural stylization,
clear visual hierarchy,
refined illustration finish

## 12. STYLE 03 realistic

ID：

realistic

表示：

リアル風

意味：

現実の人物・物体・空間に近い質感、
光、立体感を重視する。

Prompt Core：

realistic visual rendering,
natural proportions,
physically plausible materials,
detailed textures,
realistic depth and lighting,
lifelike appearance

写真限定とはしない。

## 13. STYLE 04 manga-lineart

ID：

manga-lineart

表示：

マンガ風（線画）

意味：

線を中心に構成された漫画的表現。

Prompt Core：

manga-style line art,
clean expressive outlines,
controlled line weight,
clear black-and-white structure,
minimal unnecessary shading,
readable visual silhouette

## 14. STYLE 05 watercolor

ID：

watercolor

表示：

水彩風

意味：

水彩絵具の透明感、
柔らかな色の重なり、
紙ににじむような表現。

Prompt Core：

soft watercolor illustration,
translucent layered pigments,
gentle color bleeding,
subtle paper texture,
soft edges,
delicate hand-painted feeling

## 15. STYLE 06 oil-painting

ID：

oil-painting

表示：

油彩風

意味：

油絵の絵具感、
筆致、
色の厚みを感じる表現。

Prompt Core：

oil painting style,
visible painterly brushwork,
rich layered pigments,
textured painted surface,
deep color transitions,
traditional painted feeling

## 16. STYLE 07 simple-flat

ID：

simple-flat

表示：

シンプル・フラット

意味：

情報量を整理し、
単純な形と明快な色面で構成する。

Prompt Core：

simple flat illustration,
clean geometric shapes,
minimal detail,
clear color blocks,
simple readable forms,
uncluttered visual design

## 17. STYLE 08 pop-cute

ID：

pop-cute

表示：

ポップ・かわいい

意味：

明るく親しみやすく、
かわいらしさを感じる視覚表現。

Prompt Core：

cute pop illustration,
friendly rounded forms,
playful visual language,
bright cheerful feeling,
charming simplified details,
approachable character design

過度に幼児向けへ固定しない。

## 18. style共通ルール

styleは、

「何を描くか」

を変更しない。

styleが担当するのは、

「どのような視覚表現で描くか」

である。

subject、composition、lightingの責務をstyleへ混在させない。

## 19. composition辞書

正式8種類：

01 face-closeup
02 bust-up
03 upper-body
04 full-body
05 wide-shot
06 side-view
07 low-angle
08 high-angle

正式比較シート：

images/samples/reference/composition-reference.png

と対応する。

## 20. COMPOSITION 01 face-closeup

ID：

face-closeup

表示：

顔アップ

意味：

顔を主要な視覚要素として大きく見せる。

Prompt Core：

close-up framing focused on the face,
face occupying a large portion of the frame,
facial expression clearly visible,
minimal unnecessary surrounding space

人物以外のsubjectでは、
主要部分へのclose-upとして解釈可能にする。

## 21. COMPOSITION 02 bust-up

ID：

bust-up

表示：

バストアップ

意味：

胸付近から上を中心に見せる人物構図。

Prompt Core：

bust-up composition,
framed approximately from the chest upward,
clear view of the face and upper torso,
balanced portrait framing

## 22. COMPOSITION 03 upper-body

ID：

upper-body

表示：

上半身

意味：

腰付近から上を見せ、
顔・姿勢・腕の動きを表現しやすくする。

Prompt Core：

upper-body composition,
framed approximately from the waist upward,
clear upper-body pose,
room for natural arm gestures

## 23. COMPOSITION 04 full-body

ID：

full-body

表示：

全身

意味：

頭から足元まで全身を画面内に収める。

Prompt Core：

full-body composition,
entire subject visible from head to feet,
complete body silhouette within the frame,
balanced space around the subject

## 24. COMPOSITION 05 wide-shot

ID：

wide-shot

表示：

引き

意味：

subjectだけでなく周囲の環境も広く見せる。

Prompt Core：

wide shot,
subject shown within a broader environment,
strong sense of surrounding space,
environment and subject both clearly readable

## 25. COMPOSITION 06 side-view

ID：

side-view

表示：

横から

意味：

subjectを横方向から捉える。

Prompt Core：

side-view composition,
subject viewed primarily from the side,
clear profile or lateral silhouette,
composition emphasizing side-facing form

## 26. COMPOSITION 07 low-angle

ID：

low-angle

表示：

ローアングル

意味：

低い位置からsubjectを見上げる視点。

Prompt Core：

low-angle viewpoint,
camera positioned below the subject,
looking upward toward the subject,
enhanced sense of height and presence

「威圧的」等の感情効果を必須にはしない。

## 27. COMPOSITION 08 high-angle

ID：

high-angle

表示：

俯瞰（上から）

意味：

高い位置からsubjectを見下ろす視点。

Prompt Core：

high-angle viewpoint,
camera positioned above the subject,
looking downward,
clear top-down spatial relationship

完全な真上視点だけに限定しない。

## 28. composition共通ルール

compositionは、

- 距離
- フレーミング
- 視点
- カメラ位置

を担当する。

styleやlightingを変更しない。

## 29. 人物以外へのcomposition

subjectが人物とは限らない。

そのため、

face-closeup
bust-up
upper-body

等の人物向け名称が選択された場合でも、
Prompt Builder / Adapterが破綻しない構造にする。

MVPではUI説明で人物向け構図であることを示してよい。

将来的にはsubject typeによる構図辞書切替も可能とする。

## 30. 組み合わせ原則

例：

subject：
海辺を歩く女の子

style：
watercolor

composition：
full-body

の場合、

「海辺を歩く女の子」
+
「水彩表現」
+
「全身構図」

を独立して組み立てる。

辞書内に、

「海辺を歩く水彩風の女の子を全身で描く」

という固定完成文を登録しない。

## 31. 辞書責務の分離

STYLE：
視覚表現

COMPOSITION：
構図・視点

LIGHTING：
光・時間帯・空気感

ADJUSTMENTS：
程度の微調整

NEGATIVE：
避けたいもの

CHARACTER：
キャラクター一貫性

SUBJECT：
描きたい内容

をそれぞれ分離する。

## 32. PART1終了時点

PART1では以下を定義した。

- Prompt Dictionary基本構造
- subjectの扱い
- style 8種類
- composition 8種類
- 辞書責務の分離
- 512完成文を作らない方針

PART2では、

- lighting 8種類
- 微調整4軸
- negative
- Character
- Prompt Builder

を定義する。

## 33. lighting辞書

正式8種類：

01 natural-light
02 bright
03 soft-light
04 sunset
05 night
06 cinematic
07 dreamy
08 dramatic

正式比較シート：

images/samples/reference/lighting-reference.png

と対応する。

lightingは単なる明るさではなく、

- 光源
- 光の質
- 時間帯
- コントラスト
- 空気感

を表現する。

ただしstyleやcompositionの責務を奪わない。

## 34. LIGHTING 01 natural-light

ID：

natural-light

表示：

自然光

意味：

人工的に演出しすぎない、
自然な光環境。

Prompt Core：

natural lighting,
realistic light direction,
balanced highlights and shadows,
natural ambient illumination,
subtle and believable light behavior

屋外限定にはしない。

窓からの自然光等も含められる。

## 35. LIGHTING 02 bright

ID：

bright

表示：

明るい

意味：

全体的に明るく、
視認性の高い印象。

Prompt Core：

bright illumination,
high overall visibility,
clean luminous appearance,
well-lit subject,
clear and open visual feeling

白飛びを意味しない。

## 36. LIGHTING 03 soft-light

ID：

soft-light

表示：

柔らかい

意味：

強い影や硬い光を抑えた、
柔らかな光。

Prompt Core：

soft diffused lighting,
gentle shadows,
smooth light transitions,
low harshness,
soft flattering illumination

## 37. LIGHTING 04 sunset

ID：

sunset

表示：

夕暮れ

意味：

夕方から日没前後の暖かな光と空気感。

Prompt Core：

warm sunset lighting,
golden-hour atmosphere,
warm directional light,
soft long shadows,
subtle orange and golden tones

必ず太陽そのものを描画する指示にはしない。

## 38. LIGHTING 05 night

ID：

night

表示：

夜

意味：

夜間の低照度環境と、
夜らしい光のコントラスト。

Prompt Core：

nighttime lighting,
low ambient illumination,
controlled highlights,
deep but readable shadows,
clear nighttime atmosphere

単純に画像全体を暗くするだけにしない。

## 39. LIGHTING 06 cinematic

ID：

cinematic

表示：

シネマティック

意味：

映画的な光の演出と、
奥行きを感じる視覚表現。

Prompt Core：

cinematic lighting,
controlled contrast,
dimensional light and shadow,
atmospheric depth,
carefully shaped highlights,
film-like visual mood

特定映画や撮影監督の模倣を指定しない。

## 40. LIGHTING 07 dreamy

ID：

dreamy

表示：

幻想的

意味：

現実より少し非日常的で、
柔らかく幻想的な空気感。

Prompt Core：

dreamy atmospheric lighting,
soft luminous glow,
gentle haze,
subtle ethereal atmosphere,
delicate light diffusion,
slightly surreal visual mood

## 41. LIGHTING 08 dramatic

ID：

dramatic

表示：

ドラマチック

意味：

明暗差や方向性のある光を利用して、
視覚的な強さを作る。

Prompt Core：

dramatic lighting,
strong directional light,
pronounced light-and-shadow contrast,
focused highlights,
deep controlled shadows,
visually powerful illumination

過度な黒つぶれを必須にしない。

## 42. lighting共通ルール

lightingは、

- 光源
- 光の方向
- 明暗
- 光の柔らかさ
- 時間帯
- 空気感

を担当する。

compositionを変更しない。

subjectの内容を変更しない。

styleそのものを変更しない。

## 43. lightingの重複

natural-light、bright、soft-light等は、
現実には同時成立する場合がある。

MVPではユーザーが1種類を代表選択する。

将来的に複数選択へ拡張可能な構造を阻害しない。

## 44. 微調整の目的

絵柄・構図・光を選択した後、
ユーザーが結果の方向性を少し調整できるようにする。

微調整は新しいstyle等を追加する機能ではない。

選択済み要素の「程度」を調整する。

## 45. 微調整4軸

MVPの正式4軸を以下とする。

1. detail
2. color
3. background
4. mood

UI表示：

- 描き込み
- 色の強さ
- 背景の情報量
- 雰囲気の強さ

内部IDとUI表示名を分離する。

## 46. adjustment値

内部値は正規化された数値として扱える。

例：

0.0 ～ 1.0

中央：

0.5

概念：

0.0
かなり控えめ

0.25
控えめ

0.5
標準

0.75
強め

1.0
かなり強め

UIの実際の段階数は実装時に調整可能。

## 47. adjustmentの中立値

0.5を基本的な中立値とする。

中立値では、
不要な強調Promptを追加しない方式を優先する。

これにより完成Promptが無駄に長くなることを防ぐ。

## 48. ADJUSTMENT detail

ID：

detail

表示：

描き込み

目的：

視覚的な細部の情報量を調整する。

Low方向：

simplified details,
reduced fine detail,
clean visual information

High方向：

highly detailed,
rich fine details,
carefully rendered small elements,
refined surface information

重要：

detailを上げても、
背景だけを勝手に複雑化しない。

## 49. ADJUSTMENT color

ID：

color

表示：

色の強さ

目的：

彩度・色の存在感を調整する。

Low方向：

subdued colors,
restrained saturation,
calm color intensity

High方向：

vivid colors,
stronger color presence,
rich saturation,
clear color contrast

色相そのものを勝手に変更する指示ではない。

## 50. ADJUSTMENT background

ID：

background

表示：

背景の情報量

目的：

背景要素の密度を調整する。

Low方向：

minimal background detail,
simple unobtrusive surroundings,
reduced environmental elements

High方向：

richer environmental detail,
more developed surroundings,
additional contextual background elements

重要：

subjectより背景を優先する意味ではない。

## 51. ADJUSTMENT mood

ID：

mood

表示：

雰囲気の強さ

目的：

選択済みlightingやsubjectが持つ空気感の強度を調整する。

Low方向：

subtle atmosphere,
restrained mood,
natural understated feeling

High方向：

strong atmospheric presence,
enhanced emotional tone,
more pronounced visual mood

mood自体が
「明るい」「悲しい」等の新しい感情を勝手に追加しない。

## 52. 微調整と辞書

微調整値をそのまま、

detail: 0.73

のような数値としてAIへ送らない。

Prompt Builderが範囲を解釈し、
必要な自然言語へ変換する。

概念：

0.00～0.24 → low
0.25～0.39 → slightly-low
0.40～0.60 → neutral
0.61～0.75 → slightly-high
0.76～1.00 → high

正式な境界値は実装時にテストし調整可能。

## 53. 微調整の衝突防止

例：

style = simple-flat
detail = high

の場合でも、
写実的な超高精細写真へ変化させない。

「simple-flatというstyleの範囲内で、
通常より少し情報量を増やす」

と解釈する。

各adjustmentは、
選択されたstyle等の基本特性を破壊しない。

## 54. negativeの目的

ユーザーが「入れたくないもの」を指定できる。

negativeはpositive promptとデータ構造上分離する。

Adapterによって、

- 独立Negative Prompt
- 通常Prompt内の禁止指示

のどちらにも変換可能とする。

## 55. MVP Negative候補

初期候補：

text
logo
watermark
extra-objects
clutter
distortion

UI表示候補：

- 文字
- ロゴ
- 透かし
- 不要な物
- ごちゃつき
- 不自然な崩れ

最終UI表示は02-ui-ux-designとの整合を確認する。

## 56. NEGATIVE text

ID：

text

意味：

画像内の不要な文字を避ける。

Prompt：

avoid unwanted text,
avoid random lettering,
avoid unintended typography

必要な看板や指定文字まで常に禁止する意味にはしない。

## 57. NEGATIVE logo

ID：

logo

Prompt：

avoid unintended logos,
avoid unnecessary brand marks

## 58. NEGATIVE watermark

ID：

watermark

Prompt：

avoid watermarks,
avoid signature-like overlay marks

## 59. NEGATIVE extra-objects

ID：

extra-objects

Prompt：

avoid unnecessary extra objects,
avoid unrelated visual elements

## 60. NEGATIVE clutter

ID：

clutter

Prompt：

avoid excessive visual clutter,
keep the composition readable and organized

## 61. NEGATIVE distortion

ID：

distortion

Prompt：

avoid obvious visual distortions,
avoid malformed major shapes,
maintain coherent subject structure

人物だけを対象に限定しない。

## 62. Negative自由入力

将来的に自由入力Negativeを追加可能とする。

MVPで実装する場合も、
ユーザー入力をHTMLとして解釈しない。

## 63. Characterの目的

Characterは、
同じキャラクターを複数作品で再利用しやすくするための独立データである。

Ver.1.1の、

- 主人公設定
- 人物ルール
- 基準画像

の考え方を継承する。

## 64. Character Prompt

Character Promptは、

- basic
- appearance
- personality
- rules

等から組み立てる。

Character情報を1つの巨大な固定文字列だけで保存することを基本としない。

## 65. Character基本情報

例：

- 年代
- 人物タイプ
- 性別・雰囲気
- 役割

Prompt Builderは、
入力されている情報だけを利用する。

未指定情報を勝手に補完しない。

## 66. Character appearance

例：

- 髪型
- 服装
- 体型
- 特徴

画像生成上、
視覚的に意味のある情報を優先する。

## 67. Character personality

性格は、
必要に応じて表情・姿勢・雰囲気へ影響する補助情報として使用する。

例：

穏やか

を、

calm and gentle presence

等へ変換できる。

ただし性格から勝手に物語設定を作らない。

## 68. Character Rules

一貫性維持対象：

- 顔
- 髪型
- 輪郭
- 体型
- 服装
- 色
- キャラクター全体の雰囲気

概念Prompt：

maintain consistent character identity,
preserve facial features,
hairstyle,
body proportions,
clothing design,
main colors,
and overall character appearance

## 69. 基準画像

将来Character Reference Imageを利用する場合、

Prompt側では、

use the provided character reference as the primary visual reference

等の指示を利用可能。

ただしMVPではAI APIへ画像自動送信しない。

基準画像の存在と、
実際に画像生成AIへ添付したかどうかを混同しない。

## 70. Reference Image使用時

Reference Imageがある場合でも、
Promptだけで完全に同一人物を保証できるとは表現しない。

ユーザーがChatGPT等へPromptをコピーする方式では、
必要に応じて基準画像もユーザー自身が添付する。

## 71. Prompt Builder

Prompt BuilderはPromptModelを受け取り、
辞書から必要な意味ブロックを取得する。

概念：

subject
↓
style
↓
composition
↓
lighting
↓
adjustments
↓
character
↓
negative

## 72. Prompt Builder基本順序

positive側の基本順：

1. subject
2. character
3. style
4. composition
5. lighting
6. adjustments
7. quality / consistency instructions

negative側：

1. selected negatives
2. optional free negative

実際の文章順はAdapterが調整可能。

## 73. Prompt Builderの責務

Prompt Builderは、

- ID解決
- 辞書取得
- 中立adjustment省略
- 重複表現整理
- Character要素統合
- positive / negative分離

を担当する。

## 74. Prompt Builderがしないこと

Prompt Builderは、

- UI DOMを直接読む
- IndexedDBへ直接保存する
- AI APIを呼ぶ
- 画像を生成する
- 特定AI専用構文へ最終変換する

ことを担当しない。

## 75. 重複表現

例：

style：
soft watercolor illustration

lighting：
soft diffused lighting

のようにsoftが重複しても、
意味が異なる場合は機械的にすべて削除しない。

一方で、

highly detailed,
high detail,
detailed rendering

等の不要な同義反復は整理可能にする。

## 76. 矛盾する指定

辞書要素が意味的に衝突する場合でも、
勝手にユーザー選択を削除しない。

例：

simple-flat
+
detail high

は、

simple flat illustration with richer detail while preserving clean flat forms

のように、
styleを維持した範囲で解釈する。

## 77. 未知ID

辞書に存在しないIDがPromptModelへ入っていた場合、
アプリ全体を停止させない。

その要素を安全に省略し、
必要に応じて警告可能とする。

元データは勝手に別IDへ書き換えない。

## 78. Prompt長

Promptは長ければ良いわけではない。

同じ意味の反復を避け、
重要度の高い条件を明確にする。

初心者がコピー後に内容を確認できる程度の可読性を維持する。

## 79. PART2終了時点

PART2では以下を定義した。

- lighting 8種類
- 微調整4軸
- adjustment変換方針
- negative
- Character Prompt
- Reference Imageの扱い
- Prompt Builder
- 衝突・重複・未知ID処理

PART3では、

- ChatGPT Adapter
- Gemini Adapter
- Generic Adapter
- 完成Prompt形式
- 具体的組み合わせ例
- 512組み合わせテスト方針
- Dictionaryテスト
- 正式決定事項
- 次工程

を定義する。

## 80. Adapterの目的

Prompt Builderが生成した共通意味情報を、
出力先に適した形式へ整える。

初期Adapter：

- ChatGPT Adapter
- Gemini Adapter
- Generic Adapter

PromptModelそのものはAI別に分けない。

同一PromptModelから、
複数のAdapter出力を生成可能とする。

## 81. Adapter入力

Adapterは概念的に以下を受け取る。

{
  "subject": "...",
  "character": "...",
  "style": "...",
  "composition": "...",
  "lighting": "...",
  "adjustments": [],
  "negative": []
}

実装時の内部構造は、
03-data-design.mdとの整合を維持する。

## 82. Adapter出力

基本出力：

{
  "positivePrompt": "...",
  "negativePrompt": "...",
  "target": "..."
}

必要に応じて、

- displayPrompt
- copyPrompt

等を追加可能とする。

ただし同じ内容を不要に複数保存しない。

## 83. ChatGPT Adapter

ID：

chatgpt

目的：

ChatGPTの画像生成機能へ、
ユーザーがそのまま貼り付けやすい自然な指示文へ変換する。

MVPではAPI呼び出しを行わない。

## 84. ChatGPT Adapter基本方針

ChatGPT向けでは、
単なるキーワード列だけではなく、
意味が読み取りやすい指示形式を優先する。

概念：

Create an image of [subject].

Visual style:
[style]

Composition:
[composition]

Lighting and atmosphere:
[lighting]

Additional adjustments:
[adjustments]

Avoid:
[negative]

実際の改行・文章構造は実装時に調整可能。

## 85. ChatGPT AdapterとCharacter

Characterがある場合：

Use the following character consistently:
[character description]

Character Rulesがある場合：

Maintain the character's established facial features,
hairstyle,
body proportions,
clothing design,
main colors,
and overall visual identity.

等を追加可能。

## 86. ChatGPT AdapterとReference Image

Reference Image使用時：

Use the provided character reference image as the primary visual reference.

等の指示を追加可能。

ただし画像が実際に添付されていない状態で、

「添付画像を使用した」

と断定するPromptを自動生成しない。

UI側で、

「基準画像も一緒に添付してください」

等の補助表示を行える。

## 87. ChatGPT Negative

ChatGPTでは独立したnegative_promptパラメータを前提としない。

そのためコピー用Promptでは、

Avoid:
- unwanted text
- watermarks
- unnecessary logos

等の自然言語指示へ統合可能とする。

内部データではpositive / negativeを分離したまま保持する。

## 88. Gemini Adapter

ID：

gemini

目的：

Gemini系の画像生成・画像作成指示として、
読みやすい構造へ変換する。

MVPではAPI呼び出しを行わない。

## 89. Gemini Adapter基本方針

Gemini Adapterも自然言語中心とする。

概念：

Generate an image with the following requirements.

Subject:
[subject]

Style:
[style]

Composition:
[composition]

Lighting:
[lighting]

Adjustments:
[adjustments]

Elements to avoid:
[negative]

ChatGPT Adapterと意味内容を変えず、
主に構造・表現方法を調整する。

## 90. GeminiとCharacter

Character情報を利用する場合も、
PromptModel内の同一Character情報から生成する。

Gemini専用Characterデータを別保存しない。

## 91. Generic Adapter

ID：

generic

目的：

特定AIサービスへ依存しない、
汎用Promptを生成する。

他の画像生成AIへコピーする場合の基本形式として利用する。

## 92. Generic Adapter形式

基本的には簡潔なPromptを優先する。

概念：

[subject],
[character],
[style],
[composition],
[lighting],
[adjustments]

Negative:
[negative]

特定サービス専用パラメータは含めない。

## 93. AI固有構文

MVPでは、

- Midjourney専用parameter
- Stable Diffusion専用weight
- Flux専用syntax
- 特定API JSON

等をPromptModelへ混在させない。

将来必要になった場合、
新しいAdapterとして追加する。

## 94. Adapter間の意味一致

ChatGPT、Gemini、Genericで、
ユーザー選択の意味を勝手に変更しない。

例：

watercolor

をChatGPTでは水彩、
Geminiでは油彩、

のように変換してはいけない。

Adapter差は主に、

- 文体
- 構造
- 表記
- AIに伝わりやすい整理

とする。

## 95. 完成Prompt表示

完成画面では最低限、

- 出力先
- 完成Prompt
- コピー

を提供する。

必要に応じて、

- Positive
- Avoid / Negative

を分けて確認可能にする。

## 96. Prompt編集

完成Promptをユーザーがコピー後に自由編集することを妨げない。

将来的にアプリ内編集機能を追加可能。

ただしMVPでは、
生成されたPromptとPromptModelの関係を壊さない設計を優先する。

## 97. 日本語表示

UIは日本語を基本とする。

Prompt自体はMVPで英語中心でもよい。

将来的に、

- 日本語Prompt
- 英語Prompt

を切り替えられる構造を阻害しない。

## 98. 組み合わせ例1

入力：

subject：
カフェでノートパソコンを使う女性

style：
illustration

composition：
upper-body

lighting：
natural-light

adjustments：
neutral

negative：
text
watermark

概念出力：

Create an image of a woman using a laptop in a cafe.

Use a polished digital illustration style with clean shapes,
balanced detail and natural stylization.

Use an upper-body composition,
approximately from the waist upward,
with a clear natural pose.

Use natural lighting with believable light direction,
balanced highlights and shadows.

Avoid unwanted text and watermarks.

重要：

これは固定完成Promptではなく、
辞書要素を組み合わせた結果例である。

## 99. 組み合わせ例2

入力：

subject：
夕暮れの海辺を歩く女の子

style：
watercolor

composition：
full-body

lighting：
sunset

detail：
high

color：
slightly-high

background：
neutral

mood：
high

概念出力：

Create an image of a girl walking along the seaside at sunset.

Use a soft watercolor illustration style with translucent layered pigments,
gentle color bleeding and delicate hand-painted texture.

Show the full body from head to feet,
with balanced space around the subject.

Use warm sunset lighting with golden-hour atmosphere,
warm directional light and soft long shadows.

Add richer fine details while preserving the watercolor character.
Use somewhat stronger color presence and a more pronounced atmosphere.

重要：

detail highでも、
watercolorをrealisticへ変えない。

## 100. 組み合わせ例3

入力：

subject：
宇宙船の操縦席

style：
simple-flat

composition：
wide-shot

lighting：
cinematic

detail：
high

background：
high

概念解釈：

simple-flatの特徴を維持しながら、
通常より情報量の多い操縦席を描く。

detail highによって、
realisticへ変更しない。

background highによって、
subjectが背景へ埋もれないようにする。

## 101. 組み合わせ例4

入力：

subject：
白い猫

style：
pop-cute

composition：
face-closeup

lighting：
bright

概念解釈：

人物用の「顔アップ」というUI名称であっても、
猫の顔を主要部分として大きく表示する。

人物以外でも破綻しない。

## 102. 組み合わせ例5

入力：

subject：
クラシックカー

style：
realistic

composition：
low-angle

lighting：
dramatic

negative：
logo
text
watermark

概念解釈：

写実的なクラシックカーを低い視点から捉え、
方向性のある強い光で立体感を出す。

不要なロゴ、文字、透かしを避ける。

特定メーカーを勝手に追加しない。

## 103. Character組み合わせ例

subject：

公園のベンチで本を読む

Character：

name：
Mina

appearance：
short dark hair,
yellow cardigan,
navy skirt

rules：
顔、髪型、服装、主要色を維持

style：
illustration

composition：
full-body

lighting：
soft-light

概念出力では、

Minaの外見情報
+
Character consistency
+
subject action
+
style
+
composition
+
lighting

を組み合わせる。

## 104. Subject優先

Promptの中心はsubjectである。

style等の修飾要素が増えても、
「何を描きたいか」が埋もれないようにする。

Prompt Builder / Adapterでは、
subjectを高い優先度で配置する。

## 105. 空項目

未指定項目を、

unspecified
none
unknown

等として完成Promptへ無理に出力しない。

未指定なら基本的に省略する。

## 106. 8×8×8

基本選択：

8 styles
×
8 compositions
×
8 lighting options

=

512 combinations

ただし512個の完成Promptを保存しない。

24辞書項目の組み合わせとして扱う。

## 107. 微調整を含む組み合わせ

仮に4つの微調整軸を各5段階で考える場合、

5 × 5 × 5 × 5
=
625

となる。

基本512組み合わせと単純に掛け合わせれば、

512 × 625
=
320,000

の状態を表現可能。

さらにsubject、Character、negativeが加わるため、
実際の出力パターンは固定数に限定されない。

この数値は、
個別Promptを320,000個保存する意味ではない。

## 108. 全組み合わせテスト

512個を人間が目視で全部確認することを必須としない。

自動テストで、

- 8 style IDがすべて解決できる
- 8 composition IDがすべて解決できる
- 8 lighting IDがすべて解決できる
- 512組み合わせで例外が発生しない
- undefinedがPromptへ混入しない
- nullが文字列として混入しない

ことを確認する。

## 109. 512 Combination Test

自動テストでは三重ループ等により、

style
×
composition
×
lighting

の全512組み合わせをPrompt Builderへ渡せる。

各結果について最低限、

- non-empty
- subject保持
- style解決
- composition解決
- lighting解決
- exceptionなし

を確認する。

## 110. Adjustment Test

各adjustmentについて、

- minimum
- low
- neutral
- high
- maximum

相当を確認する。

neutralで不要な強調文が追加されないことも確認する。

## 111. Conflict Test

最低限：

simple-flat + detail high
watercolor + detail high
manga-lineart + color high
realistic + dreamy
night + color low

等を確認する。

「組み合わせ可能だが意味が壊れない」ことを見る。

## 112. Negative Test

確認：

- 0件
- 1件
- 複数
- unknown ID
- 自由入力がある場合
- ChatGPT Adapter
- Gemini Adapter
- Generic Adapter

## 113. Character Test

確認：

- Characterなし
- Characterあり
- Character一部未入力
- Rulesあり
- Reference Image情報あり
- Character削除後のSnapshot
- 日本語Character名

## 114. Unknown ID Test

style等へ未知IDを入れても、
アプリ全体がクラッシュしない。

未知要素を安全に省略または警告し、
他の正常要素はPromptへ反映する。

## 115. Escaping

subjectやCharacter名等のユーザー入力を、
HTMLとして直接レンダリングしない。

Prompt文字列として扱う場合も、
画面表示時には適切にエスケープする。

## 116. Prompt品質テスト

自動テストだけでは画像生成品質を完全評価できない。

そのため代表ケースについて、
実際にChatGPT / Gemini等へコピーし、
生成結果を目視確認する。

代表ケース候補：

- 人物
- 動物
- 商品
- 風景
- 建物
- 乗り物
- 食べ物
- 抽象的テーマ

## 117. Sample画像との一致

辞書Promptは、
正式比較シートに掲載された視覚イメージと
大きく乖離しないことを目標とする。

完全一致を保証するものではない。

生成AI・モデルVersion・乱数等により、
結果は変動する。

## 118. 特定作家・作品

正式辞書では、
特定の存命作家や特定作品の作風模倣を
基本Promptとして登録しない。

視覚的特徴を一般的な表現で定義する。

## 119. ブランド・ロゴ

Prompt Dictionaryから、
ユーザーが指定していないブランドやロゴを勝手に追加しない。

## 120. 過剰な品質語

以下のような品質語を、
意味なく大量追加しない。

masterpiece
best quality
8k
16k
ultra detailed
award winning

等。

必要な視覚条件を具体的に伝えることを優先する。

## 121. 辞書更新

辞書は将来改善可能。

ただしIDを安易に変更しない。

Prompt Coreの改善によって、
過去Projectを再生成した結果が変化する可能性がある。

そのため03-data-design.mdで定義した
generatedPrompt Snapshotを保持する。

## 122. Dictionary Version

将来的に辞書Versionを持たせることを許容する。

例：

dictionaryVersion: 1

MVP必須とはしない。

必要になった場合、
Project / Historyへ辞書Version Snapshotを追加可能とする。

## 123. サンプル追加

将来、

- style追加
- composition追加
- lighting追加

を可能とする。

ただしMVPでは正式8 + 8 + 8を基準とする。

新規追加時も安定IDを使用する。

## 124. AI Adapter追加

将来：

- Midjourney
- Flux
- Stable Diffusion系
- その他

を追加する場合、
PromptModelや既存辞書を全面変更せず、
Adapter追加で対応できる構造を優先する。

## 125. LINEスタンプ

LINEスタンプ用PromptはMVP中心機能ではない。

将来専用モードを追加する場合、

- 背景
- 余白
- キャラクター一貫性
- 表情
- ポーズ
- 文字
- 透過

等の追加辞書を別レイヤーとして設計する。

現在のstyle / composition / lighting辞書を再利用可能とする。

## 126. 4コマ・漫画

Ver.1.1の4コマ機能は、
MVPの中心には含めない。

将来復活する場合、
scene / panel / dialogue等を追加し、
現在の一枚絵PromptModelを無理に巨大化させない。

## 127. 辞書ファイル分離

実装時は1巨大ファイルへ全ロジックを詰め込まない。

候補：

src/data/styles.js
src/data/compositions.js
src/data/lighting.js
src/data/adjustments.js
src/data/negatives.js

Prompt処理：

src/prompt/prompt-builder.js
src/prompt/adapters/chatgpt.js
src/prompt/adapters/gemini.js
src/prompt/adapters/generic.js

正式なファイル構成は06-implementation-plan.mdで決定する。

## 128. 正式決定事項

本設計で正式に決定する。

- style 8種類
- composition 8種類
- lighting 8種類
- 24辞書要素を組み合わせる
- 512完成Promptを個別保存しない
- subjectをPrompt中心とする
- 微調整4軸を使用する
- detail
- color
- background
- mood
- 中立値では不要な強調を省略する
- positive / negativeを分離する
- Characterを独立情報として統合する
- Prompt BuilderとAdapterを分離する
- ChatGPT Adapter
- Gemini Adapter
- Generic Adapter
- AI APIはMVPで使用しない
- 特定AI専用構文をPromptModelへ混在させない
- 未知IDでアプリ全体を停止させない
- 512組み合わせを自動テスト可能にする
- 特定作家・作品の模倣を正式辞書の基本Promptにしない
- 不要な品質語を大量追加しない

## 129. 後続設計へ委ねる事項

以下は本書だけで確定しない。

- サンプル派生画像の実ファイル名
- 3枚の比較シートから個別カードをどう作るか
- WebP等への変換有無
- responsive画像サイズ
- preload / lazy-load
- 実装ディレクトリの最終構成
- テストフレームワーク
- Build Tool
- IndexedDBライブラリ
- History最大件数
- LINEスタンプ実装時期
- 4コマ再実装時期

## 130. 05設計書との関係

docs/05-sample-images-spec.mdでは、

- 原本3枚
- 24視覚サンプル
- 個別カード用派生画像
- crop
- 命名
- サイズ
- format
- 原本保護
- UIとの対応

を定義する。

Prompt DictionaryのIDと、
Sample Image IDを一致させる。

## 131. 06設計書との関係

docs/06-implementation-plan.mdでは、

- Batch
- 実装順
- ファイル構成
- テスト順
- Git開始タイミング
- 回帰確認
- 完了条件

を定義する。

## 132. 実装開始条件

本書だけでは本実装を開始しない。

以下がすべて正式登録され、

- 01 Requirements
- 02 UI / UX
- 03 Data
- 04 Prompt Dictionary
- 05 Sample Images
- 06 Implementation Plan

相互矛盾チェックが完了してから
Batch Aへ進む。

## 133. 次工程

本Prompt Dictionary登録後、

docs/05-sample-images-spec.md

を正式登録する。

その後、

docs/06-implementation-plan.md

を正式登録する。

6文書完成後、
全体整合性確認を行う。

重大な矛盾がなければ、
Batch A実装開始可否を判断する。

