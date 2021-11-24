const assert = require('assert');
const fs = require('fs');
const path = require('path');

async function solution() {
  const input = await fs.promises.readFile(
    path.join(__dirname, 'inputs', 'day-1.txt'),
    'utf8'
  );
  const expenses = input
    .trim()
    .split('\n')
    .map((line) => Number.parseInt(line));
  const entriesThatSumTo2020 = [];
  const twoThousandTwentyMinusExpensesMap = new Map();
  for (const expense of expenses) {
    twoThousandTwentyMinusExpensesMap.set(2020 - expense, expense);
  }
  for (const expense of expenses) {
    if (twoThousandTwentyMinusExpensesMap.has(expense)) {
      entriesThatSumTo2020.push(expense);
      entriesThatSumTo2020.push(twoThousandTwentyMinusExpensesMap.get(expense));
      break;
    }
  }
  assert.equal(
    entriesThatSumTo2020.length,
    2,
    'Exactly two entries should sum to 2020'
  );
  return entriesThatSumTo2020.reduce((a, b) => a * b);
}

module.exports = { solution };
