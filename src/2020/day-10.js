const fs = require('fs').promises;
const path = require('path');

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

async function partTwo() {}

module.exports = { partOne, partTwo };
