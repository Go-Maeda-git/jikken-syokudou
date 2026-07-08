# 実験用食堂投票システム

次の技術を使用している粗儿の投票システムです。

## 機能

- メニュー投票
- 投票結果のリアルタイム表示
- ランダムメニュー提案
- ドーバルコクそストレージ

## 適用技術

- **Frontend**: HTML, CSS, JavaScript
- **Database**: Firebase Firestore
- **Hosting**: Vercel

## セットアップ手順

1. [Firebaseプロジェクトを作成](#firebaseproj)
2. [Vercelにデプロイ](#vercel-deploy)

### <a id="firebaseproj">Firebaseプロジェクトを作成</a>

1. https://console.firebase.google.com にアクセス
2. 新しいプロジェクトを作成
3. Firestore Databaseを有効化
4. Webアプリを追加し、SDK設定をコピー
5. `config.js`に設定を貼り付け

### <a id="vercel-deploy">Vercelにデプロイ</a>

1. Vercel CLIをインストール
2. `vercel`コマンドを実行

またはGitHub経由でVercelと連携して自動デプロイを設定できます。
