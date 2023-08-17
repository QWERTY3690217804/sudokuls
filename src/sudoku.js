import { useState } from 'react'; 
import solve from './solver.js';
import './sudoku.css';

const Sudoku = () => {
  const [difficulty, setDifficulty] = useState("easy");
  let emptyPuzzle = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '']
  ];
  const [puzzle, setPuzzle] = useState(emptyPuzzle);

  const handleInputChange = (e, rowIndex, columnIndex) => {
    const { value } = e.target;
    const newPuzzle = [...puzzle];
    newPuzzle[rowIndex][columnIndex] = value;
    setPuzzle(newPuzzle);
  }

  const solvePuzzle = () => {
    const solvedPuzzle = solve([...puzzle]);
    if (solvedPuzzle) {
      setPuzzle(solvedPuzzle);
    }
  }

  const generatePuzzle = () => {
    const PUZZLE_SIZE = 9;

    const seedPuzzle = Array.from({ length: PUZZLE_SIZE }, () =>
    Array.from({ length: PUZZLE_SIZE }, () => '')
    );

  fillRandom(seedPuzzle);

  const newPuzzle = Array.from({ length: PUZZLE_SIZE }, (_, rowIndex) =>
    [...seedPuzzle[rowIndex]]
  );

    const solvedPuzzle = solve(newPuzzle);

    let minClues = 0;
    let maxClues = 0;
  
    if (difficulty === "hard") {
      minClues = 37;
      maxClues = 81;
    } else if (difficulty === "medium") {
      minClues = 27;
      maxClues = 36;
    } else if (difficulty === "easy") {
      minClues = 19;
      maxClues = 26;
    }
    
    const filledIndexes = Array.from(
      { length: PUZZLE_SIZE * PUZZLE_SIZE },
      (_, index) => index
    );
  
    for (let i = filledIndexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filledIndexes[i], filledIndexes[j]] = [
        filledIndexes[j],
        filledIndexes[i],
      ];
    }
  
    for (const index of filledIndexes) {
      const row = Math.floor(index / PUZZLE_SIZE);
      const col = index % PUZZLE_SIZE;
  
      newPuzzle[row][col] = solvedPuzzle[row][col];
    }

    const cellsToRemove = Math.floor(Math.random() * (maxClues - minClues + 1) + minClues); 
    let removedCount = 0;
  
    while (removedCount < cellsToRemove) {
      const row = Math.floor(Math.random() * PUZZLE_SIZE);
      const col = Math.floor(Math.random() * PUZZLE_SIZE);
  
      if (solvedPuzzle[row][col] !== '') {
        const backup = solvedPuzzle[row][col];
        solvedPuzzle[row][col] = '';
        
        const copy = JSON.parse(JSON.stringify(solvedPuzzle));
        if (solve(copy)) {
          removedCount++;
        } else {
          solvedPuzzle[row][col] = backup; 
        }
      }
    }
  
    setPuzzle(solvedPuzzle);
  };

  const fillRandom = (puzzle) => {
    const PUZZLE_SIZE = puzzle.length;
    const digits = Array.from({ length: PUZZLE_SIZE }, (_, index) => (index + 1).toString());
  
    const fillCell = (row, col) => {
      if (row === PUZZLE_SIZE) {
        return true;
      }
      
      const nextRow = col === PUZZLE_SIZE - 1 ? row + 1 : row;
      const nextCol = (col + 1) % PUZZLE_SIZE;
  
      shuffleArray(digits);
  
      for (const digit of digits) {
        if (isValid(puzzle, row, col, digit)) {
          puzzle[row][col] = digit;
          if (fillCell(nextRow, nextCol)) {
            return true;
          }
          puzzle[row][col] = '';
        }
      }
      return false;
    };
  
    fillCell(0, 0);
  };
  
  const isValid = (puzzle, row, col, digit) => {
    for (let i = 0; i < puzzle.length; i++) {
      if (puzzle[row][i] === digit || puzzle[i][col] === digit) {
        return false;
      }
    }
  
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (puzzle[i][j] === digit) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  
  return (
    <>
    <table className="sudoku-table">
      <tbody>
        {puzzle.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cellValue, columnIndex) => (
              <td key={columnIndex}>
                <input 
                  type="text" 
                  maxLength="1"
                  value={cellValue}
                  className="numinput"
                  onChange = {e => handleInputChange(e, rowIndex, columnIndex)} >
                </input>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <table>
      <button onClick={() => setDifficulty("easy")}>Easy</button>
      <button onClick={() => setDifficulty("medium")}>Medium</button>
      <button onClick={() => setDifficulty("hard")}>Hard</button>
      <button onClick={generatePuzzle}>Generate Puzzle</button>
      <button onClick={solvePuzzle}>meow</button>
      <p>{difficulty}</p>
    </table>
  </>
  );
};

export default Sudoku;