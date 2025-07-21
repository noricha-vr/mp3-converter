import { Converter } from './components/Converter';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full p-8 bg-gray-800 text-white text-center">
        <h1 className="m-0 text-4xl">MP3 Converter</h1>
        <p className="mt-2 opacity-80">Convert video and audio files to MP3</p>
        <div className="mt-6 p-4 px-6 bg-white/10 border border-white/20 rounded-lg max-w-xl mx-auto backdrop-blur-md">
          <div className="flex items-start gap-4">
            <span className="text-2xl block flex-shrink-0 mt-1">🔒</span>
            <div className="flex-1">
              <span className="block font-semibold text-base text-white/95 mb-1">100% ローカル処理</span>
              <p className="m-0 text-sm leading-relaxed text-white/80">
                WebAssemblyを使用して、すべての処理がお使いのブラウザ内で完結します。
                ファイルがサーバーにアップロードされることはありません。
              </p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-8 w-full max-w-xl">
        <Converter />
      </main>
    </div>
  );
}

export default App;