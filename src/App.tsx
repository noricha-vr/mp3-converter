import { Converter } from './components/Converter';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>MP3 Converter</h1>
        <p>Convert video and audio files to MP3</p>
      </header>
      
      <main className="app-main">
        <Converter />
      </main>
    </div>
  );
}

export default App;