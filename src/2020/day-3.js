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

async function partOne() {
  const grid = await readGrid();
  const gridLength = grid[0].length;
  const gridHeight = grid.length;

  function goDown(x, y) {
    return [(x + 3) % gridLength, y + 1];
  }

  const tree = '#';
  let treeCount = 0;
  let [x, y] = [3, 1];
  while (y < gridHeight) {
    if (grid[y][x] === tree) {
      treeCount += 1;
    }
    [x, y] = goDown(x, y);
  }
  return treeCount;
}

module.exports = { partOne };
