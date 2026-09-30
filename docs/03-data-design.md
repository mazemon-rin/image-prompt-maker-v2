# 画像生成プロンプトメーカー Ver.2
# データ設計書 v1.0

## 1. 文書情報

- 文書名：画像生成プロンプトメーカー Ver.2 データ設計書
- Version：1.0
- 対象：image-prompt-maker-v2
- 上位仕様：docs/01-requirements.md
- UI仕様：docs/02-ui-ux-design.md
- 状態：正式設計

## 2. 設計目的

Ver.2ではUI表示内容とプロンプト生成処理を直接結合しない。

ユーザーが画面上で選んだ内容を、一度共通データ構造へ変換し、そのデータから各AI向けプロンプトを生成する。

基本構造：

UI
↓
PromptModel
↓
Prompt Builder
↓
Adapter
├ ChatGPT
├ Gemini
└ Generic

保存・履歴・お気に入りもPromptModelを中心に扱う。

## 3. 基本原則

データ設計では以下を守る。

- UI表示名と内部IDを分離する
- 日本語表示文をデータの主キーにしない
- PromptModelをAI固有形式にしない
- 保存形式にschemaVersionを持つ
- Draftと完成作品を区別する
- HistoryとProjectを区別する
- Favoriteを独立して扱えるようにする
- キャラクターを独立オブジェクトにする
- 原本画像を保存データへ埋め込まない
- IndexedDBを永続保存の中心とする
- JSON Export / Import可能な構造にする

## 4. schemaVersion

永続保存データにはschemaVersionを持たせる。

初期：

schemaVersion: 2

将来データ構造を変更した場合、
schemaVersionを使ってMigration可能にする。

既存データを無条件に破棄しない。

## 5. ID

各主要オブジェクトは一意なIDを持つ。

対象例：

- Draft
- Project
- History
- Favorite
- Character

IDは表示名から生成しない。

UUID等、衝突しにくい方式を利用する。

具体的実装方式は実装段階で決定可能。

## 6. 日時

保存オブジェクトでは必要に応じて、

- createdAt
- updatedAt

を持つ。

Historyでは、

- generatedAt

等を使用可能。

日時は機械処理可能な形式で保存し、
表示時にユーザー向け形式へ変換する。

## 7. PromptModel

PromptModelはVer.2の中心データモデルである。

基本構造：

PromptModel
├ subject
├ style
├ composition
├ lighting
├ adjustments
├ negative
├ character
├ outputTarget
└ metadata

UIはPromptModelを直接文字列として組み立てない。

## 8. PromptModel基本例

概念例：

{
  "schemaVersion": 2,
  "subject": {
    "text": "夕暮れの海辺を歩く女の子"
  },
  "style": {
    "id": "watercolor"
  },
  "composition": {
    "id": "full-body"
  },
  "lighting": {
    "id": "sunset"
  },
  "adjustments": {},
  "negative": [],
  "character": null,
  "outputTarget": "chatgpt",
  "metadata": {}
}

これは概念構造であり、
辞書側の正式IDと矛盾しないよう後続設計で確定する。

## 9. subject

subjectはユーザーが最初に入力する
「作りたいもの」を保持する。

基本：

{
  "text": "海辺を歩く女の子"
}

ユーザー入力原文を保持する。

MVPではAIによる自動変換を前提にしない。

## 10. style

絵柄選択を保持する。

例：

{
  "id": "watercolor"
}

表示名：

「水彩風」

は辞書から取得する。

保存データへ表示文言を重複保存することを必須としない。

正式IDはprompt dictionaryとsample image specで一致させる。

## 11. composition

構図を保持する。

例：

{
  "id": "full-body"
}

UI表示：

「全身」

内部ID：

full-body

のように分離する。

## 12. lighting

光・雰囲気を保持する。

例：

{
  "id": "sunset"
}

UI表示：

「夕暮れ」

内部ID：

sunset

とする。

## 13. adjustments

微調整値を保持する。

例：

{
  "detail": 0.5,
  "colorIntensity": 0.5,
  "background": 0.5,
  "mood": 0.5
}

ここに示したキーは概念例であり、
正式な4軸はdocs/04-prompt-dictionary.mdで確定する。

03-data-design.mdだけで正式な4軸名を固定しない。

値はUI表示ラベルと分離する。

## 14. negative

「入れたくないもの」を保持する。

例：

[
  "text",
  "logo",
  "watermark"
]

表示文：

- 文字
- ロゴ
- 透かし

は辞書から取得可能にする。

将来的に自由入力を追加できる構造を阻害しない。

## 15. character

キャラクターを使用しない場合：

character: null

使用する場合は、
Character IDを参照することを基本とする。

例：

{
  "characterId": "..."
}

PromptModelへキャラクター情報全体を毎回複製しないことを基本方針とする。

ただしHistoryで当時の生成状態を再現する必要がある場合はSnapshotを検討する。

## 16. outputTarget

出力先を保持する。

初期値候補：

- chatgpt
- gemini
- generic

例：

"outputTarget": "chatgpt"

AIの細かなモデルVersionをPromptModel必須項目にしない。

## 17. metadata

将来拡張用情報を保持できる。

ただし何でもmetadataへ入れない。

正式なデータは可能な限り明示的なフィールドへ配置する。

metadataは補助用途とする。

## 18. Prompt Builder

Prompt BuilderはPromptModelを受け取り、
共通の意味情報をプロンプト生成可能な形へ変換する。

UI DOMを直接読んでプロンプトを生成しない。

基本：

UI State
↓
PromptModel
↓
Prompt Builder
↓
Adapter

## 19. Adapter

AIごとの差異はAdapterで吸収する。

初期：

- ChatGPT Adapter
- Gemini Adapter
- Generic Adapter

AdapterはPromptModel自体を書き換えない。

同じPromptModelから複数形式を生成できる構造にする。

## 20. Prompt出力

生成結果は必要に応じて、

{
  "positivePrompt": "...",
  "negativePrompt": "...",
  "target": "chatgpt"
}

のような形で扱える。

positiveとnegativeをデータ構造上分離できるようにする。

最終的に1つの文章へ統合するAdapterも許容する。

## 21. Draft

制作途中の状態。

Draftは完成作品とは別に管理する。

基本例：

{
  "id": "...",
  "schemaVersion": 2,
  "createdAt": "...",
  "updatedAt": "...",
  "currentStep": "style",
  "promptModel": {}
}

currentStepを保持し、
前回の続きへ戻れるようにする。

## 22. Draft保存

制作中の変更を適切なタイミングで保存する。

毎キー入力ごとの過剰な書き込みは避けてもよい。

debounce等の方式は実装時に決定可能。

重要なのは、
ブラウザを閉じた際の損失を減らすこと。

## 23. Draft複数化

MVPでは単一のactive Draftから開始してもよい。

ただし将来複数Draftへ拡張できない構造にはしない。

activeDraftId等を利用できる設計を考慮する。

## 24. Project

ユーザーが明示的に保存した完成作品をProjectとして扱う。

概念例：

{
  "id": "...",
  "schemaVersion": 2,
  "title": "...",
  "createdAt": "...",
  "updatedAt": "...",
  "promptModel": {},
  "generatedPrompt": {},
  "favorite": false
}

正式フィールドは後続章で整理する。

## 25. ProjectとDraft

Draft：
制作途中

Project：
ユーザーが保存した作品

と区別する。

DraftをそのままProjectテーブルへ混在させないことを基本とする。

## 26. generatedPrompt

Project保存時には、
PromptModelだけでなく、
その時点で生成された完成プロンプトを保持できる。

理由：

辞書やAdapterが将来更新されても、
保存時に何を出力したか確認できるようにするため。

## 27. History

Historyは「プロンプト生成を実行した記録」。

Projectとは異なる。

ユーザーが保存ボタンを押していなくても、
完成プロンプト生成時にHistoryへ記録可能とする。

具体的な記録タイミングは実装計画で決定する。

## 28. History Snapshot

Historyは将来辞書が変更されても、
当時の生成結果を確認できる必要がある。

そのため最低限、

- generatedAt
- PromptModel Snapshot
- generatedPrompt
- outputTarget

を保持することを基本候補とする。

## 29. Favorite

FavoriteはProjectまたはHistory等を
お気に入りとして扱う仕組み。

MVP実装方式は、

- 対象オブジェクトにfavorite booleanを持つ
- Favorite参照テーブルを持つ

のどちらも可能。

ただし複数対象をFavorite化する可能性を考慮すると、
独立参照方式を優先候補とする。

正式方式は実装計画との整合確認後に確定する。

## 30. Character

Characterは独立オブジェクトとして管理する。

一枚絵のPromptModelに直接埋め込むだけの構造にしない。

概念：

Character
├ id
├ name
├ basic
├ appearance
├ personality
├ reference
├ rules
├ createdAt
└ updatedAt

## 31. Character基本例

{
  "id": "...",
  "schemaVersion": 2,
  "name": "キャラクターA",
  "basic": {},
  "appearance": {},
  "personality": {},
  "reference": {},
  "rules": {},
  "createdAt": "...",
  "updatedAt": "..."
}

Ver.1.1の主人公設定・人物ルール・基準画像の考え方を再利用できる構造とする。

## 32. Character name

キャラクターにはユーザーが識別できる名前を持たせる。

表示名と内部IDは別にする。

名前変更で参照関係が壊れないこと。

## 33. basic

基本情報候補：

- type
- ageGroup
- genderPresentation
- role

正式項目はキャラクター実装フェーズで確定可能。

## 34. appearance

見た目候補：

- hair
- clothing
- body
- distinctiveFeatures

自由入力を併用可能にする。

## 35. personality

性格・雰囲気等を保持する。

プロンプトへどう反映するかは、
prompt dictionary / character prompt builder側で管理する。

## 36. reference

基準画像に関する情報を保持する領域。

重要：

画像そのものをlocalStorageへBase64保存する設計にはしない。

画像保存が必要な場合はIndexedDB Blob等を利用できる構造とする。

## 37. rules

Ver.1.1の人物ルールの考え方を引き継ぐ。

例：

- 顔
- 髪型
- 輪郭
- 体型
- 服装
- 色
- キャラクター全体の雰囲気

を維持対象として表現できる。

詳細なプロンプト文そのものをデータへ過剰に固定しない。

## 38. Character Version

将来キャラクター設定を変更した際に、
過去作品の再現性が問題になる。

MVPで完全なVersion管理を必須にはしない。

ただし、

characterVersion

またはSnapshot方式を将来追加できる構造を阻害しない。

## 39. 画像データ

正式比較シート3枚はアプリ資産であり、
ユーザーデータではない。

保存DBへ複製しない。

パスまたはsample IDから参照する。

## 40. Sample ID

絵柄・構図・光の各サンプルには安定したIDを使用する。

例：

STYLE
anime
illustration
realistic
manga-lineart
watercolor
oil-painting
simple-flat
pop-cute

COMPOSITION
face-closeup
bust-up
upper-body
full-body
wide-shot
side-view
low-angle
high-angle

LIGHTING
natural-light
bright
soft-light
sunset
night
cinematic
dreamy
dramatic

これらは既存正式比較シートとの対応を維持する。

最終確認はdocs/04-prompt-dictionary.mdおよび
docs/05-sample-images-spec.mdで行う。

## 41. 永続保存方式

Ver.2ではIndexedDBを永続保存の中心とする。

localStorageを主要データ保存先にはしない。

理由：

- 構造化データを扱いやすい
- 保存容量に余裕がある
- Blobを扱える
- 将来のキャラクター基準画像保存に対応しやすい
- Project / History / Character等を分離管理できる

localStorageを使用する場合は、
小さなUI設定等の補助用途に限定する。

## 42. IndexedDB Database

Database名は実装時に一箇所で定義する。

概念例：

imagePromptMakerV2

Database Versionも明示的に管理する。

DB VersionとschemaVersionは別概念として扱う。

DB Version：
IndexedDB構造変更用

schemaVersion：
保存データ形式変更用

## 43. Object Store

初期候補：

- drafts
- projects
- history
- favorites
- characters
- assets
- settings

MVPで不要なStoreを無理に実装する必要はない。

ただしデータ種別を一つの巨大Storeへ無秩序に混在させない。

## 44. drafts Store

制作途中データを保存する。

主キー：

id

候補Index：

- updatedAt

active Draftの識別方法は、
settings等にactiveDraftIdを保持する方式を利用可能。

## 45. projects Store

明示的に保存された作品を管理する。

主キー：

id

候補Index：

- createdAt
- updatedAt

将来的にtitle検索等が必要になった場合は拡張可能にする。

## 46. history Store

生成履歴を保存する。

主キー：

id

候補Index：

- generatedAt
- outputTarget

履歴件数が増加することを考慮する。

無制限増加への対応方針は実装計画で決定する。

## 47. favorites Store

独立Favorite方式を採用する場合の概念：

{
  "id": "...",
  "targetType": "project",
  "targetId": "...",
  "createdAt": "..."
}

targetType候補：

- project
- history
- character

MVPで対象を限定することは可能。

存在しないtargetIdを参照し続けないよう、
削除時の整合性を考慮する。

## 48. characters Store

キャラクターを独立保存する。

主キー：

id

候補Index：

- updatedAt
- name

nameは一意キーにしない。

同名キャラクターを許容できる構造とする。

## 49. assets Store

ユーザーが登録した基準画像等を将来保存する場合に利用できる。

概念：

{
  "id": "...",
  "ownerType": "character",
  "ownerId": "...",
  "type": "reference-image",
  "blob": Blob,
  "mimeType": "image/png",
  "createdAt": "..."
}

MVPで画像登録を実装しない場合、
Store作成自体を後続Batchへ延期可能。

## 50. settings Store

小規模なアプリ設定を保持できる。

例：

- activeDraftId
- lastOutputTarget
- UI preferences
- dataVersion情報

機密情報を保存する場所として使用しない。

AI APIキーや認証秘密情報を保存しない。

## 51. Storage Layer

UIからIndexedDB APIを直接呼び出さない。

概念：

UI
↓
Service / Repository
↓
Storage Layer
↓
IndexedDB

保存処理を画面ごとに重複実装しない。

## 52. Repository

データ種別ごとに操作を分離できる。

例：

DraftRepository
ProjectRepository
HistoryRepository
CharacterRepository
FavoriteRepository

実際のファイル構成は実装計画で決定する。

## 53. 保存失敗

IndexedDB操作は失敗する可能性がある。

必ずエラーを捕捉し、
UIへ成功したように見せない。

保存成功後のみ成功通知を表示する。

## 54. Transaction

複数Storeへ関連データを書き込む場合、
可能な範囲でTransactionを使用する。

例：

Character削除
＋
関連Favorite削除
＋
関連Asset削除

途中だけ成功して不整合になることを避ける。

## 55. データ完全性

参照関係を持つデータについて、
存在しないIDを無条件に参照しない。

例：

PromptModel.character.characterId

が存在しても、
対象Characterが削除済みの場合がある。

その場合でもアプリ全体が壊れないようにする。

## 56. Character Snapshot

ProjectやHistoryがCharacter IDだけを参照すると、
Character編集後に過去作品の内容が変わって見える可能性がある。

そのため完成作品・Historyでは、
必要に応じてCharacter Snapshotを保持可能とする。

概念：

{
  "characterId": "...",
  "characterSnapshot": {
    "name": "...",
    "basic": {},
    "appearance": {},
    "personality": {},
    "rules": {}
  }
}

MVPでの正式採用範囲は実装計画で決定する。

## 57. Project基本構造

概念例：

{
  "id": "...",
  "schemaVersion": 2,
  "title": "...",
  "createdAt": "...",
  "updatedAt": "...",
  "promptModel": {},
  "generatedPrompt": {
    "positivePrompt": "...",
    "negativePrompt": "...",
    "target": "chatgpt"
  }
}

必要に応じてCharacter Snapshot等を追加する。

## 58. History基本構造

概念例：

{
  "id": "...",
  "schemaVersion": 2,
  "generatedAt": "...",
  "promptModelSnapshot": {},
  "generatedPrompt": {
    "positivePrompt": "...",
    "negativePrompt": "...",
    "target": "chatgpt"
  }
}

Historyは当時の生成結果を再現・確認するため、
Snapshot性を重視する。

## 59. Draft基本構造

概念例：

{
  "id": "...",
  "schemaVersion": 2,
  "createdAt": "...",
  "updatedAt": "...",
  "currentStep": "lighting",
  "promptModel": {}
}

完成プロンプトがまだ存在しなくてもよい。

## 60. 削除

削除対象：

- Draft
- Project
- History
- Favorite
- Character
- Asset

削除による関連データへの影響を定義する。

特にCharacter削除時、
過去Project / HistoryのSnapshotまで削除しない。

## 61. Character削除

Character本体を削除しても、
過去に生成済みのProject / Historyが確認不能にならないことを目指す。

そのため過去記録ではSnapshot利用を検討する。

現在制作中Draftが削除Characterを参照している場合は、
ユーザーへ分かる形で参照解除または警告する。

## 62. History削除

History削除によってProject本体を削除しない。

ProjectとHistoryは独立データとして扱う。

FavoriteがHistoryを参照している場合は、
関連Favoriteを整理する。

## 63. Project削除

Project削除時、
Historyまで自動削除しないことを基本とする。

Favorite参照がある場合は整理する。

## 64. JSON Export

ユーザーがデータをバックアップできるようにする。

Export対象候補：

- projects
- history
- favorites
- characters
- drafts
- settings

画像Blobを含む場合は、
単純JSONだけでは扱いにくいため別方式を検討する。

MVPではテキスト中心データのJSON Exportを優先する。

## 65. Export Envelope

JSON全体には識別情報を持たせる。

概念例：

{
  "format": "image-prompt-maker-v2-backup",
  "exportVersion": 1,
  "schemaVersion": 2,
  "exportedAt": "...",
  "data": {
    "projects": [],
    "history": [],
    "favorites": [],
    "characters": [],
    "drafts": [],
    "settings": []
  }
}

これにより別JSONの誤Importを防ぎやすくする。

## 66. Exportの安全性

Exportへ以下を含めない。

- APIキー
- 認証トークン
- パスワード
- セッション秘密情報

MVPではそもそもこれらを保持しない。

## 67. JSON Import

Import前に必ず形式を検証する。

最低限：

- format
- exportVersion
- schemaVersion
- data型
- 必須フィールド

を確認する。

不正なJSONをそのままDBへ書き込まない。

## 68. Import Mode

将来的に、

- 追加
- 置換

を分けられる構造とする。

MVPで両方実装する場合、
「置換」は破壊的操作として明確に警告する。

## 69. ID衝突

追加Import時、
既存IDと衝突する可能性がある。

無条件上書きしない。

候補：

- 新ID発行
- skip
- 明示的上書き

正式な衝突ルールは実装計画で確定する。

## 70. Import Transaction

Import途中で失敗した場合、
一部だけImportされる状態を可能な範囲で避ける。

検証
↓
変換
↓
Transaction
↓
保存

の順を基本とする。

## 71. Migration

schemaVersionが異なるデータを読み込む場合、
Migration Layerを経由する。

概念：

v1
↓
migrateV1ToV2()
## 72. Unknown Version

アプリが理解できない未来Versionのデータを、
無理に読み込まない。

例：

現在schemaVersion 2
Import schemaVersion 5

の場合は停止し、
対応していないVersionであることを通知する。

## 73. Ver.1.1データ

Ver.1.1とVer.2は別プロジェクトとして扱う。

Ver.1.1：

yonkoma-prompt-maker

Ver.2：

image-prompt-maker-v2

Ver.1.1のlocalStorageを、
Ver.2起動時に無条件で読み込まない。

## 74. Ver.1.1 Migration

将来Ver.1.1保存データをVer.2へ移行する場合は、
専用Importer / Migrationとして実装する。

Ver.1.1データを直接Ver.2内部形式として扱わない。

元データを変更・削除しない。

## 75. Ver.1.1保護

Ver.2実装によって、

- Ver.1.1 localStorage key
- Ver.1.1コード
- Ver.1.1保存データ
- Ver.1.1 Git履歴

を変更しない。

## 76. localStorage

Ver.2では主要データ保存先として使用しない。

使用可能な例：

- 小さなUI preference
- IndexedDBを開く前でも必要な軽量状態

ただしIndexedDBと同じ正式データを二重保存し、
どちらが正しいか分からなくなる設計は避ける。

## 77. APIキー

MVPではAI APIを使用しない。

APIキーを、

- IndexedDB
- localStorage
- source code
- JSON Export

へ保存しない。

将来API連携を追加する場合は別途セキュリティ設計を行う。

## 78. 認証データ

MVPではログイン機能を実装しない。

Googleログイン・メールOTP等を追加する場合も、
認証トークンを通常のProjectデータと同じStoreへ保存しない。

認証設計は将来のバックエンド設計として分離する。

## 79. 個人情報

MVPではサーバーへユーザーデータを保存しない。

ユーザーがsubjectやキャラクター名等へ個人情報を入力する可能性はあるため、
ExportされたJSONはユーザー自身のデータとして扱う。

不要な外部送信を行わない。

## 80. 入力値

ユーザー入力はデータとして扱い、
HTMLとして直接解釈しない。

表示時に適切なエスケープを行う。

Import JSONの文字列についても同様。

## 81. サイズ制限

subject、title、Character name、自由入力等には、
極端なデータによるUI破損を防ぐため合理的な上限を設定可能。

具体的な文字数は実装計画または実装時に決定する。

上限を設ける場合はUIでも分かるようにする。

## 82. Blob制限

将来画像保存を実装する場合、

- MIME type
- file size
- dimensions
- file count

等を検証する。

巨大画像を無制限にIndexedDBへ保存しない。

## 83. Sample Data

正式サンプル画像の情報は、
ユーザーデータDBへコピーしない。

アプリ側の辞書データとして管理する。

例：

{
  "id": "watercolor",
  "label": "水彩風",
  "category": "style",
  "image": "..."
}

正式構造は04 / 05設計書と整合させる。

## 84. Dictionaryと保存データ

保存データでは基本的に安定したIDを保持する。

例：

style.id = "watercolor"

表示時：

dictionary["watercolor"].label

から「水彩風」を取得する。

これによりUI表示文言変更で保存データを壊さない。

## 85. Unknown Dictionary ID

古い保存データに、
現在の辞書に存在しないIDが含まれる可能性を考慮する。

その場合アプリ全体をクラッシュさせない。

「不明な設定」等として表示し、
可能なら元IDを保持する。

## 86. Prompt再生成

ProjectからPromptModelを読み込み、
現在のAdapterで再生成することは可能。

ただし保存時generatedPromptと、
再生成したPromptは異なる可能性がある。

UIでは必要に応じて区別する。

## 87. Historyの意味

Historyは「その時に生成された結果」の記録である。

そのため現在の辞書で勝手に書き換えない。

## 88. Favorite整合性

Favorite対象が削除された場合、
孤立Favoriteを残さないことを基本とする。

起動時または削除Transaction時に整理できる。

## 89. Backup復元テスト

最低限確認：

- Exportできる
- JSONとして開ける
- Importできる
- Project件数が一致
- History件数が一致
- Character件数が一致
- PromptModelが保持される
- 日本語が壊れない
- 未知Versionを拒否できる
- 不正JSONを拒否できる

## 90. IndexedDBテスト

最低限：

- DB作成
- Store作成
- create
- read
- update
- delete
- 再読み込み後も保持
- Transaction失敗時
- 存在しないID
- schema upgrade

を確認する。

## 91. PromptModelテスト

最低限：

- subjectのみ
- 8 style
- 8 composition
- 8 lighting
- adjustment
- negative
- characterなし
- characterあり
- ChatGPT
- Gemini
- Generic

を確認する。

8×8×8の全512組み合わせを
手作業で確認する必要はない。

辞書・Builder・Adapterの自動テストで組み合わせ可能性を担保する。

## 92. データ層テスト

UIテストだけに依存しない。

Storage / Repository / Migration / Import / Exportは、
可能な範囲で独立して自動テスト可能にする。

## 93. 破損データ

保存データが一部破損していても、
アプリ全体が起動不能にならないことを目指す。

読み込めない1件を理由に、
全Projectを失わないようにする。

## 94. デバッグ

開発時にはデータ構造を確認できる手段を用意してよい。

ただし本番UIへ内部データや技術ログを常時表示しない。

## 95. 初期データ

初回起動時に、
大量のサンプルProjectやHistoryを自動登録しない。

辞書・正式サンプル画像はアプリ資産として提供する。

ユーザーデータ領域は基本的に空から開始する。

## 96. データ削除

将来「すべてのデータを削除」を提供する場合、
明確な確認を必要とする。

削除対象をユーザーへ示す。

Exportを事前に案内することも検討できる。

## 97. DB障害

IndexedDBが利用できない、またはOpenに失敗した場合、
何も説明せずアプリを続行しない。

保存機能が利用できないことをユーザーへ通知する。

制作自体を継続可能にするかは、
障害内容に応じて実装時に判断する。

## 98. データ設計上の正式決定

正式決定：

- PromptModelを中心とする
- UIとPrompt生成を分離する
- ChatGPT / Gemini / Generic Adapterを分離する
- positive / negativeを分離可能にする
- schemaVersionを持つ
- IndexedDBを主要保存先とする
- Draft / Project / Historyを区別する
- Characterを独立オブジェクトとする
- Favoriteを独立参照方式の優先候補とする
- JSON Export / Importを実装対象とする
- Migration可能な構造とする
- 正式比較シートをDBへ複製しない
- 保存データは表示名ではなく安定ID中心とする
- APIキーを保存しない
- Ver.1.1保存領域を変更しない

## 99. 後続設計へ委ねる事項

以下はこの文書だけで勝手に確定しない。

- 微調整4軸の正式名称
- Prompt辞書文言
- Adapterの具体的文章
- Sample画像ファイル命名
- 派生画像生成方法
- History最大保持件数
- Import ID衝突の最終ルール
- Character SnapshotのMVP採用範囲
- assets Storeを作成するBatch
- 各入力文字数上限
- IndexedDBライブラリ利用有無

## 100. 次工程

本データ設計書登録後、

1. docs/04-prompt-dictionary.md
2. docs/05-sample-images-spec.md
3. docs/06-implementation-plan.md

を正式登録する。

その後、

- Requirements
- UI / UX
- Data
- Prompt Dictionary
- Sample Images
- Implementation Plan

の相互矛盾チェックを実施する。

重大な問題がなければBatch A実装へ進む。

