const fs = require('fs').promises;
const path = require('path');
const range = require('lodash/range');

async function readBoadingPasses() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-5.txt'),
    'utf8'
  );

  return input.trim().split('\n');
}

function getSeatId(boardingPass) {
  function getRow(boardingPass) {
    let rows = range(128);
    const boardingPassRowCodes = boardingPass.slice(0, 7).split('');
    for (const code of boardingPassRowCodes) {
      const mid = Math.floor(rows.length / 2);
      if (code === 'F') {
        rows = rows.slice(0, mid);
      } else if (code === 'B') {
        rows = rows.slice(mid);
      } else {
        throw new Error(
          `Invalid row code ${code} in boarding pass ${boardingPass}`
        );
      }
    }
    return rows[0];
  }

  function getColumn(boardingPass) {
    let columns = range(8);
    const boardingPassColumnCodes = boardingPass.slice(-3).split('');
    for (const code of boardingPassColumnCodes) {
      const mid = Math.floor(columns.length / 2);
      if (code === 'L') {
        columns = columns.slice(0, mid);
      } else if (code === 'R') {
        columns = columns.slice(mid);
      } else {
        throw new Error(
          `Invalid column code ${code} in boarding pass ${boardingPass}`
        );
      }
    }
    return columns[0];
  }

  return getRow(boardingPass) * 8 + getColumn(boardingPass);
}

async function partOne() {
  const boardingPasses = await readBoadingPasses();
  return boardingPasses
    .map((boardingPass) => getSeatId(boardingPass))
    .reduce((a, b) => Math.max(a, b));
}

async function partTwo() {
  const boardingPasses = await readBoadingPasses();
  const seatIds = boardingPasses.map((boardingPass) => getSeatId(boardingPass));
  seatIds.sort((a, b) => a - b);
  let boardingPass = seatIds[0];
  for (const nextBoardingPass of seatIds.slice(1)) {
    if (nextBoardingPass - boardingPass === 1) {
      boardingPass = nextBoardingPass;
    } else {
      return boardingPass + 1;
    }
  }
}

module.exports = { partOne, partTwo };
