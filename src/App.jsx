import { useState } from 'react'
import SudokuGame from './games/Sudoku';
import WordSoupGame from './games/Wordsoup';
import TeaMasterGame from './games/TeaMaster';

export default function App() {
  const [stage, setStage] = useState(1);

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Aesthetic Background Figures */}
      <div className="absolute top-10 left-10 text-4xl opacity-30 animate-bounce">🧋</div>
      <div className="absolute top-20 right-12 text-4xl opacity-30 animate-pulse">🍵</div>
      <div className="absolute bottom-10 left-16 text-4xl opacity-30 animate-pulse">☕</div>
      <div className="absolute bottom-16 right-10 text-4xl opacity-30 animate-bounce">✨</div>

      <header className="text-center mb-6 z-10">
        <h1 className="text-4xl font-extrabold text-blush-500 tracking-wide drop-shadow-sm">
          Girly Pop Arcade 🎀
        </h1>
        <p className="text-mocha-800 text-sm mt-1">
          Complete all 3 mini-games to unlock your special video surprise!
        </p>
      </header>

      <main className="w-full max-w-md z-10">
        {stage === 1 && (
          <SudokuGame onComplete={() => setStage(2)} />
        )}
        {stage === 2 && (
          <WordSoupGame onComplete={() => setStage(3)} />
        )}
        {stage === 3 && (
          <TeaMasterGame onComplete={() => setStage(4)} />
        )}

        {stage === 4 && (
          <div className="flex flex-col items-center text-center bg-cream-100 p-6 rounded-3xl shadow-xl border-2 border-blush-300 animate-fade-in">
            <h2 className="text-3xl font-extrabold text-blush-500 mb-2">🎉 You Did It! 🎉</h2>
            <p className="text-mocha-900 font-medium mb-4">
              You beat all 3 games and proved your tea mastery! Enjoy your reward! ☕✨
            </p>
            
            {/* Embedded YouTube Video Container */}
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-md border-2 border-blush-300">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="Reward Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
