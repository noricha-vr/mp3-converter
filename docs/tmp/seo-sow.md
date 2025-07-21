# MP3 Converter SEO対策 Statement of Work (SOW)

## プロジェクト概要
**プロジェクト名**: MP3 Converter SEO最適化  
**開始日**: 2025年7月21日  
**目的**: MP3 Converterウェブアプリケーションの検索エンジン最適化とソーシャルメディア共有の改善

## 現状分析
### 現在のSEO実装状況
- 基本的なメタタグのみ実装
  - charset: UTF-8
  - viewport設定
  - 簡単なdescription
  - タイトルタグ
- ファビコンは汎用的なViteアイコンを使用
- OGP/Twitter Card未実装
- 構造化データ未実装

## 実装スコープ

### 1. ファビコン作成と実装
**要件**:
- SVG形式でオリジナルファビコンを作成
- MP3変換をイメージしたデザイン（音符 + 変換矢印）
- レスポンシブ対応（異なるサイズでも視認性確保）

**成果物**:
- `public/favicon.svg`
- `public/favicon.ico`（ブラウザ互換性のため）

### 2. OGP画像の作成
**要件**:
- サイズ: 1200x630px（Facebook/Twitter推奨）
- アプリのUIを模したデザイン
- HTMLコンポーネントとして作成し、Playwright MCPでキャプチャ

**成果物**:
- `src/components/OgpImage.tsx`
- `public/og-image.png`

### 3. メタタグの強化
**基本SEOメタタグ**:
```html
<meta name="description" content="無料オンラインMP3変換ツール。動画や音声ファイルを高品質なMP3に変換。インストール不要、ブラウザで動作。">
<meta name="keywords" content="MP3変換,オンライン変換,動画変換,音声変換,無料,ブラウザ">
<meta name="author" content="noricha-vr">
<link rel="canonical" href="https://mp3-converter.example.com/">
```

**OGPメタタグ**:
```html
<meta property="og:title" content="MP3 Converter - 無料オンライン変換ツール">
<meta property="og:description" content="動画や音声ファイルを高品質なMP3に変換。インストール不要。">
<meta property="og:image" content="https://mp3-converter.example.com/og-image.png">
<meta property="og:type" content="website">
<meta property="og:url" content="https://mp3-converter.example.com/">
```

**Twitter Cardメタタグ**:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="MP3 Converter - 無料オンライン変換ツール">
<meta name="twitter:description" content="動画や音声ファイルを高品質なMP3に変換">
<meta name="twitter:image" content="https://mp3-converter.example.com/og-image.png">
```

### 4. 構造化データ実装
**JSON-LD WebApplicationスキーマ**:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "MP3 Converter",
  "description": "オンラインMP3変換ツール",
  "applicationCategory": "MultimediaApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0"
  }
}
```

### 5. 追加のSEO要素
**robots.txt**:
```
User-agent: *
Allow: /
Sitemap: https://mp3-converter.example.com/sitemap.xml
```

**sitemap.xml**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mp3-converter.example.com/</loc>
    <lastmod>2025-07-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 実装手順

1. **ファビコン作成** (30分)
   - SVGファビコンのデザインと作成
   - ICO形式への変換
   - HTMLでの参照更新

2. **OGP画像作成** (1時間)
   - Reactコンポーネント作成
   - スタイリング
   - Playwrightでのキャプチャ実行

3. **メタタグ実装** (30分)
   - index.htmlへのメタタグ追加
   - URLの適切な設定

4. **構造化データ追加** (15分)
   - JSON-LDスクリプトの追加

5. **その他SEOファイル** (15分)
   - robots.txt作成
   - sitemap.xml作成

## 期待される成果

1. **検索エンジンでの視認性向上**
   - より詳細な説明文による検索結果の改善
   - 適切なキーワードによる検索順位向上

2. **ソーシャルメディア共有の改善**
   - 魅力的なOGP画像による共有率向上
   - 正確な情報表示による信頼性向上

3. **ユーザーエクスペリエンスの向上**
   - カスタムファビコンによるブランド認知
   - 構造化データによる検索結果の充実

## 注意事項
- URLは実際のデプロイ先に合わせて更新が必要
- OGP画像のURLは絶対パスで指定する必要がある
- Cross-Origin設定に注意（FFmpeg.wasmとの互換性）