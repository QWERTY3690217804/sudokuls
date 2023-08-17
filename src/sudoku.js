import React from 'react';
import './sudoku.css';

const Sudoku = ({ sudokuData }) => {
  return (
    <table className="sudoku-table">
      <tbody>
        {sudokuData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cellValue, columnIndex) => (
              <td key={columnIndex}>{cellValue}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Sudoku;