# 画像生成プロンプトメーカー Ver.2

画像生成AI向けのプロンプトを、作りたい内容とサンプル画像の選択から組み立てるLocal FirstのWebアプリです。現在のVersionは **2.0.0 MVP** です。

## MVP機能

- 作りたい画像の入力
- 絵柄・構図・光・雰囲気の各8種類（合計24サンプル）から選択
- 微調整4軸とネガティブ要素
- Prompt生成とChatGPT / Gemini / Generic Adapter
- IndexedDBによるDraft、Project、History、Favoriteのローカル保存
- JSONバックアップのExport / ImportとMigration対応
- レスポンシブ表示と基本的なアクセシビリティ対応

## 起動方法

外部依存はありません。プロジェクト直下で次を実行します。

```sh
python3 -m http.server 4173
```

ブラウザで <http://127.0.0.1:4173/> を開いてください。

## テスト方法

```sh
node --test tests/*.mjs
```

## ディレクトリ概要

- `index.html`, `style.css`: アプリの画面とスタイル
- `src/`: Prompt Dictionary、Prompt Builder、Storage、アプリ処理、Manifest
- `images/samples/reference/`: 変更しない正式比較シート原本
- `images/samples/derived/`: UI表示用の24派生画像
- `tests/`: Node.js標準 `node:test` による自動テスト
- `docs/`: 正式設計書

## MVP外

Googleログイン、メールOTP、Cloud DB、複数端末同期、Vision API、AI画像の直接生成、課金、Character管理はMVPに含みません。

APIキーは使用せず、ブラウザへ秘密情報を配置しない構成です。
