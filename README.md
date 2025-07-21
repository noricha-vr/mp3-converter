# MP3 Converter

A simple, privacy-focused web application that converts audio and video files to MP3 format. All processing happens locally in your browser using WebAssembly - your files never leave your device.

🔗 **Live Demo**: [mp3.kojin.works](https://mp3.kojin.works)

## Features

- 🎵 Convert any audio or video file to MP3
- 🔒 100% client-side processing (no server uploads)
- 🚀 Fast conversion using FFmpeg WebAssembly
- 📱 Works on all modern browsers
- 🎨 Clean, responsive UI with Tailwind CSS
- ⚡ Built with React and Vite
- ✅ Comprehensive E2E test coverage

## Technology Stack

- **Frontend**: React 19.1.0 + TypeScript 5.8.3
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 3.4
- **Media Processing**: FFmpeg.wasm 0.12.15
- **Testing**: Playwright
- **Package Manager**: Bun / npm
- **Deployment**: Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js 20.19.0 or higher
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/noricha-vr/mp3-converter
cd mp3-converter

# Install dependencies (using npm)
npm install

# Or using bun
bun install
```

### Development Server

```bash
npm run dev
# Or
bun run dev
```

Open http://localhost:5173 in your browser to access the application.

### Build for Production

```bash
npm run build
# Or
bun run build
```

Build artifacts will be generated in the `dist` directory.

### Preview Production Build

```bash
npm run preview
# Or
bun run preview
```

## Testing

### E2E Tests

The project includes comprehensive end-to-end tests using Playwright.

```bash
# Run tests
npm run test:e2e

# Run tests with UI
npm run test:e2e:ui

# Run tests in headed mode (visible browser)
npm run test:e2e:headed
```

### Test Coverage

The E2E tests cover:
- Initial UI display and accessibility
- File upload validation
- Invalid file type handling
- Successful MP3 conversion
- Progress bar display
- UI state management during conversion
- Download functionality
- Error handling

## Usage

1. Click "Choose a file" to select a video or audio file
2. Click "Convert to MP3" to start the conversion
3. Wait for the conversion to complete (progress bar shows status)
4. The MP3 file will be automatically downloaded when ready

## Development

### Project Structure

```
mp3-converter/
├── src/
│   ├── components/
│   │   ├── Converter.tsx    # Main converter component
│   │   └── OgpImage.tsx     # OGP image component
│   ├── App.tsx              # Main app component
│   └── index.css            # Global styles with Tailwind
├── tests/
│   └── e2e/                 # E2E test files
├── scripts/
│   ├── generate-ogp-image.js # OGP image generation
│   └── test-conversion.js    # Manual conversion test
└── public/
    ├── favicon.svg          # Site favicon
    ├── og-image.png         # OGP image
    └── sitemap.xml          # SEO sitemap
```

### Key Components

- **Converter.tsx**: Handles file selection, FFmpeg loading, and conversion logic
- **App.tsx**: Main layout with privacy badge and responsive design

### FFmpeg Configuration

The app loads FFmpeg from CDN to avoid bundling large WASM files:
- Core: `https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js`
- WASM: `https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm`

### CORS Headers

Required headers for FFmpeg.wasm (configured in vite.config.js):
```javascript
{
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin'
}
```

## Deployment

The app is configured for deployment on Cloudflare Pages:

1. Push to GitHub main branch
2. Cloudflare Pages automatically builds and deploys

### Build Configuration

- Node version: 20.19.0 (specified in `.nvmrc`)
- Build command: `npm run build`
- Output directory: `dist`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
