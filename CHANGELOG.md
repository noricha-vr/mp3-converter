# Changelog

## [Unreleased]

### Added
- トップページにWebAssemblyを使用した完全ローカル処理の表記を追加
  - 🔒 100% ローカル処理のバッジを表示
  - プライバシー保護の説明文を追加（ファイルがサーバーにアップロードされないことを明記）
- TailwindCSSを導入し、すべてのスタイルをTailwindクラスに変換
  - App.cssを削除し、すべてのスタイルをTailwindユーティリティクラスで実装
  - Converter.tsxのスタイルもTailwindクラスに変換
  - CSSファイルの使用を最小限に（index.cssのTailwindディレクティブのみ）

### Fixed
- Cloudflare Pages デプロイ時の25MBファイルサイズ制限エラーを修正
  - FFmpeg WASMファイル（約32MB）をCDNから読み込むように変更
  - ビルド結果から大きなWASMファイルを除外

### Changed
- プロジェクト名を `otodake3` から `mp3-converter` に変更
- README.md のリポジトリURLを更新
- ドメインを `mp3.kojin.works` に更新
  - index.html のメタタグ（canonical、OGP、Twitter Card）のURLを更新
  - sitemap.xml のURLを更新

### Added
- SEO対策を実装
  - カスタムSVGファビコンを作成（音符と変換矢印のデザイン）
  - OGP画像を生成（1200x630px、HTMLコンポーネントからPlaywrightでキャプチャ）
  - 包括的なメタタグを追加（SEO、OGP、Twitter Card）
  - 構造化データ（JSON-LD）を実装
  - robots.txt と sitemap.xml を作成
- SEO対策のSOWドキュメントを作成（`docs/tmp/seo-sow.md`）

## [2.0.2] - 2025-07-21

### Changed
- Cleaned up project structure by removing unnecessary files and directories
- Removed empty directories: `src/contexts/`, `src/hooks/`, `src/types/`
- Removed unused assets: `src/assets/react.svg`, `public/vite.svg`
- Removed test video directory: `videos/`
- Removed temporary documentation: `docs/tmp/`, `docs/plan.md`
- Optimized project to focus solely on MP3 conversion functionality

### Technical
- All dependencies in package.json are actively used (React, FFmpeg.wasm, TypeScript, Vite, ESLint)
- CSS files are properly organized with minimal duplication

## [2.0.1] - 2025-07-19

### Fixed
- Fixed FFmpeg.wasm loading issue with Vite by using proper import mechanism
- Used Vite's `?url` imports for FFmpeg core files instead of Blob URLs
- Added @ffmpeg/core dependency for proper file loading
- Fixed CORS and cross-origin isolation issues

### Technical Details
- Imports FFmpeg core and WASM files using Vite's URL import syntax
- Maintains Cross-Origin-Embedder-Policy and Cross-Origin-Opener-Policy headers
- Successfully converts both audio and video files to MP3

## [2.0.0] - 2025-07-19

### Breaking Changes
- Complete rewrite: Changed from task management app to MP3 converter
- Removed all task management features
- Removed theme toggle and PWA functionality
- Simplified architecture for single purpose

### Added
- MP3 conversion functionality using FFmpeg.wasm
- Support for video to MP3 conversion
- Support for audio to MP3 conversion
- Real-time conversion progress bar
- Automatic download after conversion
- Client-side processing (no server required)

### Removed
- Task management components
- Category and tag filtering
- Search functionality
- Statistics dashboard
- Export/Import features
- Dark mode
- PWA/Service Worker
- Local storage persistence

### Tech Stack
- React 19.1.0
- TypeScript 5.8.3
- Vite 7.0.4
- FFmpeg.wasm 0.12.15
- Bun package manager