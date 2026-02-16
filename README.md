# TODOアプリ（練習用）

ブラウザだけで使える、シンプルな日本語TODOアプリです。

## できること

- タスク追加
- 完了チェック
- タスク削除
- ローカル保存（`localStorage`）

## 使い方

1. `index.html` をブラウザで開く
2. 入力欄にタスクを書いて **追加**
3. チェックで完了、**削除**ボタンで削除
4. ページを閉じても、同じブラウザならデータが残ります

## GitHubに保存する手順（初心者向け）

### 1) GitHubで新規リポジトリを作る

- GitHubにログイン
- 右上の `+` → **New repository**
- Repository name を入力（例: `todo-app`）
- **Create repository** を押す

### 2) ローカルから最初のpushをする

以下をターミナルで実行します（`YOUR_NAME`部分は自分のGitHub名に変更）。

```bash
git init
git add .
git commit -m "はじめてのTODOアプリを作成"
git branch -M main
git remote add origin https://github.com/YOUR_NAME/todo-app.git
git push -u origin main
```

> すでにこのフォルダがGit管理されている場合は、`git init` と `git branch -M main` は不要なことがあります。

### 3) 更新したとき

```bash
git add .
git commit -m "変更内容をひとこと"
git push
```

## ファイル構成

- `index.html` : 画面
- `style.css` : 見た目
- `script.js` : TODOの動作とローカル保存
