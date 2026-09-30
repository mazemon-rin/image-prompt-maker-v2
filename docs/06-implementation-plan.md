# 画像生成プロンプトメーカー Ver.2
# Implementation Plan v1.0

## 1. 文書情報

- 文書名：画像生成プロンプトメーカー Ver.2 Implementation Plan
- Version：1.0
- 対象：image-prompt-maker-v2
- 状態：正式設計
- 上位仕様：01-requirements.md
- UI仕様：02-ui-ux-design.md
- データ仕様：03-data-design.md
- Prompt仕様：04-prompt-dictionary.md
- Sample仕様：05-sample-images-spec.md

## 2. 目的

本書はVer.2を安全に実装するため、

- 実装順序
- Batch
- 変更範囲
- テスト
- 完了条件
- 回帰確認
- Git開始
- 公開準備

を定義する。

## 3. 実装原則

一度に全機能を実装しない。

各Batchを、

実装
↓
自動テスト
↓
手動確認
↓
問題修正
↓
完了判定
↓
次Batch

の順で進める。

## 4. Ver.1.1との分離

Ver.2の作業対象：

image-prompt-maker-v2

Ver.1.1：

yonkoma-prompt-maker

Ver.2実装中に、
Ver.1.1を変更しない。

## 5. Source of Truth

実装時の正式情報源：

AGENTS.md

docs/01-requirements.md
docs/02-ui-ux-design.md
docs/03-data-design.md
docs/04-prompt-dictionary.md
docs/05-sample-images-spec.md
docs/06-implementation-plan.md

推測で仕様を追加しない。

## 6. 実装前Gate

Batch A開始前に以下を確認する。

- 6設計書が存在
- Version確認
- 章欠落なし
- 重大な相互矛盾なし
- 原本画像3枚存在
- 原本Hash一致
- Ver.1.1が分離されている
- Ver.1.1 Git status clean

## 7. 技術方針

MVPでは過剰な技術構成を導入しない。

基本候補：

- HTML
- CSS
- JavaScript
- IndexedDB
- 静的Webアプリ

外部AI APIはMVP必須としない。

## 8. Build Tool

Build Tool導入は、
必要性を確認してから判断する。

単純なES Modulesで十分な場合、
過剰なframeworkを導入しない。

ただしテスト環境やasset処理のため、
最小限の開発依存関係を導入することは可能。

## 9. Framework

React / Vue / Svelte等を、
理由なく導入しない。

Vanilla JavaScriptで
正式要件を安全に実装できる場合は、
Vanillaを第一候補とする。

## 10. Module分割

Ver.1.1のような巨大な単一script.jsへ戻さない。

責務単位で分離する。

候補：

src/
├── app/
├── data/
├── prompt/
├── storage/
├── ui/
├── character/
└── utils/

最終構成はBatch Aで確定する。

## 11. Data Module

候補：

src/data/

責務：

- Sample Manifest
- Style metadata
- Composition metadata
- Lighting metadata
- UI表示用静的データ

Prompt Coreを重複管理しない。

## 12. Prompt Module

候補：

src/prompt/

責務：

- PromptModel
- Prompt Dictionary
- Prompt Builder
- Negative Prompt
- Adapter

UI DOM操作をPrompt Moduleへ混ぜない。

## 13. Storage Module

候補：

src/storage/

責務：

- IndexedDB
- Draft
- Project
- History
- Favorite
- Character
- Export
- Import
- Migration

## 14. UI Module

候補：

src/ui/

責務：

- Step表示
- Sample Card
- Navigation
- Adjustment
- Result
- History
- Favorite
- Character UI

Prompt生成ロジックをUIへ直接書かない。

## 15. Character Module

候補：

src/character/

責務：

- Character Sheet
- Character validation
- Character → PromptModel変換
- Character Reference metadata

## 16. Utils

候補：

src/utils/

責務：

- validation
- escaping
- IDs
- dates
- common helpers

## 17. Test構成

tests/

候補：

unit/
integration/
fixtures/

必要に応じてE2Eを追加する。

テストツールはBatch Aで
最小構成を選定する。

## 18. Batch構成

正式な大分類：

Batch A
基盤・原本検証・Sample資産

Batch B
Prompt Core

Batch C
主要UI

Batch D
保存・Character・補助機能

Batch E
統合・品質・公開準備

## 19. Batch Aの目的

アプリ機能を大量実装する前に、

- 開発基盤
- directory
- test
- 原本検証
- derived画像
- manifest

を確立する。

## 20. Batch A-1 現状確認

最初に実施：

- image-prompt-maker-v2の全構成確認
- 設計書6本確認
- reference画像3枚確認
- SHA-256確認
- src確認
- tests確認
- .git有無確認
- Ver.1.1状態確認

この段階では変更しない。

## 21. Batch A-2 技術構成決定

正式設計を満たす最小構成を選ぶ。

確認：

- Vanilla JSで実装可能か
- ES Modules採用
- test runner
- image processing手段
- local server
- package管理の必要性

判断理由を記録する。

## 22. Batch A-3 directory構築

必要なdirectoryを作成する。

候補：

src/app
src/data
src/prompt
src/storage
src/ui
src/character
src/utils

tests/unit
tests/integration
tests/fixtures

images/samples/derived

scripts

不要なdirectoryを先行して大量作成しない。

## 23. Batch A-4 最小アプリShell

最小限：

- index.html
- main CSS
- app entry

を作成する。

この段階では完成UIを作らない。

目的：

- browser起動
- module load
- CSS load
- console errorなし

を確認する。

## 24. Batch A-5 Test基盤

最低限、

- test command
- unit test実行
- failure確認
- success確認

が可能な状態にする。

テストが実行できないまま
Batch Bへ進まない。

## 25. Batch A-6 原本検証

reference：

style-reference.png
composition-reference.png
lighting-reference.png

について、

- file存在
- format
- pixel size
- SHA-256

を確認する。

設計書05の値と照合する。

## 26. Batch A-7 原本目視

3枚を画像として確認する。

確認：

- 8セル配置
- 各セルの境界
- label位置
- 余白
- crop可能範囲

pixel sizeだけから座標を決めない。

## 27. Batch A-8 crop定義

24種類それぞれのcrop座標を定義する。

Style 8
Composition 8
Lighting 8

定義は再現可能なデータとして保存する。

## 28. Batch A-9 crop検証

crop定義について、

- 対象セル
- 隣接セル混入
- label切れ端
- subject欠け
- 境界線

を確認する。

必要なら個別座標を調整する。

## 29. Batch A-10 derived生成

referenceから
UI用derived画像を生成する。

原本変更禁止。

第一候補：

WebP

出力：

images/samples/derived/

24枚。

## 30. Batch A-11 原本Hash再確認

derived生成後、
reference 3枚のSHA-256を再確認する。

処理前と一致しない場合、
Batch Aを停止して原因調査する。

## 31. Batch A-12 derived File Test

確認：

- 24ファイル
- 0 byteなし
- format
- pixel size
- filename
- decode可能

## 32. Batch A-13 derived Visual Test

24枚すべて目視確認する。

Style：
8種類の差が分かる

Composition：
8種類の構図差が分かる

Lighting：
8種類の光・雰囲気差が分かる

## 33. Batch A-14 Sample Manifest

24カード分のManifestを作る。

最低限：

category
id
label
image
alt
order

Prompt Coreは含めない。

正式IDは04-prompt-dictionary.mdおよび05-sample-images-spec.mdと一致させる。

Style：

- anime
- illustration
- realistic
- manga-lineart
- watercolor
- oil-painting
- simple-flat
- pop-cute

Composition：

- face-closeup
- bust-up
- upper-body
- full-body
- wide-shot
- side-view
- low-angle
- high-angle

Lighting：

- natural-light
- bright
- soft-light
- sunset
- night
- cinematic
- dreamy
- dramatic

## 34. Batch A-15 Manifest Test

確認：

- 24 entries
- ID重複なし
- category
- label
- alt
- order
- image存在
- Prompt Dictionary IDとの一致

## 35. Batch A-16 Contact Sheet

必要に応じて、
開発確認用Contact Sheetを作成する。

正式原本として扱わない。

reference/へ保存しない。

## 36. Batch A完了条件

Batch A完了には最低限：

- app shell起動
- test基盤動作
- reference Hash一致
- crop定義完成
- derived 24枚完成
- 24枚目視確認
- Manifest完成
- Manifest Test成功
- Ver.1.1変更なし

が必要。

## 37. Batch Bの目的

UIから独立した
Prompt生成エンジンを完成させる。

先にPrompt Coreを安定させ、
UIへロジックを埋め込まない。

## 38. Batch B-1 PromptModel

03-data-design.mdに従い、
PromptModelを実装する。

最低限：

subject
character
style
composition
lighting
adjustments
negative
adapter

を扱えること。

## 39. Batch B-2 Prompt Dictionary

04-prompt-dictionary.mdの正式辞書を
実装データへ落とす。

Style 8
Composition 8
Lighting 8
Adjustment 4軸
Negative
Character関連

を扱う。

## 40. Batch B-3 Dictionary Test

確認：

- ID解決
- Unknown ID
- 必須field
- 重複ID
- Prompt Core
- labelとの混同なし

## 41. Batch B-4 Prompt Builder

PromptModelから
共通Promptを組み立てる。

基本：

subject
+
character
+
style
+
composition
+
lighting
+
adjustments
+
negative

UI文言を直接解析してPromptを作らない。

安定IDから辞書を解決する。

## 42. Batch B-5 512 Combination Test

8 Style
×
8 Composition
×
8 Lighting

＝512

全組み合わせについて、

- exceptionなし
- undefinedなし
- ID解決可能
- Prompt生成可能

を自動確認する。

512個のPromptを固定保存しない。

## 43. Batch B-6 Adjustment

detail
color
background
mood

4軸をPromptへ反映する。

UIスライダーそのものではなく、
PromptModel上の値として実装する。

## 44. Batch B-7 Adjustment Test

最低値
中間値
最大値

および境界外値を確認する。

## 45. Batch B-8 Negative

Negative Promptを
通常Promptデータと分離して扱う。

最低限：

text
logo
watermark
extra-objects
clutter
distortion

を扱う。

## 46. Batch B-9 Conflict処理

矛盾する指定が存在する場合の
正式辞書ルールを実装する。

勝手なAI判断を追加しない。

04のConflict方針に従う。

## 47. Batch B-10 Character Prompt

Characterデータから
PromptModelへ必要な情報を反映する。

最低限：

appearance
personality
rules
consistency

を扱う。

## 48. Batch B-11 Reference状態

Character Reference Imageについて、

- 画像設定が存在する
- 実際にAIへ添付した

を同一状態として扱わない。

04の正式仕様に従う。

## 49. Batch B-12 Adapter

以下を実装する。

- ChatGPT Adapter
- Gemini Adapter
- Generic Adapter

共通Prompt Coreを壊さず、
最終出力形式をAdapterで調整する。

## 50. Batch B-13 Adapter Test

同一PromptModelを、

ChatGPT
Gemini
Generic

へ渡し、

- 意味が欠落しない
- 不要なundefinedなし
- Adapter固有形式が適用される

ことを確認する。

## 51. Batch B-14 Prompt品質テスト

自動文字列検証だけでなく、
代表ケースを人間が確認する。

例：

アニメ風
全身
夕暮れ

水彩風
顔アップ
柔らかい

リアル風
ローアングル
シネマティック

等。

## 52. Batch B完了条件

最低限：

- PromptModel完成
- Dictionary完成
- Prompt Builder完成
- 512 Combination Test成功
- Adjustment Test成功
- Negative Test成功
- Conflict Test成功
- Character Test成功
- Unknown ID Test成功
- Adapter 3種成功
- Prompt品質確認
- UI非依存

を満たす。

## 53. PART1終了時点

PART1では、

- 実装原則
- 技術構成
- Module構成
- Batch A
- Sample資産
- Batch B
- Prompt Core

まで定義した。

PART2では、

- Batch C：主要UI
- Batch D：IndexedDB / Character / History / Favorite
- Batch E：統合 / 品質 / 公開準備
- Git方針
- Regression
- Security
- Accessibility
- Performance
- 完了条件
- 実装開始Gate

を定義する。

## 54. Batch Cの目的

Batch Cでは、
Batch AのSample資産と
Batch BのPrompt Coreを利用して、
Ver.2の主要ユーザー動線を実装する。

基本動線：

HOME
↓
作りたいもの
↓
絵柄
↓
構図
↓
光・雰囲気
↓
微調整
↓
完成

1画面1判断を基本とする。

## 55. Batch C-1 HOME

HOMEでは、
ユーザーが迷わず画像作成を開始できることを優先する。

過剰な設定項目を最初から表示しない。

最低限：

- アプリ名
- 短い説明
- 作成開始導線
- 保存済みデータへの導線

を検討する。

正式UIは02-ui-ux-design.mdに従う。

## 56. Batch C-2 作りたいもの

ユーザーが作成したい画像内容を入力する。

subjectをPromptModelへ保持する。

自由入力とSample選択を混同しない。

## 57. Batch C-3 Style Step

Style 8カードを表示する。

Sample Manifestから、

- image
- label
- alt
- order
- id

を取得する。

選択結果：

PromptModel.style

へ安定IDを設定する。

## 58. Batch C-4 Composition Step

Composition 8カードを表示する。

選択結果：

PromptModel.composition

へ安定IDを設定する。

## 59. Batch C-5 Lighting Step

Lighting 8カードを表示する。

選択結果：

PromptModel.lighting

へ安定IDを設定する。

## 60. Batch C-6 Sample Card共通化

Style / Composition / Lightingで
同一概念のカードUIを重複実装しない。

共通Sample Cardとして、

- image
- label
- alt
- selected
- keyboard
- focus

を扱える構造を目指す。

## 61. Batch C-7 選択状態

カード選択状態は、

UI
PromptModel
Navigation

で一致させる。

画面だけ選択済みで、
PromptModelが未設定という状態を作らない。

## 62. Batch C-8 Navigation

最低限：

- 次へ
- 戻る

を実装する。

戻った場合も、
それまでの入力・選択を維持する。

不要な再入力を要求しない。

## 63. Batch C-9 Step Validation

次Stepへ進むための必須条件を
正式仕様に従って検証する。

未選択の場合は、
ユーザーが理解できる形で案内する。

console errorだけで済ませない。

## 64. Batch C-10 Adjustment UI

detail
color
background
mood

4軸を微調整できるUIを実装する。

UI値とPromptModel値の変換を
一箇所で管理する。

## 65. Batch C-11 Adjustment Preview

微調整によって何が変わるかを、
初心者にも理解しやすくする。

必要に応じて、

- 現在値
- 短い説明
- 初期値へ戻す

を提供する。

## 66. Batch C-12 完成画面

完成画面では最低限、

- 選択内容
- 完成Prompt
- Adapter
- Copy

を確認できるようにする。

## 67. Batch C-13 Copy

完成PromptをClipboardへコピーする。

成功・失敗をユーザーへ表示する。

コピーできなかった場合に、
Promptそのものが失われないようにする。

## 68. Batch C-14 Adapter UI

ChatGPT
Gemini
Generic

を選択可能にする。

Adapter変更時に、
元のPromptModelを破壊しない。

## 69. Batch C-15 Responsive

02-ui-ux-design.mdに従い、
スマートフォンを重要対象とする。

Sample Card：

スマートフォン
→ 2列Grid第一候補

Desktop
→ 2〜4列程度

画面幅に応じて確認する。

## 70. Batch C-16 Accessibility

最低限：

- keyboard操作
- focus可視化
- alt
- label
- selected state
- 色だけに依存しない状態表示
- 適切なbutton等のHTML要素

を確認する。

## 71. Batch C-17 UI Integration Test

確認：

subject入力
↓
Style選択
↓
Composition選択
↓
Lighting選択
↓
Adjustment
↓
Adapter
↓
Prompt生成
↓
Copy

が一連で動作すること。

## 72. Batch C-18 Back Navigation Test

完成画面まで進んだ後、

戻る
↓
選択変更
↓
再度完成

を行い、
変更内容が正しくPromptへ反映されること。

## 73. Batch C完了条件

最低限：

- HOME
- subject
- Style 8
- Composition 8
- Lighting 8
- Adjustment 4軸
- Result
- Adapter
- Copy
- Navigation
- responsive
- accessibility基本確認
- UI Integration Test成功
- Back Navigation Test成功

を満たす。

## 74. Batch Dの目的

Batch Dでは、
作成体験を継続利用できるアプリへ拡張する。

主対象：

- IndexedDB
- Draft
- Project
- History
- Favorite
- Export / Import
- Migration

Character管理機能はMVP完了条件には含めず、MVP後のPhaseで実装する。
PromptModel、Prompt Builder、データ設計、辞書設計は、
将来Characterを追加できる構造を維持する。

### CharacterのMVP後移行

以下はMVP後のPhaseへ移す。

- Character Sheet
- Character一覧
- Character編集
- Character削除
- Character再利用
- Character Reference Image管理

## 75. Batch D-1 IndexedDB

03-data-design.mdに従って
IndexedDB基盤を実装する。

DB VersionとSchema Versionを混同しない。

失敗を握りつぶさない。

## 76. Batch D-2 Storage Error

保存失敗時に、
成功したような表示をしない。

最低限：

- transaction failure
- quota関連
- invalid data
- open failure

を扱う。

## 77. Batch D-3 Draft

作成途中の状態を保存・復元できるようにする。

戻ってきたユーザーが、
最初から入力し直す必要を減らす。

## 78. Batch D-4 Project

完成前後の作成単位を
Projectとして管理する。

画像ファイルそのものではなく、
安定IDやPromptModelを中心に保存する。

## 79. Batch D-5 History

Prompt生成履歴を管理する。

最低限：

- ID
- createdAt
- PromptModel
- generated output
- Adapter

等を正式データ仕様に従って扱う。

## 80. Batch D-6 Favorite

History等から
Favorite状態を管理できるようにする。

Historyデータを不必要に複製しない。

03-data-design.mdの参照方式に従う。

## 81. Batch D-7 Character

Character Sheetを独立データとして実装する。

Ver.1.1の主人公設定の考え方を参考にできるが、
Ver.1.1コードを無計画にコピーしない。

正式仕様は03 / 04を優先する。

## 82. Batch D-8 Character項目

最低限、
正式データ仕様に定義された、

- name
- appearance
- personality
- rules

等を扱う。

追加項目は推測で増やさない。

## 83. Batch D-9 Character一覧

保存したCharacterを、

- 一覧
- 選択
- 編集
- 削除

できるようにする。

削除時に参照中データへ
どのような影響があるかを考慮する。

## 84. Batch D-10 Character再利用

Characterを複数Projectから
再利用可能にする。

CharacterとProjectを
一体化したデータとして固定しない。

## 85. Batch D-11 Character Reference

Character Reference Imageについて、
正式仕様に従いmetadataを管理する。

「Reference設定済み」と
「外部AIへ画像添付済み」を混同しない。

## 86. Batch D-12 Export

ユーザーデータをJSONへExportできるようにする。

最低限：

- schemaVersion
- export日時
- 対象データ

を正式仕様に従って含める。

## 87. Batch D-13 Import

JSON Import時に、

- JSON parse
- schemaVersion
- 必須field
- unknown version
- invalid data

を検証する。

壊れたデータをそのままDBへ投入しない。

## 88. Batch D-14 Import Preview

可能であれば、
Import前に内容確認を行う。

少なくともImport失敗時に
既存データを破壊しない。

## 89. Batch D-15 Migration

03-data-design.mdのMigration仕様に従う。

旧schemaから新schemaへ変換する場合、
変換処理を明示的に管理する。

Unknown Versionを
無理に読み込まない。

## 90. Batch D-16 Ver.1.1 Migration

Ver.1.1データ移行を正式要件に含む場合、
旧localStorageデータを解析して変換する。

Ver.1.1側の保存データ自体を書き換えない。

移行は原則コピー方式とする。

## 91. Batch D-17 Storage Test

最低限：

- Create
- Read
- Update
- Delete
- Draft restore
- History
- Favorite
- Character
- Export
- Import
- Migration
- Unknown Version
- invalid data

を確認する。

## 92. Batch D-18 Reload Test

Browser reload後に、

- Draft
- Project
- Character
- History
- Favorite

が仕様どおり復元されることを確認する。

## 93. Batch D完了条件

最低限：

- IndexedDB
- Draft
- Project
- History
- Favorite
- JSON Export
- JSON Import
- Migration
- Storage Test
- Reload Test

Character管理機能はMVP完了条件に含めない。
Character関連のBatch D項目は、将来Phaseの実装候補として設計を保持する。

を満たす。

## 94. Batch Eの目的

Batch Eでは、
各機能を統合し、
公開可能な品質へ近づける。

新機能を大量追加するBatchではない。

## 95. Batch E-1 Full Flow Test

初回起動から完成まで確認する。

HOME
↓
subject
↓
Style
↓
Composition
↓
Lighting
↓
Adjustment
↓
Adapter
↓
Result
↓
Copy
↓
Save
↓
History

## 96. Batch E-2 512 Regression

Batch Bで成功した
512 Combination Testを再実行する。

UI・Storage追加によって
Prompt Coreが壊れていないことを確認する。

## 97. Batch E-3 Sample Regression

確認：

- 24画像存在
- Manifest 24 entries
- ID一致
- Prompt Dictionary一致
- 画像表示
- 選択
- Prompt反映

## 98. Batch E-4 Storage Regression

確認：

- Draft
- Project
- History
- Favorite
- Character
- Export
- Import
- Migration

## 99. Batch E-5 Mobile

実機または適切なモバイル相当環境で確認する。

最低限：

- 2列Grid
- Tap
- Scroll
- Navigation
- Copy
- Save
- Character
- Import / Export

を確認する。

## 100. Batch E-6 Desktop

Desktopで、

- layout
- card
- keyboard
- focus
- result
- storage UI

を確認する。

## 101. Batch E-7 Browser

MVP対象ブラウザを決め、
最低限主要対象で確認する。

対象範囲はREADMEへ記録する。

未確認ブラウザを
確認済みと記載しない。

## 102. Batch E-8 Accessibility

最低限：

- keyboard only
- focus
- button semantics
- labels
- alt
- selected state
- error message
- color dependency

を再確認する。

## 103. Batch E-9 Performance

確認：

- 初期ロード
- Sample画像
- Step切替
- IndexedDB
- Prompt生成
- layout shift

MVP用途で明らかな待ち時間がないか確認する。

## 104. Batch E-10 Security

最低限：

- innerHTML利用箇所
- escaping
- user input
- Import JSON
- file input
- URL handling
- XSS
- prototype pollution等の危険なmerge

を確認する。

## 105. Batch E-11 Privacy

MVPで外部APIを使用しない場合、
ユーザーデータが端末内保存であることを
README等で正確に説明する。

外部送信がある機能を将来追加した場合は、
説明を更新する。

## 106. Batch E-12 Error Handling

最低限：

- IndexedDB失敗
- Clipboard失敗
- Import失敗
- Sample画像404
- invalid ID
- corrupted data

でアプリ全体が停止しないことを確認する。

## 107. Batch E-13 Empty State

以下の空状態を確認する。

- History 0
- Favorite 0
- Character 0
- Draftなし
- Projectなし

空なのにエラー画面のように見せない。

## 108. Batch E-14 Long Text

長いsubject、
Characterメモ、
生成Prompt等で、

- layout崩れ
- overflow
- copy
- save

を確認する。

## 109. Batch E-15 Data Volume

History等が増えた場合の
基本挙動を確認する。

MVPで大規模DB最適化を過剰に行わないが、
少数データ前提だけで実装しない。

## 110. Batch E-16 Documentation

実装結果に合わせ、

- README.md
- PROJECT_CONTEXT.md

を更新する。

予定機能と実装済み機能を混同しない。

## 111. Batch E-17 Version

Version表記を統一する。

設計Versionと
アプリVersionを混同しない。

README、
画面、
PROJECT_CONTEXT等の
アプリVersionを確認する。

## 112. Batch E-18 robots

公開方針に応じて
robots設定を判断する。

Ver.1.1の設定を
理由なくコピーしない。

## 113. Batch E-19 Deployment候補

公開先は実装完了後に決定する。

候補：

- GitHub Pages
- Vercel
- Netlify

MVPが完全静的であれば、
静的Hostingを優先できる。

## 114. API追加時

将来AI APIを導入する場合、
API KeyをBrowserへ埋め込まない。

Browser
↓
Backend
↓
AI API

の構成を基本とする。

MVPの静的構成と分離する。

## 115. Git開始方針

Ver.2はVer.1.1と
独立したGit repositoryとする。

yonkoma-prompt-makerの.gitを
コピーしない。

## 116. Git init時期

設計6文書の正式登録、
相互矛盾確認、
実装開始Gate通過後を
Git initの候補時期とする。

実際のGit initは
人間の承認後に行う。

## 117. Initial Commit

Git開始時は、
何をInitial Commitへ含めるか確認する。

候補：

- AGENTS.md
- docs/
- README
- PROJECT_CONTEXT
- reference画像
- 初期directory

生成途中の不要ファイルを
混入させない。

## 118. Commit単位

巨大な1 Commitにしない。

例：

Batch A基盤
Batch A Sample assets
Batch B Prompt Core
Batch C UI
Batch D Storage
Batch E Quality

等、意味のある単位にする。

ただしCommitは
人間の承認範囲に従う。

## 119. Push

Remote作成・Pushは、
明示的な承認後に行う。

既存のyonkoma-prompt-maker remoteへ
誤Pushしない。

## 120. Deploy

Deployは、
ローカルテスト完了後に行う。

Push成功だけで
公開成功と判断しない。

公開URLで実動作を確認する。

## 121. Regression方針

各Batch完了後、
そのBatchだけでなく
前Batchの主要テストも再実行する。

例：

Batch C後
→ Batch B Prompt Tests再実行

Batch D後
→ Batch B + C主要テスト再実行

Batch E
→ 全体回帰

## 122. 仕様変更

実装中に設計変更が必要になった場合、

コードだけ先に変更して
設計書を放置しない。

変更理由
↓
影響範囲
↓
設計更新
↓
実装
↓
テスト

の順を基本とする。

## 123. 不明点

正式設計から判断できない事項を、
実装者が勝手に製品仕様として確定しない。

実装上の軽微な内部判断と、
ユーザー体験・データ仕様に影響する判断を区別する。

## 124. Stop条件

以下の場合は作業を停止して確認する。

- 原本Hash不一致
- 重大な設計矛盾
- Ver.1.1への意図しない変更
- データ破壊の可能性
- API Key露出の可能性
- Migrationで既存データ破壊の可能性
- 仕様にない大規模変更が必要

## 125. Batch報告

各Batch完了時、
最低限以下を報告する。

- 変更ファイル
- 実装内容
- テスト結果
- 手動確認
- 未解決事項
- 次Batch
- Git状態
- Ver.1.1状態

## 126. Doneの定義

「コードを書いた」だけで
Doneとしない。

Doneには、

- implementation
- automated test
- manual check
- regression
- documentation

を含める。

## 127. MVPに含めない候補

正式Requirementsで
後続Phaseとされた機能を、
実装の勢いでMVPへ追加しない。

例：

- Google login
- email OTP
- cloud sync
- Vision API
- AI画像直接生成
- 課金
- 複数ユーザー同期

正式要件を優先する。

## 128. LINEスタンプ

LINEスタンプ機能は、
01-requirements.mdで定めたPhaseに従う。

MVP外であれば、
Batch A〜Eへ勝手に追加しない。

将来拡張可能な構造は維持してよい。

## 129. 4コマ漫画

Ver.1.1の4コマ機能を、
Ver.2 MVPへ自動的に移植しない。

01の正式スコープに従う。

Ver.1.1は独立して維持する。

## 130. 複数コマ漫画

複数コマ漫画も同様に、
正式MVPスコープ外なら実装しない。

## 131. AIモデル最適化

MVPではAdapter方式を正式中心とする。

モデル固有API呼び出しと
AdapterによるPrompt整形を混同しない。

## 132. 日本語・英語

Promptの言語仕様は
04-prompt-dictionary.mdを正式情報源とする。

翻訳APIを勝手に追加しない。

## 133. Sample画像の意味

24 Sampleは単なる装飾ではなく、
PromptModelへ安定IDを入力するUIである。

画像表示だけ完成しても
Prompt連携できなければDoneではない。

## 134. Characterの意味

Characterは
フォーム内の一時的な主人公欄ではなく、
独立して再利用可能なデータとして扱う。

## 135. Local First

MVPでは正式要件に従い、
Local Firstを基本とする。

クラウド同期を前提にしない。

## 136. Backup

Local Firstであるため、
JSON Export / Importを
重要なバックアップ手段として扱う。

保存機能だけ実装して
Backupを後回しにしない。

## 137. Data Loss Test

少なくとも、

- reload
- import失敗
- migration失敗
- invalid JSON

等で、
既存データを意図せず失わないことを確認する。

## 138. 実装品質

コード量の少なさだけを目的にしない。

同時に、
将来を想定しすぎた過剰抽象化も避ける。

現在の正式MVPを
読みやすく安全に実装する。

## 139. コメント

コードコメントは、
コードを読めば分かる処理の説明ではなく、

- なぜこの仕様なのか
- なぜこの例外処理が必要か
- なぜこのIDを維持するか

等に使用する。

## 140. Naming

04 / 05で定義した安定IDを
実装都合で変更しない。

UI labelと内部IDを分離する。

## 141. Test Fixture

代表データをFixtureとして用意する場合、
実際のユーザーデータや個人情報を使用しない。

テスト専用データを使用する。

## 142. Console

公開候補Buildでは、
不要なdebug logを残さない。

Errorまで握りつぶさない。

## 143. Zero Error

主要動線で、

- uncaught exception
- unhandled rejection
- 重大なconsole error

がないことを確認する。

## 144. Browser Storage

localStorageとIndexedDBの役割を混在させない。

正式データ仕様に従う。

一時的な実装都合で
同じデータを複数Storageへ二重保存しない。

## 145. Image Storage

正式Sample Imagesを
IndexedDBへ複製しない。

User Reference Image等については、
03-data-design.mdの正式仕様に従う。

## 146. Export Compatibility

Export形式にはschemaVersionを持たせ、
将来Migration可能な形を維持する。

## 147. Import Safety

Importは既存データへ
無条件上書きしない。

正式仕様に従い、
検証後に処理する。

## 148. Completion Gate

Batch E完了後、
以下を確認する。

- Batch A完了
- Batch B完了
- Batch C完了
- Batch D完了
- Batch E完了
- 全自動テスト成功
- 手動確認完了
- 重大既知不具合なし
- docs更新
- README更新
- PROJECT_CONTEXT更新
- Ver.1.1変更なし

## 149. Deploy Gate

Deploy前：

- Completion Gate通過
- Git状態確認
- Remote確認
- 秘密情報なし
- 公開対象確認
- robots方針確認
- 公開URL確認方法確定

を行う。

## 150. 公開後確認

Deploy後：

- HOME表示
- Sample画像
- 主要Flow
- Prompt生成
- Copy
- Save
- Reload
- Mobile
- Console

を公開URLで確認する。

## 151. Rollback

公開後に重大問題が見つかった場合、
直前の正常Versionへ戻せるようにする。

Git Tag等の具体方式は
Git開始後に決定する。

## 152. Ver.2 MVP完了条件

Ver.2 MVPは最低限、

- 一枚絵中心
- 1画面1判断
- Style 8
- Composition 8
- Lighting 8
- Adjustment 4軸
- PromptModel
- Prompt Builder
- ChatGPT Adapter
- Gemini Adapter
- Generic Adapter
- IndexedDB
- Draft
- Project
- History
- Favorite
- JSON Export / Import
- Sample 24カード
- responsive
- accessibility基本対応
- automated tests

が正式仕様どおり動作すること。

## 153. Ver.2で後回しにするもの

正式Requirementsに従い、

- 認証
- Cloud DB
- 複数端末同期
- Vision API
- AI画像直接生成
- 課金

等は後続Phaseとする。

## 154. 設計完了Gate

本06を正式保存した後、

AGENTS.md
01
02
03
04
05
06

を横断確認する。

重大な矛盾がなければ、
設計工程を完了扱いにできる。

## 155. Git init Gate

設計完了Gate通過後も、
自動的にGit initしない。

Git initは人間の承認を得て実施する。

## 156. Batch A開始Gate

Batch A開始前に、
人間から実装開始の明示的な指示を得る。

その指示前に、

- package導入
- source code作成
- crop
- derived生成

を開始しない。

## 157. 最初の実装作業

実装開始承認後の最初の作業は、
Batch A-1 現状確認とする。

いきなりUI実装や
Prompt Builder実装から開始しない。

## 158. 実装開始時の報告

Batch A開始時に、

- 対象directory
- Ver.1.1との分離
- 設計書状態
- 原本状態
- Git状態

を最初に確認・報告する。

## 159. 正式実装順

正式順序：

Batch A
↓
Batch B
↓
Batch C
↓
Batch D
↓
Batch E

原則として順序を飛ばさない。

必要な軽微調整を除き、
後Batchの機能を先行実装しない。

## 160. 最終方針

Ver.2では、

「たくさん設定できるツール」

ではなく、

「見て、選んで、少し調整すると、
自分では言葉にできなかった画像Promptが完成する」

体験を優先する。

技術構成・データ構造・Prompt Dictionary・
Sample Images・Storageは、
この体験を安定して支えるために存在する。

## 161. 次工程

本Implementation Plan正式登録後、

1. 6設計書相互整合性確認
2. 設計完了Gate判定
3. Git init可否を人間へ確認
4. Batch A開始可否を人間へ確認
5. 承認後、Batch A-1から実装開始

とする。
