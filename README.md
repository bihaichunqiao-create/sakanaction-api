# 🎵 SAKANACTION API

サカナクションの楽曲データを取得できるREST APIです。

Expressで作成したシンプルなAPIで、楽曲一覧・ID検索・曲名検索・アルバム検索ができます。

---

## 使用技術

- Node.js
- Express
- CORS
- JavaScript

---

## ディレクトリ構成

```
.
├── app.js
├── package.json
├── data
│   └── songs.js
├── public
└── README.md
```

---

## セットアップ

リポジトリをクローンします。

```bash
git clone <repository-url>
```

ディレクトリへ移動します。

```bash
cd sakanaction-api
```

依存関係をインストールします。

```bash
npm install
```

サーバーを起動します。

```bash
node app.js
```

起動後

```
http://localhost:3000
```

へアクセスできます。

---

## エンドポイント

### API動作確認

```
GET /
```

レスポンス

```text
サカナクションAPI起動中
```

---

### 全楽曲取得

```
GET /api/songs
```

レスポンス例

```json
[
  {
    "id": 1,
    "title": "新宝島",
    "album": "supabase-URL"
  }
]
```

---

### ID検索

```
GET /api/songs/:id
```

例

```
GET /api/songs/1
```

存在しないIDの場合

```json
{
  "error": "曲が見つかりません"
}
```

---

### 曲名検索

```
GET /api/search?q=新宝島
```

部分一致で検索できます。

---

### アルバム検索

```
GET /api/albums/:album
```

例

```
GET /api/albums/834.194
```

指定したアルバムの楽曲一覧を取得できます。

---

## 主な機能

- 楽曲一覧取得
- IDによる楽曲検索
- 曲名の部分一致検索
- アルバムごとの楽曲取得
- CORS対応
- JSON形式でレスポンスを返却
- エラーハンドリング（404）

---

## 使用例

フロントエンドから取得

```javascript
fetch("http://localhost:3000/api/songs")
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 今後追加したい機能

- アーティスト検索
- ページネーション
- ソート機能
- SwaggerによるAPIドキュメント
- CRUD（追加・更新・削除）機能

---

## ライセンス

本プロジェクトは学習目的で作成しています。