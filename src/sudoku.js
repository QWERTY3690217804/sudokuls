import { useState } from 'react'; 
import solve from './solver.js';
import './sudoku.css';

const Sudoku = () => {
  // let emptyPuzzle = [
  //   ['2', '', '5', '', '', '9', '', '', '4'],
  //   ['', '', '', '', '', '', '3', '', '7'],
  //   ['7', '', '', '8', '5', '6', '', '1', ''],
  //   ['4', '5', '', '7', '', '', '', '', ''],
  //   ['', '', '9', '', '', '', '1', '', ''],
  //   ['', '', '', '', '', '2', '', '8', '5'],
  //   ['', '2', '', '4', '1', '8', '', '', '6'],
  //   ['6', '', '8', '', '', '', '', '', ''],
  //   ['1', '', '', '2', '', '', '7', '', '8'],
  // ];
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
    const SQUARE_SIZE = 3;
    const newPuzzle = Array.from({ length: PUZZLE_SIZE }, () =>
      Array.from({ length: PUZZLE_SIZE }, () => '')
    );
  
    // Generate a complete puzzle (e.g., by solving an empty puzzle)
    const solvedPuzzle = solve(newPuzzle);
  
    // Remove cells to create the initial puzzle
    const cellsToRemove = Math.floor(Math.random() * (PUZZLE_SIZE * PUZZLE_SIZE - 17)) + 17; // Ensure a minimum of 17 clues for solvability
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
      <button onClick={generatePuzzle}>Generate Puzzle</button>
      <button onClick={solvePuzzle}>meow</button>
    </table>
  </>
  );
};

export default Sudoku;