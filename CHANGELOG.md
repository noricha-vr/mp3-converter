# Changelog

## [Unreleased]

### Fixed
- Fixed Cloudflare Pages build error due to missing dependencies
  - Created wrangler.toml configuration file (later removed)
  - Generated package-lock.json to ensure Cloudflare Pages runs npm install automatically
  - Added .nvmrc file to specify Node.js 20.19.0 (required by Vite 7.0.5)
  - Added .npmrc to handle optional dependencies issues with Rollup
- Regenerated OGP image with improved design
  - Created ogp-preview.html for OGP image preview
  - Added Playwright script for automated OGP image generation

### Added
- Added WebAssembly-powered local processing indicator on homepage
  - 🔒 100% Local Processing badge
  - Privacy protection message explaining that files are never uploaded to servers
- Introduced TailwindCSS and converted all styles to utility classes
  - Removed App.css and implemented all styles with Tailwind utilities
  - Converted Converter.tsx styles to Tailwind classes
  - Minimized CSS file usage (only index.css with Tailwind directives)

### Changed
- Unified project language to English
  - Converted all UI text to English
  - Updated HTML meta tags and structured data to English
  - Translated OGP image content to English

### Fixed
- Fixed Cloudflare Pages deployment 25MB file size limit error
  - Loading FFmpeg WASM file (~32MB) from CDN
  - Excluded large WASM files from build output

### Changed
- Renamed project from `otodake3` to `mp3-converter`
- Updated repository URL in README.md
- Updated domain to `mp3.kojin.works`
  - Updated meta tags (canonical, OGP, Twitter Card) URLs in index.html
  - Updated sitemap.xml URLs

### Added
- Implemented SEO optimization
  - Created custom SVG favicon (music note and conversion arrow design)
  - Generated OGP image (1200x630px, captured from HTML component using Playwright)
  - Added comprehensive meta tags (SEO, OGP, Twitter Card)
  - Implemented structured data (JSON-LD)
  - Created robots.txt and sitemap.xml
- Created SEO SOW document (`docs/tmp/seo-sow.md`)

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