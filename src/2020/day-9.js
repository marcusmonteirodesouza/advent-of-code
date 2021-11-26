const fs = require('fs').promises;
const path = require('path');

async function readNumbers() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-9.txt'),
    'utf8'
  );

  return input
    .trim()
    .split('\n')
    .map((x) => Number.parseInt(x));
}

async function partOne() {
  function isValid(number, numbers) {
    function hasSum(number, numbers) {
      const set = new Set();
      numbers.forEach((n) => {
        set.add(number - n);
      });
      for (const n of numbers) {
        if (set.has(n)) {
          return true;
        }
      }
      return false;
    }
    return hasSum(number, numbers);
  }

  const numbers = await readNumbers();
  const preambleLength = 25;
  for (let i = preambleLength; i < numbers.length; i++) {
    const number = numbers[i];
    const numbersSlice = numbers.slice(i - preambleLength, i);
    if (!isValid(number, numbersSlice)) {
      return number;
    }
  }
}

async function partTwo() {}

module.exports = { partOne, partTwo };
