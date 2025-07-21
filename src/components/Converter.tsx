import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
// @ts-ignore
import coreURL from '@ffmpeg/core?url';
// @ts-ignore
import wasmURL from '@ffmpeg/core/wasm?url';

export function Converter() {
  const [file, setFile] = useState<File | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const ffmpegRef = useRef(new FFmpeg());

  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;

    setIsLoading(true);
    setError('');

    try {
      // Load using Vite imported URLs
      await ffmpeg.load({
        coreURL,
        wasmURL,
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
      setError('Failed to load FFmpeg: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['video/', 'audio/'];
      const isValid = validTypes.some(type => selectedFile.type.startsWith(type));
      
      if (!isValid) {
        setError('Please select a valid audio or video file');
        setFile(null);
      } else {
        setError('');
        setFile(selectedFile);
      }
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    
    const ffmpeg = ffmpegRef.current;
    
    if (!ffmpeg.loaded) {
      await loadFFmpeg();
    }

    setIsConverting(true);
    setError('');
    setProgress(0);
    
    try {
      ffmpeg.on('progress', ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      // Write the file to FFmpeg's virtual file system
      await ffmpeg.writeFile('input', await fetchFile(file));
      
      // Convert to MP3
      await ffmpeg.exec(['-i', 'input', '-acodec', 'libmp3lame', '-b:a', '192k', 'output.mp3']);
      
      // Read the output file
      const data = await ffmpeg.readFile('output.mp3');
      
      // Create a download link
      const blob = new Blob([data], { type: 'audio/mp3' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.[^/.]+$/, '') + '.mp3';
      a.click();
      
      // Clean up
      URL.revokeObjectURL(url);
      setProgress(100);
      
    } catch (error) {
      console.error('Conversion error:', error);
      setError('Conversion failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="converter-container">
      <div className="file-input-wrapper">
        <input
          type="file"
          id="file-input"
          accept="audio/*,video/*"
          onChange={handleFileSelect}
          disabled={isConverting || isLoading}
        />
        <label htmlFor="file-input" className="file-input-label">
          {file ? file.name : 'Choose a file'}
        </label>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {(isConverting || progress > 0) && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{progress}%</span>
        </div>
      )}
      
      <button
        className="convert-button"
        onClick={handleConvert}
        disabled={!file || isConverting || isLoading}
      >
        {isLoading ? 'Loading FFmpeg...' : isConverting ? 'Converting...' : 'Convert to MP3'}
      </button>
    </div>
  );
}