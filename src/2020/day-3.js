const fs = require('fs').promises;
const path = require('path');

async function readGrid() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-3.txt'),
    'utf8'
  );

  return input
    .trim()
    .split('\n')
    .map((line) => line.split(''));
}

function numberOfTrees(grid, xSlope, ySlope) {
  const gridLength = grid[0].length;
  const gridHeight = grid.length;

  function goDown(x, y) {
    return [(x + xSlope) % gridLength, y + ySlope];
  }

  const tree = '#';
  let treeCount = 0;
  let [x, y] = [xSlope, ySlope];

  while (y < gridHeight) {
    if (grid[y][x] === tree) {
      treeCount += 1;
    }
    [x, y] = goDown(x, y);
  }
  return treeCount;
}

async function partOne() {
  const grid = await readGrid();
  return numberOfTrees(grid, 3, 1);
}

async function partTwo() {
  const grid = await readGrid();

  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  return slopes
    .map(([xSlope, ySlope]) => numberOfTrees(grid, xSlope, ySlope))
    .reduce((a, b) => a * b);
}

module.exports = { partOne, partTwo };
