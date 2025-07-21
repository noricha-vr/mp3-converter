import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

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
      // Load from CDN with cross-origin
      await ffmpeg.load({
        coreURL: 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.js',
        wasmURL: 'https://unpkg.com/@ffmpeg/core@0.12.10/dist/esm/ffmpeg-core.wasm',
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
    <div className="bg-white p-12 rounded-xl shadow-md w-full">
      <div className="mb-8">
        <input
          type="file"
          id="file-input"
          accept="audio/*,video/*"
          onChange={handleFileSelect}
          disabled={isConverting || isLoading}
          className="hidden"
        />
        <label htmlFor="file-input" className="block p-4 px-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer transition-all duration-300 hover:bg-gray-200 hover:border-gray-400">
          {file ? file.name : 'Choose a file'}
        </label>
      </div>
      
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      
      {(isConverting || progress > 0) && (
        <div className="w-full h-6 bg-gray-100 rounded-full my-4 relative overflow-hidden">
          <div className="h-full bg-green-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-gray-700 text-sm">{progress}%</span>
        </div>
      )}
      
      <button
        className="w-full py-4 px-8 text-lg font-bold text-white bg-blue-500 border-none rounded-lg cursor-pointer transition-colors duration-300 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={handleConvert}
        disabled={!file || isConverting || isLoading}
      >
        {isLoading ? 'Loading FFmpeg...' : isConverting ? 'Converting...' : 'Convert to MP3'}
      </button>
    </div>
  );
}