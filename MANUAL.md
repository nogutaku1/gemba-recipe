# ゲンバ・レシピ (Gemba Recipe) 管理者マニュアル

このドキュメントでは、サイトの管理方法、記事の追加方法、およびローカルでの動作確認方法について説明します。

## 1. 記事の追加・編集方法

このサイトは、`content/recipes` フォルダ内の Markdown ファイル (`.md`) を読み込んで記事を表示しています。

### 新しい記事を追加する手順

1. `content/recipes` フォルダ内に、新しいファイルを作成します。ファイル名はURLの一部になります（例: `my-new-recipe.md`）。
2. ファイルの先頭に、以下の形式でメタデータ（Frontmatter）を記述します。

```markdown
---
title: "記事のタイトル"
date: "2025-12-05"
description: "記事の短い説明文（一覧ページやSEOに使われます）"
tags: ["タグ1", "タグ2"]
---
```

3. `---` の下に、本文を Markdown 形式で記述します。

### 記事の一括生成（上級者向け）

`content/recipes.json` ファイルを編集し、以下のコマンドを実行することで、複数の記事を一括で生成・更新できます。

```bash
node scripts/import-recipes.js
```

## 2. ローカルでの動作確認

手元のパソコンでサイトの表示を確認する手順です。

### 準備

初回のみ、以下のコマンドで必要なライブラリをインストールします。

```bash
npm install
```

### 開発サーバーの起動

以下のコマンドを実行します。

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くと、サイトが表示されます。
記事ファイルを編集して保存すると、ブラウザ上の表示も自動的に更新されます。

## 3. 本番公開（デプロイ）について

このソースコードは GitHub に連携されています。
Vercel などのホスティングサービスと GitHub を連携させることで、GitHub にプッシュするだけで自動的に本番サイトが更新されるようになります。

### GitHub リポジトリ
[https://github.com/nogutaku1/gemba-recipe](https://github.com/nogutaku1/gemba-recipe)

## 4. フォルダ構成

- `app/`: ページやレイアウトのプログラムが入っています。
  - `page.tsx`: トップページ
  - `recipe/[slug]/page.tsx`: 記事詳細ページ
- `components/`: 共通パーツ（ボタンなど）が入っています。
- `content/recipes/`: 記事データ（Markdown）が入っています。
- `lib/`: データ取得などの裏方プログラムが入っています。
- `public/`: 画像などの静的ファイル置き場です。
