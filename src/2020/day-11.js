const fs = require('fs').promises;
const path = require('path');
const isEqual = require('lodash/isEqual');

const SeatStatus = Object.freeze({
  Empty: 'L',
  Occupied: '#',
  Floor: '.',
});

async function readSeatLayout() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-11.txt'),
    'utf8'
  );

  return input
    .trim()
    .split('\n')
    .map((row) => row.split(''));
}

async function partOne() {
  function applySeatingRule(layout, row, column) {
    function getNeighbors(layout, row, column) {
      return [row - 1, row, row + 1]
        .filter((r) => r >= 0 && r < layout.length)
        .map((r) => {
          return [column - 1, column, column + 1]
            .filter(
              (c) =>
                c >= 0 && c < layout[r].length && !(r === row && c === column)
            )
            .map((c) => layout[r][c]);
        })
        .flat();
    }

    function emptySeatRule(layout, row, column) {
      const neighbors = getNeighbors(layout, row, column);
      if (neighbors.every((n) => n !== SeatStatus.Occupied)) {
        return SeatStatus.Occupied;
      }
      return layout[row][column];
    }

    function occupiedSeatRule(layout, row, column) {
      const neighbors = getNeighbors(layout, row, column);
      if (neighbors.filter((n) => n === SeatStatus.Occupied).length >= 4) {
        return SeatStatus.Empty;
      }
      return layout[row][column];
    }

    const seat = layout[row][column];

    switch (seat) {
      case SeatStatus.Empty:
        return emptySeatRule(layout, row, column);
      case SeatStatus.Occupied:
        return occupiedSeatRule(layout, row, column);
      default:
        return seat;
    }
  }

  let layout = await readSeatLayout();

  while (true) {
    const previousLayout = [...layout];
    layout = layout.map((row, r) =>
      row.map((_, c) => applySeatingRule(layout, r, c))
    );
    if (isEqual(layout, previousLayout)) {
      break;
    }
  }

  return layout.flat().filter((seat) => seat === SeatStatus.Occupied).length;
}

async function partTwo() {}

module.exports = { partOne, partTwo };
