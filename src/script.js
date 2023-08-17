import Sudoku from "./sudoku.js";

const Script = () => {
    const PUZZLE_SIZE = 9;
    const SQUARE_SIZE = 3;

    let puzzle = [
    [2, 0, 5, 0, 0, 9, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 3, 0, 7],
    [7, 0, 0, 8, 5, 6, 0, 1, 0],
    [4, 5, 0, 7, 0, 0, 0, 0, 0],
    [0, 0, 9, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 8, 5],
    [0, 2, 0, 4, 1, 8, 0, 0, 6],
    [6, 0, 8, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 2, 0, 0, 7, 0, 8],
    ];

    // returns array of objects containing rows and columns of empty tiles in puzzle
    const getBlanks = (puzzle) => {
    let blanks = [];
    for (let i = 0; i < PUZZLE_SIZE; i++) {
        for (let j = 0; j < PUZZLE_SIZE; j++) {
        if (puzzle[i][j] === 0) {
            blanks.push({ row: i, col: j });
        }
        }
    }
    return blanks;
    };

    // returns whether number can be placed in row and column of puzzle
    const isValidPlacement = (row, col, num, puzzle) => {
    // checks if number is already on same row or column
    for (let i = 0; i < PUZZLE_SIZE; i++) {
        if (puzzle[row][i] === num || puzzle[i][col] === num) {
        return false;
        }
    }

    // checks if number is already in square
    let squareRow = Math.floor(row / 3) * 3;
    let squareCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < SQUARE_SIZE; i++) {
        for (let j = 0; j < SQUARE_SIZE; j++) {
        if (puzzle[squareRow + i][squareCol + j] === num) {
            return false;
        }
        }
    }
    return true;
    };

    // recursively solves tile by tile
    const solveTile = (blankIndex, blankTiles, puzzle) => {
    // check if no tiles left to solve
    if (blankIndex >= blankTiles.length) {
        return true;
    }

    const { row, col } = blankTiles[blankIndex];
    // checks each number for valid placement
    for (let i = 1; i <= PUZZLE_SIZE; i++) {
        if (isValidPlacement(row, col, i, puzzle)) {
        // sets tile to valid number, solves for next tile
        puzzle[row][col] = i;
        if (solveTile(blankIndex + 1, blankTiles, puzzle)) {
            return true;
        }
        }
    }
    // resets tile and backtracks if no valid numbers found
    puzzle[row][col] = 0;
    return false;
    };

    // solves and returns puzzle
    const solve = (puzzle) => {
    const blankTiles = getBlanks(puzzle);
    solveTile(0, blankTiles, puzzle);
    return puzzle;

    };

    return (
      <div className="app">
        <h1>Sudoku Puzzle</h1>
        <Sudoku sudokuData={puzzle} />
      </div>
    );
  };

  export default Script;
  