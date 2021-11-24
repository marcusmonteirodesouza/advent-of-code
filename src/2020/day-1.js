const fs = require('fs').promises;
const path = require('path');

async function readExpenses() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-1.txt'),
    'utf8'
  );

  return input
    .trim()
    .split('\n')
    .map((line) => Number.parseInt(line));
}

async function partOne() {
  const expenses = await readExpenses();
  const twoThousandTwentyMinusExpensesMap = new Map();
  for (const expense of expenses) {
    twoThousandTwentyMinusExpensesMap.set(2020 - expense, expense);
  }
  for (const expense of expenses) {
    if (twoThousandTwentyMinusExpensesMap.has(expense)) {
      return expense * twoThousandTwentyMinusExpensesMap.get(expense);
    }
  }
}

async function partTwo() {
  const expenses = await readExpenses();
  expenses.sort();
  for (let i = 1; i < expenses.length - 1; i++) {
    let l = i - 1;
    let r = i + 1;
    while (l >= 0 && r < expenses.length) {
      const sum = expenses[l] + expenses[i] + expenses[r];
      if (sum > 2020) {
        l -= 1;
      } else if (sum < 2020) {
        r += 1;
      } else {
        return expenses[l] * expenses[i] * expenses[r];
      }
    }
  }
}

module.exports = { partOne, partTwo };
