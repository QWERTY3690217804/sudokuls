import { useState } from 'react'; 
import solve from './solver.js';
import './sudoku.css';

const Sudoku = () => {
  let emptyPuzzle = [
    ['2', '', '5', '', '', '9', '', '', '4'],
    ['', '', '', '', '', '', '3', '', '7'],
    ['7', '', '', '8', '5', '6', '', '1', ''],
    ['4', '5', '', '7', '', '', '', '', ''],
    ['', '', '9', '', '', '', '1', '', ''],
    ['', '', '', '', '', '2', '', '8', '5'],
    ['', '2', '', '4', '1', '8', '', '', '6'],
    ['6', '', '8', '', '', '', '', '', ''],
    ['1', '', '', '2', '', '', '7', '', '8'],
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
    setPuzzle(solvedPuzzle);
  }
  
  return (
    <>
    <table className="sudoku-table">
      <tbody>
        {puzzle.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cellValue, columnIndex) => (
              <td>
                <input 
                  key={columnIndex} 
                  type="text" 
                  maxlength="1"
                  value={cellValue}
                  onChange = {e => handleInputChange(e, rowIndex, columnIndex)} >
                </input>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <button onClick={solvePuzzle}>meow</button>
    </>
  );
};

export default Sudoku;