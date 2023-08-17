const PUZZLE_SIZE = 9;
const SQUARE_SIZE = 3;

let puzzle = [
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
const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

// returns array of objects containing rows and columns of empty tiles in puzzle
const getBlanks = (puzzle) => {
let blanks = [];
for (let i = 0; i < PUZZLE_SIZE; i++) {
    for (let j = 0; j < PUZZLE_SIZE; j++) {
        if (puzzle[i][j] === '') {
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
    for (let i = 0; i < PUZZLE_SIZE; i++) {
        if (isValidPlacement(row, col, digits[i], puzzle)) {
        // sets tile to valid number, solves for next tile
        puzzle[row][col] = digits[i];
        if (solveTile(blankIndex + 1, blankTiles, puzzle)) {
            return true;
        }
        }
    }
    // resets tile and backtracks if no valid numbers found
    puzzle[row][col] = '';
    return false;
};

// solves and returns puzzle
const solve = (puzzle) => {
    const blankTiles = getBlanks(puzzle);
    solveTile(0, blankTiles, puzzle);
    return puzzle;
};

export default solve;