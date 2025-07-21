# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MP3 Converter is a privacy-focused web application that converts audio and video files to MP3 format using client-side WebAssembly. All processing happens in the browser - files never leave the user's device.

Live deployment: https://mp3.kojin.works

## Key Commands

### Development
```bash
# Start development server (port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Testing
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI interface
npm run test:e2e:ui

# Run E2E tests in headed mode (visible browser)
npm run test:e2e:headed

# Run a single test file
npx playwright test tests/e2e/mp3-converter.spec.js

# Run tests with specific browser
npx playwright test --project=chromium
```

### Utility Scripts
```bash
# Generate OGP image
node scripts/generate-ogp-image.js

# Manual conversion test
node scripts/test-conversion.js
```

## Architecture & Critical Implementation Details

### FFmpeg WebAssembly Integration
The application uses FFmpeg.wasm for media conversion. Key considerations:

1. **CDN Loading**: FFmpeg is loaded from CDN (not bundled) to avoid large build sizes:
   - Core: `https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js`
   - WASM: `https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm`

2. **CORS Headers**: Critical headers required in `vite.config.js`:
   ```javascript
   {
     'Cross-Origin-Embedder-Policy': 'require-corp',
     'Cross-Origin-Opener-Policy': 'same-origin'
   }
   ```
   These headers must be present in both `server` and `preview` configurations.

3. **Module Format**: Uses ESM format (not UMD) for FFmpeg imports to avoid loading errors.

### Component Architecture

**Converter.tsx** - Core conversion logic:
- Manages FFmpeg instance lifecycle
- Handles file validation (audio/video MIME types only)
- Implements progress tracking via FFmpeg event listeners
- Automatic download trigger on conversion completion

**App.tsx** - Layout and privacy messaging:
- Privacy badge component emphasizing local processing
- Responsive layout with Tailwind CSS

### Build & Deployment Configuration

1. **Node.js Version**: 20.19.0 (specified in `.nvmrc`)
   - Required for Vite 7.0.4 compatibility
   - Cloudflare Pages uses this version during builds

2. **Cloudflare Pages Deployment**:
   - Automatic deployment on push to main branch
   - Build command: `npm run build`
   - Output directory: `dist`
   - Required: `package-lock.json` for dependency installation

3. **Vite Configuration**:
   - FFmpeg modules excluded from optimization
   - CORS headers configured for both dev and preview

### Testing Strategy

E2E tests use Playwright and cover:
- UI component visibility and initial state
- File type validation (reject non-media files)
- Successful MP3 conversion flow
- Progress bar functionality
- Error handling scenarios
- Download triggering

Test files location: `tests/e2e/`
Test configuration: `playwright.config.js`

### Common Issues & Solutions

1. **FFmpeg Loading Errors**: 
   - Ensure CORS headers are properly set
   - Verify using ESM format URLs
   - Check browser console for cross-origin errors

2. **Build Failures on Cloudflare**:
   - Ensure `package-lock.json` exists
   - Verify Node.js version matches `.nvmrc`
   - Check for Rollup compatibility issues

3. **Conversion Failures**:
   - FFmpeg must be fully loaded before conversion
   - File must be valid audio/video MIME type
   - Browser must support SharedArrayBuffer

### State Management Flow

1. User selects file → Validate MIME type → Update UI state
2. User clicks convert → Load FFmpeg (if needed) → Start conversion
3. FFmpeg progress events → Update progress bar → Auto-download on completion
4. Error at any stage → Display error message → Reset convertible state