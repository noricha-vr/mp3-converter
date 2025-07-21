# MP3 Converter

A simple web application to convert video and audio files to MP3 format using FFmpeg.wasm.

## Features

- ✅ Convert video files to MP3
- ✅ Convert audio files to MP3
- ✅ Progress bar showing conversion status
- ✅ Client-side processing (no server required)
- ✅ Automatic download after conversion

## Tech Stack

- **Framework**: React 19.1.0
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.0.4
- **Package Manager**: Bun
- **Conversion Engine**: FFmpeg.wasm

## Setup

### Prerequisites

- Bun installed on your system

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd otodake3

# Install dependencies
bun install
```

### Development Server

```bash
bun run dev
```

Open http://localhost:5173 in your browser to access the application.

### Build

```bash
bun run build
```

Build artifacts will be generated in the `dist` directory.

### Preview

```bash
bun run preview
```

## Usage

1. Click "Choose a file" to select a video or audio file
2. Click "Convert to MP3" to start the conversion
3. Wait for the conversion to complete (progress bar shows status)
4. The MP3 file will be automatically downloaded when ready

## License

MIT
