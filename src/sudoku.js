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

    const newPuzzle = Array.from({ length: PUZZLE_SIZE }, () =>
      Array.from({ length: PUZZLE_SIZE }, () => '')
    );
  
    // Generate a complete puzzle (e.g., by solving an empty puzzle)
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
    // Remove cells to create the initial puzzle
    const cellsToRemove = Math.floor(Math.random() * (maxClues - minClues + 1) + minClues); 
    let removedCount = 0;
  
    while (removedCount < cellsToRemove) {
      const row = Math.floor(Math.random() * PUZZLE_SIZE);
      const col = Math.floor(Math.random() * PUZZLE_SIZE);
  
      if (solvedPuzzle[row][col] !== '') {
        const backup = solvedPuzzle[row][col];
        solvedPuzzle[row][col] = '';
        
        // Check if the puzzle still has a unique solution
        const copy = JSON.parse(JSON.stringify(solvedPuzzle));
        if (solve(copy)) {
          removedCount++;
        } else {
          solvedPuzzle[row][col] = backup; // Restore the removed value
        }
      }
    }
  
    setPuzzle(solvedPuzzle);
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