# AGENTS.md
# Image Prompt Maker Ver.2

## 1. このファイルの目的

このファイルは `image-prompt-maker-v2` を開発するAIエージェント向けの最上位作業ルールです。

このプロジェクトは、既存の `yonkoma-prompt-maker` Ver.1.1とは別の新規プロジェクトです。

`yonkoma-prompt-maker` は参照専用とし、明示的な指示がない限り変更しないでください。

---

## 2. プロジェクトの目的

画像生成プロンプトメーカー Ver.2 を完成させます。

画像生成AIの専門知識がないユーザーでも、

「作りたいものを書く」
↓
「好きな見た目を画像から選ぶ」
↓
「少し調整する」
↓
「完成したプロンプトをコピーする」

という流れだけで、画像生成用プロンプトを作れるアプリを目指します。

専門用語を覚えさせることではなく、

「見て選べば作れる」

ことを最優先します。

---

## 3. 作業対象

通常の作業対象は、

`image-prompt-maker-v2`

のみです。

既存プロジェクト、

`yonkoma-prompt-maker`

はVer.1.1の参照資料として扱います。

明示的な指示がない限り、Ver.1.1側の以下を変更してはいけません。

- コード
- README
- PROJECT_CONTEXT
- LICENSE
- robots.txt
- Git設定
- Git履歴
- 保存仕様
- 公開環境

Ver.1.1から必要な考え方や実装を参照することは可能です。

---

## 4. 作業開始時の必須確認

実装を開始する前に、原則として以下を確認してください。

1. `AGENTS.md`
2. `README.md`
3. `PROJECT_CONTEXT.md`
4. `docs/01-requirements.md`
5. `docs/02-ui-ux-design.md`
6. `docs/03-data-design.md`
7. `docs/04-prompt-dictionary.md`
8. `docs/05-sample-images-spec.md`
9. `docs/06-implementation-plan.md`
10. 現在のファイル構成
11. 現在のGit状態
12. 既存テスト
13. 今回の実装対象に関係するコード

仕様書が仮版の場合は、仮版を正式仕様として推測して実装しないでください。

---

## 5. 仕様の優先順位

仕様が矛盾した場合は、以下の順で判断してください。

1. 今回のユーザーからの明示的な指示
2. `AGENTS.md`
3. `docs/01-requirements.md`
4. `docs/02-ui-ux-design.md`
5. `docs/03-data-design.md`
6. `docs/04-prompt-dictionary.md`
7. `docs/05-sample-images-spec.md`
8. `docs/06-implementation-plan.md`
9. `PROJECT_CONTEXT.md`
10. `README.md`
11. 既存実装

判断できない重大な矛盾がある場合は、勝手に仕様を作らず報告してください。

---

## 6. 自律的に進めてよい作業

正式仕様が確定した後は、以下について逐一確認を求めず、合理的に判断して進めて構いません。

- 必要ファイルの作成
- 既存ファイルの編集
- モジュール分割
- 安全なリファクタリング
- テスト作成
- テスト実行
- lint / format
- ローカルブラウザ確認
- エラーハンドリング
- アクセシビリティ改善
- README更新
- PROJECT_CONTEXT更新
- docs更新
- 必要最小限の開発依存関係追加

目的は、細かなコード修正ごとに作業を止めることではなく、指定された開発範囲を完成状態まで進めることです。

---

## 7. 必ず停止して確認する条件

以下の場合は独断で進めないでください。

- データ消失の可能性がある
- 既存データとの互換性を破壊する
- 有料APIを使用する
- APIキーが必要になる
- 外部アカウント操作が必要になる
- 本番Deployが必要になる
- 公開範囲を変更する
- 認証方式を導入・変更する
- 個人情報をサーバーへ保存する
- ライセンスを変更する
- アプリの主目的を変更する
- 大規模な仕様変更が必要になる
- Ver.1.1を変更する必要が生じる

---

## 8. Commit / Push / Deploy

Commit、Push、Deployは、その時点のユーザー指示に従ってください。

明示的な許可がない場合は、

- ローカル実装
- テスト
- ブラウザ確認
- Git差分確認

まで行い、結果を報告してください。

勝手に本番公開しないでください。

---

## 9. Ver.1.1の利用方針

`yonkoma-prompt-maker` Ver.1.1はコードベースとして継ぎ足す対象ではなく、参照資産です。

特に参考価値が高いもの：

- キャラクター設定
- 人物ルール
- 基準画像参照指示
- 舞台・小物
- 避けたいこと
- プロンプト組み立て
- コピー処理
- 保存機能の考え方
- レスポンシブUIの知見

必要なものだけをVer.2仕様に合わせて再設計してください。

Ver.1.1の巨大な `script.js` をVer.2へコピーして中心実装にしないでください。

---

## 10. Ver.2の基本UX

最重要原則は、

**1画面1判断**

です。

基本フロー：

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

初心者が専門用語を知らなくても操作できることを優先してください。

例：

- low angle → 「下から」
- high angle → 「上から」
- cinematic lighting → 「映画のような光」

内部処理では専門的な表現を使用して構いません。

---

## 11. 正式参考画像

Ver.2には以下の正式参考画像原本があります。

`images/samples/reference/style-reference.png`

`images/samples/reference/composition-reference.png`

`images/samples/reference/lighting-reference.png`

3枚とも、

`1536 × 1024 px`

のPNGです。

これらは正式な比較シート原本です。

### style-reference.png

8種類：

1. アニメ風
2. イラスト風
3. リアル風
4. マンガ風（線画）
5. 水彩風
6. 油彩風
7. シンプル・フラット
8. ポップ・かわいい

### composition-reference.png

8種類：

1. 顔アップ
2. バストアップ
3. 上半身
4. 全身
5. 引き
6. 横から
7. ローアングル
8. 俯瞰（上から）

### lighting-reference.png

8種類：

1. 自然光
2. 明るい
3. 柔らかい
4. 夕暮れ
5. 夜
6. シネマティック
7. 幻想的
8. ドラマチック

つまり、

**3枚の比較シートの中に24種類のサンプルが存在する**

構成です。

「24枚の原本画像が存在する」と解釈しないでください。

---

## 12. 参考画像の原本保護

3枚の比較シートについて、明示的な指示なしに以下を行ってはいけません。

- 上書き
- 再生成
- 色補正
- リサイズ
- トリミング
- 画像内文字変更
- 削除
- 24枚への分割

UIで個別カード画像が必要になった場合は、原本を残したまま派生画像を作成してください。

原本と派生画像を明確に区別してください。

---

## 13. 辞書ID

基本IDは以下を使用します。

### STYLE

- `anime`
- `illustration`
- `realistic`
- `manga-lineart`
- `watercolor`
- `oil-painting`
- `simple-flat`
- `pop-cute`

### COMPOSITION

- `face-closeup`
- `bust-up`
- `upper-body`
- `full-body`
- `wide-shot`
- `side-view`
- `low-angle`
- `high-angle`

### LIGHTING

- `natural-light`
- `bright`
- `soft-light`
- `sunset`
- `night`
- `cinematic`
- `dreamy`
- `dramatic`

UI表示名と内部IDを分離してください。

表示名を変更しても保存データやPromptModelが壊れない構造にしてください。

---

## 14. アーキテクチャ原則

Ver.2は新規プロジェクトとして責務を分離してください。

想定例：

src/
  data/
  prompt/
  storage/
  ui/
  app.js

images/
  samples/
    reference/
    derived/

tests/

docs/

実際の構成は実装上合理的な範囲で調整可能です。

ただし、1つの巨大なJavaScriptファイルへ、

- UI
- データ
- 保存
- プロンプト生成
- 辞書

を集中させないでください。

---

## 15. Prompt生成

UIから直接巨大なプロンプト文字列を生成しないでください。

基本構造：

UI State
↓
PromptModel
↓
Model Adapter
├── ChatGPT
├── Gemini
└── Generic

PromptModelをAIモデル非依存の中間表現として扱います。

想定フィールド：

- subject
- scene
- characters
- style
- composition
- camera
- lighting
- color
- mood
- detail
- constraints
- negative
- output

AIモデル固有の書式はAdapter側へ閉じ込めてください。

---

## 16. データ保存

Ver.2では将来的なデータ量と画像保存を考慮し、主保存方式としてIndexedDBを使用する設計を基本とします。

想定store：

- projects
- characters
- promptHistory
- favorites
- drafts
- assets
- settings

主要データには必要に応じて、

- stable ID
- schemaVersion
- createdAt
- updatedAt

を持たせてください。

画像BlobをJSON本文へ常時base64として埋め込む設計は避けてください。

---

## 17. JSONバックアップ

JSON Export / ImportはMVP対象とします。

Importでは最低限、

- format
- backupVersion
- schemaVersion
- 必須フィールド
- ID衝突
- JSON構文

を検証してください。

不正JSONによって既存データを破壊してはいけません。

---

## 18. セキュリティ

禁止：

- APIキーをフロントエンドへ埋め込む
- APIキーをブラウザへ平文保存する
- 独自パスワード認証を安易に作る
- 未エスケープのユーザー入力を `innerHTML` へ挿入する
- 信頼できないImportデータを無検証で適用する

初期MVPでは、原則としてユーザー入力を外部AI APIへ自動送信しません。

将来AI APIを導入する場合は、

Browser
↓
Backend
↓
AI API

を基本構成とします。

---

## 19. スマートフォン

スマートフォンを主要利用環境の一つとして扱ってください。

最低限確認する項目：

- HOME
- CTA
- 比較シート
- 選択操作
- 微調整
- 戻る
- コピー
- Draft復帰
- 長文入力
- タップ領域
- 横スクロール
- 画像読み込み

---

## 20. エラーUX

ユーザー向けエラーでは、必要以上に技術用語を表示しないでください。

例：

悪い：

`IndexedDB transaction failed`

良い：

`保存できませんでした。もう一度お試しください。`

詳細な技術情報は開発ログ等へ分離してください。

---

## 21. テスト方針

機能追加と同時に必要なテストを追加してください。

主な対象：

- 辞書データ
- PromptModel
- Model Adapter
- Project CRUD
- Character CRUD
- Draft
- Favorite
- History
- JSON Export / Import
- schemaVersion
- migration
- 不正JSON
- XSS系入力
- コピー
- ステップ遷移
- 戻る操作
- 状態保持

主要フローは可能な範囲でブラウザ確認またはE2Eテストを行ってください。

---

## 22. 完了条件

コードを書いただけで完了にしないでください。

最低限、

1. 実装完了
2. 構文確認
3. 必要なテスト追加
4. 関連テスト成功
5. ブラウザ確認
6. 重大なConsole Errorなし
7. スマホ幅確認
8. 回帰確認
9. 必要文書更新
10. PROJECT_CONTEXT更新
11. 差分確認
12. 意図しない変更なし

まで確認してください。

---

## 23. バグ修正

症状だけを隠す修正ではなく、原因を特定してください。

可能であれば再現テストを追加してください。

報告には、

- 症状
- 原因
- 修正箇所
- 修正内容
- テスト
- 回帰確認
- 残課題

を含めてください。

---

## 24. ドキュメント

実装と文書を一致させてください。

作業完了時には必要に応じて、

- README.md
- PROJECT_CONTEXT.md
- docs/

を更新してください。

PROJECT_CONTEXT.mdには最低限、

- 現在Version
- 完了済み
- 未完了
- 既知問題
- テスト結果
- 次回再開地点

を残してください。

---

## 25. 開発フェーズ

### Batch A

Phase 0〜2

- 開発基盤
- プロンプト辞書
- PromptModel
- ChatGPT Adapter
- Gemini Adapter
- Generic Adapter

### Batch B

Phase 3〜5

- IndexedDB
- HOME
- 一枚絵Step UI
- 微調整
- 完成画面

### Batch C

Phase 6〜8

- Draft
- 作品保存
- Favorite
- History
- JSON Backup

### Batch D

Phase 9〜10

- キャラクターシート
- LINEスタンプ

### Batch E

Phase 11〜12

- 参考画像のUI最終調整
- 必要に応じた派生カード画像
- UI仕上げ
- スマホ確認
- アクセシビリティ
- 最終テスト

各Batchで、

実装
→ テスト
→ ブラウザ確認
→ 文書更新
→ 差分確認

まで行ってから次へ進んでください。

---

## 26. 完了報告

作業完了時は最低限以下を報告してください。

1. 現状
2. 変更ファイル
3. 実装内容
4. テスト内容
5. テスト結果
6. ブラウザ確認
7. Git状態
8. 残課題
9. 次に進む項目

確認していないことを「確認済み」と報告しないでください。

---

## 27. 禁止事項

- 仕様書を読まずに本実装を始める
- 仮仕様を正式仕様と推測する
- Ver.1.1を勝手に変更する
- 比較シート原本3枚を勝手に加工する
- 24枚の原本画像が存在すると誤解する
- 巨大な単一JavaScriptへ機能を集中させる
- テストなしで完成扱いする
- APIキーをクライアントへ置く
- エラーを握りつぶす
- READMEと実装を不一致のまま残す
- 未確認事項を確認済みとして報告する

---

## 28. 現在地

現在はVer.2の実装前準備段階です。

完了済み：

- Ver.1.1とVer.2のプロジェクト分離
- `image-prompt-maker-v2` 作成
- 参考画像原本3枚の登録

登録済み原本：

- `style-reference.png`
- `composition-reference.png`
- `lighting-reference.png`

現在実施中：

- `AGENTS.md` 正式版登録

次に行うこと：

1. `docs/01-requirements.md` 正式版登録
2. `docs/02-ui-ux-design.md` 正式版登録
3. `docs/03-data-design.md` 正式版登録
4. `docs/04-prompt-dictionary.md` 正式版登録
5. `docs/05-sample-images-spec.md` 正式版登録
6. `docs/06-implementation-plan.md` 正式版登録
7. 設計書・参考画像の相互整合性チェック
8. Batch A開始

設計資料の正式登録が完了するまで、Ver.2の本実装を開始しないでください。