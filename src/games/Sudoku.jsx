import { useState } from 'react';

function isValid(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + (i % 3);
    if (board[boxRow][boxCol] === num) return false;
  }
  return true;
}

function solveSudoku(board) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === 0) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
        for (let num of nums) {
          if (isValid(board, r, c, num)) {
            board[r][c] = num;
            if (solveSudoku(board)) return true;
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateSudoku() {
  const fullBoard = Array.from({ length: 9 }, () => Array(9).fill(0));
  solveSudoku(fullBoard);
  const solution = fullBoard.map(row => [...row]);

  const puzzle = fullBoard.map(row => [...row]);
  let removed = 0;
  while (removed < 40) {
    const r = Math.floor(Math.random() * 9);
    const c = Math.floor(Math.random() * 9);
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0;
      removed++;
    }
  }
  return { puzzle, solution };
}

export default function SudokuGame({ onComplete }) {
  // Lazy initialization prevents cascading renders
  const [{ puzzle: initialBoard, solution }] = useState(() => generateSudoku());
  const [grid, setGrid] = useState(() => initialBoard.map(row => [...row]));
  const [error, setError] = useState(false);

  const handleChange = (r, c, val) => {
    if (initialBoard[r][c] !== 0) return;
    const num = parseInt(val, 10);
    const newGrid = grid.map(row => [...row]);
    newGrid[r][c] = isNaN(num) ? 0 : Math.min(9, Math.max(1, num));
    setGrid(newGrid);
    setError(false);
  };

  const handleCheck = () => {
    const isCorrect = grid.every((row, r) =>
      row.every((val, c) => val === solution[r][c])
    );
    if (isCorrect) {
      onComplete();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center bg-cream-100 p-6 rounded-3xl shadow-lg border-2 border-blush-300 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-mocha-900 mb-2">🧩 Level 1: Sudoku</h2>
      <p className="text-sm text-mocha-800 mb-4">Fill in numbers 1-9 to finish your random daily coffee puzzle!</p>

      <div className="grid grid-cols-9 gap-1 bg-mocha-800 p-2 rounded-xl">
        {grid.map((row, r) =>
          row.map((val, c) => (
            <input
              key={`${r}-${c}`}
              type="text"
              maxLength={1}
              value={val === 0 ? '' : val}
              readOnly={initialBoard[r][c] !== 0}
              onChange={(e) => handleChange(r, c, e.target.value)}
              className={`w-8 h-8 md:w-10 md:h-10 text-center font-bold text-lg rounded ${
                initialBoard[r][c] !== 0
                  ? 'bg-cream-200 text-mocha-900'
                  : 'bg-white text-blush-500 focus:bg-blush-100 outline-none'
              } ${(r % 3 === 2 && r !== 8) ? 'mb-1' : ''} ${(c % 3 === 2 && c !== 8) ? 'mr-1' : ''}`}
            />
          ))
        )}
      </div>

      {error && <p className="text-red-500 font-semibold mt-3 text-sm">Some numbers are incorrect or missing. Try again!</p>}

      <button
        onClick={handleCheck}
        className="mt-6 px-6 py-2 bg-blush-500 text-white rounded-full font-bold shadow-md hover:bg-blush-300 hover:text-mocha-900 transition-all cursor-pointer"
      >
        Submit Sudoku ✨
      </button>
    </div>
  );
}