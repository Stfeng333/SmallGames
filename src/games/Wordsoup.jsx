import { useState } from 'react';

const WORD_POOL = ['BOBA', 'LATTE', 'MATCHA', 'TAPIOCA', 'CREAM', 'COFFEE', 'MOCHA', 'SUGAR', 'MILK', 'SWEET', 'ICE', 'STRAW'];
const GRID_SIZE = 8;

function generateWordSoup() {
  const selectedWords = [...WORD_POOL].sort(() => Math.random() - 0.5).slice(0, 4);
  const grid = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(''));

  selectedWords.forEach(word => {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      attempts++;
      const direction = Math.random() > 0.5 ? 'H' : 'V';
      const row = Math.floor(Math.random() * (direction === 'V' ? GRID_SIZE - word.length : GRID_SIZE));
      const col = Math.floor(Math.random() * (direction === 'H' ? GRID_SIZE - word.length : GRID_SIZE));

      let canPlace = true;
      for (let i = 0; i < word.length; i++) {
        const r = direction === 'V' ? row + i : row;
        const c = direction === 'H' ? col + i : col;
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
          canPlace = false;
          break;
        }
      }

      if (canPlace) {
        for (let i = 0; i < word.length; i++) {
          const r = direction === 'V' ? row + i : row;
          const c = direction === 'H' ? col + i : col;
          grid[r][c] = word[i];
        }
        placed = true;
      }
    }
  });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === '') {
        grid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }

  return { grid, targetWords: selectedWords };
}

export default function WordSoupGame({ onComplete }) {
  // Lazy initialization avoids useEffect setState triggers
  const [{ grid: gridData, targetWords }] = useState(() => generateWordSoup());
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);

  const toggleCell = (r, c) => {
    const key = `${r}-${c}`;
    const newSelected = selectedCells.includes(key)
      ? selectedCells.filter(cell => cell !== key)
      : [...selectedCells, key];

    setSelectedCells(newSelected);

    const word = newSelected
      .map(k => {
        const [row, col] = k.split('-').map(Number);
        return gridData[row][col];
      })
      .join('');

    if (targetWords.includes(word) && !foundWords.includes(word)) {
      const updatedFound = [...foundWords, word];
      setFoundWords(updatedFound);
      setSelectedCells([]);

      if (updatedFound.length === targetWords.length) {
        setTimeout(onComplete, 500);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-cream-100 p-6 rounded-3xl shadow-lg border-2 border-blush-300 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-mocha-900 mb-2">🧋 Level 2: Boba Word Soup</h2>
      <p className="text-sm text-mocha-800 mb-4">Find all café items: {targetWords.join(', ')}</p>

      <div className="grid grid-cols-8 gap-2 bg-cream-200 p-4 rounded-2xl border border-blush-300">
        {gridData.map((row, r) =>
          row.map((char, c) => {
            const key = `${r}-${c}`;
            const isSelected = selectedCells.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleCell(r, c)}
                className={`w-9 h-9 font-bold rounded-lg transition-all ${
                  isSelected ? 'bg-blush-500 text-white scale-105' : 'bg-white text-mocha-900 hover:bg-blush-100'
                }`}
              >
                {char}
              </button>
            );
          })
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {targetWords.map(w => (
          <span
            key={w}
            className={`px-3 py-1 text-xs font-bold rounded-full ${
              foundWords.includes(w) ? 'bg-green-400 text-white line-through' : 'bg-cream-200 text-mocha-800'
            }`}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}