# 画像生成プロンプトメーカー Ver.2
# Sample Images仕様書 v1.0

## 1. 文書情報

- 文書名：画像生成プロンプトメーカー Ver.2 Sample Images仕様書
- Version：1.0
- 対象：image-prompt-maker-v2
- 状態：正式設計
- 上位仕様：01-requirements.md
- UI仕様：02-ui-ux-design.md
- データ仕様：03-data-design.md
- Prompt仕様：04-prompt-dictionary.md

## 2. 目的

本書はVer.2で使用する視覚サンプル画像について、

- 原本
- 派生画像
- ID
- ファイル名
- 切り出し
- 表示
- サイズ
- 画質
- 原本保護
- UIとの対応

を定義する。

## 3. 基本思想

ユーザーは専門用語を覚えてから画像を作るのではなく、

「こんな感じ」

と思える画像を見て選択する。

Sample Imagesは単なる装飾ではなく、
Ver.2の主要入力UIである。

## 4. 正式原本

正式原本は以下3枚。

images/samples/reference/style-reference.png

images/samples/reference/composition-reference.png

images/samples/reference/lighting-reference.png

## 5. 原本数

原本画像は3枚である。

24枚の原本画像が存在するという扱いにしない。

各原本比較シートには8種類の視覚サンプルが掲載されている。

合計：

3 × 8 = 24種類

## 6. 原本サイズ

現在の正式原本：

1536 × 1024 px

3枚とも同サイズ。

実装前に実ファイルを再確認する。

## 7. 原本保護

reference/配下の正式原本に対して、

- 上書き
- リサイズ
- 再圧縮
- 色補正
- トリミング
- 文字変更
- 分割保存による置換
- format変換による置換

を行わない。

## 8. 原本SHA-256

現在登録済み原本のSHA-256：

style-reference.png

20194b608bac1f01e0a11a12c0be6c56584bb4a9fc73ff2bd89b1fdc09c3dd30

composition-reference.png

d1020f494ecf010e1481db026be76a6f83a11b10323e05099eb495d9a0fe8fb9

lighting-reference.png

a6b2c5266c13b327024637f94d862e6cef22e80f62c12782cca78efce1e3fe06

画像処理前後に原本Hashを確認する。

## 9. referenceとderived

画像ディレクトリを役割で分離する。

reference：

正式原本を保存する。

derived：

UI表示用に原本から生成した派生画像を保存する。

構造：

images/
└── samples/
    ├── reference/
    │   ├── style-reference.png
    │   ├── composition-reference.png
    │   └── lighting-reference.png
    └── derived/

## 10. derivedの意味

derived画像は正式原本ではない。

原本から、

- crop
- resize
- format変換
- Web表示最適化

等を行ったUI用資産である。

必要なら原本から再生成可能にする。

## 11. 個別カード

UIでは比較シート全体を毎回選択させるのではなく、
各種類を個別カードとして表示する。

基本：

Style 8カード
Composition 8カード
Lighting 8カード

合計24カード。

## 12. 24カードと辞書

04-prompt-dictionary.mdのIDと、
画像カードIDを一致させる。

画像を選択した結果、
対応するPrompt Dictionary IDがPromptModelへ入る。

## 13. Style正式対応

01

ID：
anime

表示：
アニメ風

原本：
style-reference.png

派生候補：
style-anime

02

ID：
illustration

表示：
イラスト風

原本：
style-reference.png

派生候補：
style-illustration

03

ID：
realistic

表示：
リアル風

原本：
style-reference.png

派生候補：
style-realistic

04

ID：
manga-lineart

表示：
マンガ風（線画）

原本：
style-reference.png

派生候補：
style-manga-lineart

05

ID：
watercolor

表示：
水彩風

原本：
style-reference.png

派生候補：
style-watercolor

06

ID：
oil-painting

表示：
油彩風

原本：
style-reference.png

派生候補：
style-oil-painting

07

ID：
simple-flat

表示：
シンプル・フラット

原本：
style-reference.png

派生候補：
style-simple-flat

08

ID：
pop-cute

表示：
ポップ・かわいい

原本：
style-reference.png

派生候補：
style-pop-cute

## 14. Composition正式対応

01

ID：
face-closeup

表示：
顔アップ

原本：
composition-reference.png

派生候補：
composition-face-closeup

02

ID：
bust-up

表示：
バストアップ

原本：
composition-reference.png

派生候補：
composition-bust-up

03

ID：
upper-body

表示：
上半身

原本：
composition-reference.png

派生候補：
composition-upper-body

04

ID：
full-body

表示：
全身

原本：
composition-reference.png

派生候補：
composition-full-body

05

ID：
wide-shot

表示：
引き

原本：
composition-reference.png

派生候補：
composition-wide-shot

06

ID：
side-view

表示：
横から

原本：
composition-reference.png

派生候補：
composition-side-view

07

ID：
low-angle

表示：
ローアングル

原本：
composition-reference.png

派生候補：
composition-low-angle

08

ID：
high-angle

表示：
俯瞰（上から）

原本：
composition-reference.png

派生候補：
composition-high-angle

## 15. Lighting正式対応

01

ID：
natural-light

表示：
自然光

原本：
lighting-reference.png

派生候補：
lighting-natural-light

02

ID：
bright

表示：
明るい

原本：
lighting-reference.png

派生候補：
lighting-bright

03

ID：
soft-light

表示：
柔らかい

原本：
lighting-reference.png

派生候補：
lighting-soft-light

04

ID：
sunset

表示：
夕暮れ

原本：
lighting-reference.png

派生候補：
lighting-sunset

05

ID：
night

表示：
夜

原本：
lighting-reference.png

派生候補：
lighting-night

06

ID：
cinematic

表示：
シネマティック

原本：
lighting-reference.png

派生候補：
lighting-cinematic

07

ID：
dreamy

表示：
幻想的

原本：
lighting-reference.png

派生候補：
lighting-dreamy

08

ID：
dramatic

表示：
ドラマチック

原本：
lighting-reference.png

派生候補：
lighting-dramatic

## 16. ファイル名

正式な派生ファイル名は、
安定IDを含む形式を基本とする。

候補：

style-anime.webp
style-illustration.webp
style-realistic.webp
style-manga-lineart.webp
style-watercolor.webp
style-oil-painting.webp
style-simple-flat.webp
style-pop-cute.webp

composition-face-closeup.webp
composition-bust-up.webp
composition-upper-body.webp
composition-full-body.webp
composition-wide-shot.webp
composition-side-view.webp
composition-low-angle.webp
composition-high-angle.webp

lighting-natural-light.webp
lighting-bright.webp
lighting-soft-light.webp
lighting-sunset.webp
lighting-night.webp
lighting-cinematic.webp
lighting-dreamy.webp
lighting-dramatic.webp

## 17. WebP

UI用派生画像の第一候補はWebPとする。

理由：

- Web表示向け
- PNGより容量削減を期待できる
- 主要モダンブラウザで利用可能

ただし原本PNGはWebPへ置換しない。

## 18. fallback

MVP対象ブラウザでWebP対応を前提にできる場合、
PNG fallbackを24枚すべて作ることを必須としない。

必要性は実装時の対象ブラウザ確認で判断する。

## 19. cropの基本

比較シートから個別カードを切り出す際は、
単純な固定座標だけで即実行しない。

まず原本の実画像を確認し、

- 8サンプルの配置
- 余白
- 見出し
- ラベル
- 境界
- セル比率

を確認してからcrop領域を決定する。

## 20. cropとラベル

原本比較シート内に表示されている文字ラベルを、
派生カード画像へ含めるかは、
UI全体との重複を見て判断する。

第一候補：

画像そのものを中心にcropし、
カード名はHTMLテキストとして表示する。

理由：

- 文字の視認性をCSS側で管理できる
- スマホで読みやすい
- 将来表示名を変更しやすい
- 画像内文字とUI文字の二重表示を避けられる

## 21. cropで内容を変えない

crop時に、

- 被写体を描き足す
- 背景を生成する
- AIで画像を修正する
- 色を変える
- ラベル内容を書き換える

ことはしない。

派生画像は原本の視覚情報を保持する。

## 22. 同一比較条件

各カテゴリ8種類は、
可能な限り比較しやすい表示を維持する。

Styleでは、
同じ基本subjectを異なるstyleで比較できることが重要。

Compositionでは、
構図差を比較できることが重要。

Lightingでは、
光・雰囲気差を比較できることが重要。

## 23. カード比率

UIカード内画像は、
カテゴリ内で同じaspect ratioを使用する。

カードごとに高さが大きく変わらないようにする。

正確な比率は、
実際のcrop領域確認後に決定する。

## 24. object-fit

派生画像自体を適切にcropすることを基本とする。

CSSのobject-fitだけで、
重要部分が毎回切れる設計にしない。

必要に応じて、

object-fit: cover

または

object-fit: contain

をカテゴリ単位で選択する。

## 25. スマートフォン

02-ui-ux-design.mdに従い、
スマートフォンでは2列Gridを第一候補とする。

24枚を同時に1画面へ並べるのではなく、
現在の判断ステップに必要な8枚を表示する。

例：

絵柄Step
→ Style 8枚

構図Step
→ Composition 8枚

光・雰囲気Step
→ Lighting 8枚

## 26. Desktop

Desktopでは画面幅に応じて、
2〜4列程度を候補とする。

列数よりも、

- 比較しやすさ
- カードサイズ
- ラベル可読性

を優先する。

## 27. 選択状態

画像カード選択時は、
画像自体を書き換えない。

CSS等で、

- border
- check
- background
- shadow

等を利用して選択状態を示す。

色だけに依存しない。

## 28. Hover

Hover可能な環境では、
軽い視覚フィードバックを付けてよい。

ただしHoverがないスマートフォンでも、
全機能を利用可能にする。

## 29. Keyboard

カードはキーボード操作可能にする。

Tabで移動でき、
Enter / Space等で選択可能な構造を目指す。

実装要素はbutton等、
標準操作可能なHTMLを優先する。

## 30. alt

画像には意味のあるaltを設定する。

例：

アニメ風のサンプル

水彩風のサンプル

ローアングル構図のサンプル

夕暮れの光・雰囲気サンプル

ファイル名だけをaltにしない。

## 31. lazy loading

現在のStep以外の画像を大量に先読みする必要はない。

必要に応じて、

loading="lazy"

等を利用する。

ただし現在表示中の主要画像まで遅延して
操作感を悪化させない。

## 32. preload

最初に必要な画像のみ、
必要に応じてpreloadを検討する。

24枚すべてのpreloadを前提にしない。

## 33. 派生画像の容量

24枚のUI画像は、
原本と同等の1536 × 1024をそのまま使う必要はない。

カード表示に必要な解像度へ最適化する。

ただし過度な圧縮で、
Style・Composition・Lightingの違いが
判別できなくならないようにする。

## 34. Retina

スマートフォン等の高DPI表示を考慮する。

CSS表示サイズよりある程度大きい画像を用意し、
ぼやけを防ぐ。

具体pixel数は実画像crop後に決定する。

## 35. 画質確認

派生画像生成後、
最低限以下を目視確認する。

- 被写体が途中で不自然に切れていない
- 比較したい特徴が残っている
- 文字の切れ端が残っていない
- 隣セルが混入していない
- 余計な境界線が残っていない
- 圧縮で差が分からなくなっていない

## 36. PART1終了時点

PART1では以下を定義した。

- 正式原本3枚
- 原本保護
- reference / derived分離
- 24カード
- Prompt Dictionary IDとの対応
- Style 8
- Composition 8
- Lighting 8
- 派生画像命名
- WebP候補
- crop基本方針
- responsive表示
- accessibility
- 画像最適化

PART2では、

- crop検証手順
- 派生画像生成手順
- manifest
- Sample Data
- テスト
- 原本Hash検証
- 画像更新ルール
- 実装Batchとの関係
- 正式決定事項
- 次工程

を定義する。

## 37. crop開始前確認

派生画像作成前に、
3枚の原本を実際に画像として確認する。

ファイルサイズや1536 × 1024というpixel数だけから、
crop座標を推測しない。

確認対象：

- Style 8セル
- Composition 8セル
- Lighting 8セル
- セル配置
- 外周余白
- セル間余白
- 見出し
- ラベル
- 境界線
- 各画像領域

## 38. crop配置の記録

実画像確認後、
各カードのcrop領域を再現可能な形で記録する。

概念例：

{
  "id": "anime",
  "source": "style-reference.png",
  "crop": {
    "x": 0,
    "y": 0,
    "width": 0,
    "height": 0
  }
}

上記数値は例であり、
実画像確認前に固定しない。

## 39. crop座標

crop座標は原本pixel基準で管理する。

原本が将来変更された場合、
旧座標を無条件に再利用しない。

原本Hashとcrop定義の対応を確認する。

## 40. crop検証

各cropについて最低限、

- 対象セルだけが入っている
- 隣接セルが混入していない
- 主要subjectが欠けていない
- ラベルの切れ端が残っていない
- 不要な外枠が残っていない

ことを確認する。

## 41. 自動cropと手動確認

24枚のcrop自体は、
スクリプトで自動生成してよい。

ただし生成結果24枚は目視確認する。

自動処理成功だけで完成扱いにしない。

## 42. 派生画像生成

基本工程：

正式原本
↓
crop
↓
必要に応じてresize
↓
Web表示向けformat変換
↓
derivedへ保存
↓
24枚検証

原本は変更しない。

## 43. 生成スクリプト

派生画像生成を再現可能にするため、
必要に応じて専用スクリプトを作成する。

候補：

scripts/generate-sample-images.*

ただし正式な言語・ファイル名は
06-implementation-plan.mdで決定する。

## 44. スクリプトの入力

入力：

- reference画像
- crop定義
- 出力サイズ
- format
- quality

出力：

- derived画像

原本へ書き戻さない。

## 45. スクリプトの安全性

派生画像生成スクリプトは、
referenceディレクトリを出力先にしない。

入力元と出力先を明確に分離する。

原本と同名のファイルを生成しない。

## 46. derived配置

第一候補：

images/samples/derived/

配下へ24枚を配置する。

必要になれば将来、

derived/style/
derived/composition/
derived/lighting/

へカテゴリ分割可能。

MVPでは管理しやすさを優先して決定する。

## 47. manifest

UIが画像ファイル名や表示名を
各画面へ直接ハードコードしないよう、
Sample Manifestを用意することを推奨する。

概念：

{
  "category": "style",
  "id": "anime",
  "label": "アニメ風",
  "image": "images/samples/derived/style-anime.webp",
  "alt": "アニメ風のサンプル"
}

## 48. manifestとPrompt Dictionary

manifestのidと、
04-prompt-dictionary.mdの辞書IDを一致させる。

例：

Sample Manifest：

id = watercolor

Prompt Dictionary：

id = watercolor

PromptModel：

style = watercolor

という一貫した経路を作る。

## 49. manifestの責務

manifestは主に、

- category
- id
- label
- image
- alt
- order

を管理する。

Prompt Coreそのものを
Sample Manifestへ重複保存しない。

Prompt文言はPrompt Dictionary側を正式情報源とする。

## 50. order

各カテゴリの表示順を保持する。

Style：

01 anime
02 illustration
03 realistic
04 manga-lineart
05 watercolor
06 oil-painting
07 simple-flat
08 pop-cute

Composition：

01 face-closeup
02 bust-up
03 upper-body
04 full-body
05 wide-shot
06 side-view
07 low-angle
08 high-angle

Lighting：

01 natural-light
02 bright
03 soft-light
04 sunset
05 night
06 cinematic
07 dreamy
08 dramatic

## 51. Sample DataとDB

正式Sample DataをIndexedDBへ
ユーザーデータとして複製しない。

Sample Manifestはアプリ資産として管理する。

ユーザーが選択した結果として、
Project / Draft等へ安定IDを保存する。

## 52. 保存例

ユーザーが、

水彩風
全身
夕暮れ

を選択した場合、
Projectへ画像ファイルそのものを保存するのではなく、

style：
watercolor

composition：
full-body

lighting：
sunset

等のIDを保存する。

## 53. derived再生成

derived画像を削除・変更する必要がある場合でも、
reference原本とcrop定義から再生成可能な状態を目指す。

derived画像だけを唯一の原本にしない。

## 54. 原本更新

将来reference画像を正式に更新する場合は、

1. 新原本を確認
2. Hash取得
3. 旧原本との差分確認
4. crop座標再確認
5. derived再生成
6. 24枚目視確認
7. manifest確認
8. UI確認

の順で行う。

## 55. 原本更新とHash

原本内容が変わった場合、
05設計書または関連管理情報のHashも更新する。

古いHashのまま
「正式原本と一致」と判定しない。

## 56. 原本更新とID

画像の見た目を改善しても、
意味が同じである限り安定IDを維持できる。

例：

watercolorサンプル画像を改善

しても、

watercolor

というIDを安易に変更しない。

## 57. 意味変更

サンプル画像が、
元の辞書意味と異なるものへ変更された場合は、
単なる画像差し替えとして扱わない。

04 Prompt Dictionaryとの整合を再確認する。

## 58. 派生format変更

将来WebPからAVIF等へ変更する場合も、
PromptModelのIDは変更しない。

画像formatと意味IDを分離する。

## 59. cache

公開時に画像を長期cacheする場合、
画像差し替えが反映される仕組みを考慮する。

候補：

- filename version
- content hash
- build asset hash

MVPでの具体方式は06または実装時に決定する。

## 60. 404

派生画像が存在しない場合でも、
アプリ全体をクラッシュさせない。

必要に応じて、

- fallback表示
- テキストカード
- placeholder

を利用する。

ただし欠損画像を正常状態として放置しない。

## 61. loading failure

画像読み込み失敗時も、
カードのlabelと選択操作が利用可能な設計を目指す。

画像だけに操作意味を依存させない。

## 62. accessibility

視覚サンプルを利用するUIでも、

- label
- alt
- keyboard
- focus
- selected state

を提供する。

「画像が見えなければ何も選べない」
構造にしない。

## 63. selected state

選択状態は、

- 視覚的表示
- DOM上の状態
- PromptModel

の3つが一致する必要がある。

UIだけ選択表示されて、
PromptModelへ反映されていない状態を作らない。

## 64. Sampleクリックテスト

各24カードについて、

クリック
↓
正しいID
↓
PromptModel
↓
Prompt Builder

まで対応することを確認する。

## 65. Styleカードテスト

8枚すべてについて、

表示画像
表示名
ID
Prompt Dictionary

の対応を確認する。

例：

水彩画像
↓
水彩風
↓
watercolor
↓
watercolor Prompt Core

## 66. Compositionカードテスト

8枚すべてについて、

表示画像
表示名
ID
Prompt Dictionary

を確認する。

## 67. Lightingカードテスト

8枚すべてについて、

表示画像
表示名
ID
Prompt Dictionary

を確認する。

## 68. Manifest Test

最低限：

- 24 entries
- category正常
- id重複なし
- image path存在
- label存在
- alt存在
- order重複なし
- Prompt Dictionary ID解決可能

を確認する。

## 69. File Test

派生画像生成後：

- 24ファイル存在
- 0 byteなし
- 読み込み可能
- format正常
- pixel size正常
- ファイル名正常

を確認する。

## 70. Visual Test

24枚すべてを目視確認する。

特に、

- Style差
- Composition差
- Lighting差

がカードサイズでも判別できることを確認する。

## 71. Mobile Test

スマートフォン相当幅で、

- 2列Grid
- 画像が小さすぎない
- labelが読める
- 選択状態が分かる
- 誤タップしにくい
- スクロール量が過剰でない

ことを確認する。

## 72. Desktop Test

Desktopで、

- 過度に巨大なカードにならない
- 比較しやすい
- 余白が適切
- 選択状態が分かる

ことを確認する。

## 73. Performance Test

24枚全体だけでなく、
1Step 8枚表示時の読み込みを確認する。

低速回線を想定し、

- 初期表示
- Step移動
- 画像decode
- layout shift

等を確認する。

## 74. CLS

画像領域には可能な限り、
width / heightまたはaspect-ratioを設定し、
画像読み込み時の大きなLayout Shiftを防ぐ。

## 75. 原本Hash Test

画像派生処理の前後で、
reference 3枚のSHA-256を比較する。

一致しない場合は、
原本変更として処理を停止して原因確認する。

## 76. 画像生成AIで再生成しない

現在の正式24視覚サンプルを、
実装の都合だけで画像生成AIへ渡して
似た画像を作り直すことはしない。

まず現在の原本から派生画像を作る。

新規生成は正式なデザイン変更時に別判断する。

## 77. 権利管理

正式原本について、
アプリ公開・note配布等の利用条件を
プロジェクト側で把握できる状態を維持する。

第三者画像を無断でSampleへ追加しない。

## 78. EXIF等

派生画像公開時、
不要なmetadataが含まれる場合は削除可能。

ただし原本を変更するのではなく、
派生画像生成工程で処理する。

## 79. 色管理

派生画像変換時、
意図せず色味が大きく変化しないことを確認する。

特にLighting比較では、
色・明るさの変化が意味そのものなので注意する。

## 80. 圧縮品質

単にファイル容量最小化を目標にしない。

サンプルの差を判別できる画質を維持する。

具体的quality値は、
派生画像を比較して決定する。

## 81. サムネイル以外

将来、

- 拡大表示
- 詳細説明
- 比較モーダル

等を追加する場合、
必要に応じて別サイズ派生画像を作成できる。

MVPではまずカード表示を優先する。

## 82. 原本表示

開発・検証目的で比較シート全体を表示する機能を作ることは可能。

ただし通常ユーザー動線では、
個別カードを中心とする。

## 83. UI文言

カードlabelは04 Prompt Dictionaryと意味を一致させる。

画像だけ「幻想的」なのに、
UI labelが「柔らかい」等の不一致を作らない。

## 84. Sample説明

必要に応じて各カードへ短い説明文を表示可能。

例：

水彩風
「にじみと透明感のある柔らかな表現」

ただしカードを文章だらけにしない。

1画面1判断を優先する。

## 85. 画像選択とPrompt

画像そのものをAIへ送信して
Promptを解析する方式ではない。

ユーザーが画像カードを選ぶことで、
対応する辞書IDを選択する方式である。

MVPではVision APIを使用しない。

## 86. 参考画像アップロードとの区別

将来ユーザーが自分の参考画像をアップロードする機能と、
正式Sample Imagesを混同しない。

Sample Images：

アプリが提供する選択UI。

User Reference Image：

ユーザー自身が持ち込む画像。

別概念として扱う。

## 87. Character Referenceとの区別

Character Reference Imageも、
Sample Imagesとは別である。

Sample Imagesは、

style
composition
lighting

の選択用。

Character Referenceは、
キャラクター一貫性用。

## 88. Batchとの関係

画像派生処理を、
UI実装より前または同時期に行う必要がある。

具体的なBatchは06-implementation-plan.mdで決定する。

原本保護確認を済ませてから派生処理を行う。

## 89. Batch完了条件

Sample Image関連Batchの完了条件候補：

- reference 3枚Hash一致
- crop定義完成
- derived 24枚生成
- manifest完成
- 24 ID一致
- 24画像目視確認
- mobile確認
- desktop確認
- Prompt Dictionary対応確認
- 自動テスト成功

## 90. 失敗時

cropや変換に問題があった場合、
問題のderived画像を作り直す。

reference原本を修正して合わせない。

## 91. 手動微調整

自動cropだけでは適切でないセルがある場合、
個別crop座標を調整してよい。

ただし、

「どの画像だけ特別座標なのか」

をcrop定義として残す。

## 92. 画像加工範囲

MVPの派生処理として許容：

- crop
- resize
- format変換
- Web向け圧縮
- metadata削除

原則として行わない：

- AI生成による補完
- retouch
- 被写体変更
- 背景変更
- 色演出変更
- 内容の描き直し

## 93. 24枚生成後の確認シート

必要に応じて、
派生24枚を一覧化した開発用Contact Sheetを生成してよい。

目的：

- ID確認
- crop確認
- 並び順確認
- 視覚差確認

Contact Sheetは正式Sample原本ではない。

## 94. Contact Sheet

開発用Contact Sheetを作る場合、
derivedまたは開発用ディレクトリへ置く。

reference/へ追加しない。

## 95. Git管理

正式にGitを開始した後、
reference原本・必要なderived・manifestを
Git管理対象とすることを基本候補とする。

巨大化する場合は06で再検討する。

現時点ではGit initしない。

## 96. .gitignore

生成途中ファイルや一時画像が発生する場合、
Git開始時に.gitignore対象を検討する。

正式derived画像まで誤ってignoreしない。

## 97. Source of Truth

Sample Imagesに関するSource of Truth：

意味：
04-prompt-dictionary.md

正式原本：
images/samples/reference/

UI画像：
images/samples/derived/

UI対応：
Sample Manifest

保存選択：
PromptModelの安定ID

## 98. 不整合時

例：

manifest：
watercolor

画像：
oil painting

辞書：
watercolor

のような不整合が見つかった場合、
そのカードを正常扱いしない。

画像・manifest・辞書の対応を確認して修正する。

## 99. 正式決定事項

本設計で正式決定する。

- 正式原本は3枚
- 24枚の原本とは扱わない
- 原本3枚をreferenceへ保持
- UIでは24個の個別カードを使用
- derivedを原本から作成する
- 原本を上書きしない
- Style 8カード
- Composition 8カード
- Lighting 8カード
- Prompt Dictionaryと安定IDを一致させる
- UI用派生画像はWebPを第一候補とする
- crop座標は実画像確認後に決定する
- HTML labelを第一候補とする
- Sample Manifestを使用する方向とする
- Sample DataをIndexedDBへ複製しない
- 画像ファイルそのものをProjectへ保存しない
- derivedは再生成可能にする
- 24枚を目視確認する
- reference Hashを派生処理前後で確認する
- スマートフォン2列Gridを第一候補とする
- Sample ImageとUser Reference Imageを分離する
- Sample ImageとCharacter Reference Imageを分離する

## 100. 後続設計へ委ねる事項

以下は06または実装時に決定する。

- cropの実座標
- derivedの最終pixel数
- WebP quality
- crop生成スクリプトの言語
- manifestの実ファイル形式
- manifestの実ファイル名
- derivedのカテゴリ別directory分割
- Contact Sheetの保存先
- preload対象
- cache busting
- Git開始タイミング

## 101. 実装前確認

派生画像生成前に必ず、

1. reference 3枚存在
2. pixel size確認
3. SHA-256確認
4. 実画像確認
5. 8セル配置確認
6. crop座標決定

を行う。

座標推測から開始しない。

## 102. 06設計書との関係

docs/06-implementation-plan.mdで、

- Batch A〜E
- Sample画像派生タイミング
- manifest実装
- UIカード実装
- Prompt Dictionary接続
- Test
- Git開始
- 完了条件

を確定する。

## 103. 実装開始条件

05登録だけでは本実装を開始しない。

以下6文書：

01 Requirements
02 UI / UX
03 Data
04 Prompt Dictionary
05 Sample Images
06 Implementation Plan

が正式登録され、
相互矛盾チェックを完了してから
Batch A開始可否を判断する。

## 104. 次工程

本Sample Images仕様書登録後、

docs/06-implementation-plan.md

を正式登録する。

06登録後、
6文書の相互整合性を確認する。

重大な矛盾がなければ、

- 原本検証
- crop定義
- derived生成
- manifest
- UI
- Prompt Builder

等を06で決めたBatch順に実装する。

