const fs = require('fs').promises;
const path = require('path');
const range = require('lodash/range');

async function readJoltageAdapters() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-10.txt'),
    'utf8'
  );

  return input
    .trim()
    .split('\n')
    .map((x) => Number.parseInt(x));
}

async function partOne() {
  const adapters = await readJoltageAdapters();

  adapters.sort((a, b) => a - b);

  const initialOutletJoltage = 0;
  const deviceJoltage = adapters[adapters.length - 1] + 3;
  adapters.push(deviceJoltage);

  let outletJoltage = initialOutletJoltage;
  let oneJoltDifferences = 0;
  let threeJoltDifferences = 0;

  for (let i = 0; i < adapters.length; i++) {
    const adapter = adapters[i];
    const difference = adapter - outletJoltage;
    if (difference === 1) {
      oneJoltDifferences += 1;
    }
    if (difference === 3) {
      threeJoltDifferences += 1;
    }
    outletJoltage = adapter;
  }

  return oneJoltDifferences * threeJoltDifferences;
}

async function partTwo() {
  function numberOfArrangements(adapters) {
    const cache = new Map();

    function _numberOfArrangements(i) {
      if (cache.has(i)) {
        return cache.get(i);
      }

      if (i === adapters.length - 1) {
        return 1;
      }

      return range(i + 1, Math.min(i + 4, adapters.length))
        .filter((j) => adapters[j] - adapters[i] <= 3)
        .reduce((acc, j) => {
          const na = _numberOfArrangements(j);
          cache.set(j, na);
          return acc + na;
        }, 0);
    }

    return _numberOfArrangements(0);
  }

  const adapters = await readJoltageAdapters();

  adapters.sort((a, b) => a - b);

  const initialOutletJoltage = 0;
  const deviceJoltage = adapters[adapters.length - 1] + 3;

  adapters.unshift(initialOutletJoltage);
  adapters.push(deviceJoltage);

  return numberOfArrangements(adapters);
}

module.exports = { partOne, partTwo };
