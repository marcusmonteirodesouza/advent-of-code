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

async function partTwo() {
  function findArrayThatSumsTo(k, numbers) {
    const map = new Map();
    const initial = [];
    initial.push(-1);
    map.set(0, initial);
    let prefixSum = 0;

    for (let i = 0; i < numbers.length; i++) {
      prefixSum += numbers[i];
      if (map.has(prefixSum - k)) {
        const startIndexes = map.get(prefixSum - k);
        return numbers.slice(startIndexes[0] + 1, i + 1);
      }

      let newStart = [];
      if (map.has(prefixSum)) {
        newStart = map.get(prefixSum);
      }

      newStart.push(i);
      map.set(prefixSum, newStart);
    }
  }

  const numbers = await readNumbers();
  const invalidNumber = await partOne();
  const arrayThatSumsToInvalidNumber = findArrayThatSumsTo(
    invalidNumber,
    numbers
  );
  arrayThatSumsToInvalidNumber.sort((a, b) => a - b);
  return (
    arrayThatSumsToInvalidNumber[0] +
    arrayThatSumsToInvalidNumber[arrayThatSumsToInvalidNumber.length - 1]
  );
}

module.exports = { partOne, partTwo };
