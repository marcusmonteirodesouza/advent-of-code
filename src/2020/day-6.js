const fs = require('fs').promises;
const path = require('path');

async function readAnswers() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-6.txt'),
    'utf8'
  );

  const groups = input.trim().split('\n\n');
  const answers = groups.map((group) => group.split('\n').flat());
  return answers;
}

async function partOne() {
  const answers = await readAnswers();
  return answers
    .map(
      (groupAnswers) =>
        Array.from(new Set(groupAnswers.join('').split(''))).length
    )
    .reduce((a, b) => a + b);
}

async function partTwo() {
  const answers = await readAnswers();
  return answers
    .map((groupAnswers) => {
      const distinctAnswers = Array.from(
        new Set(groupAnswers.join('').split(''))
      );
      const answersEveryoneAnswered = new Set();
      for (const distinctAnswer of distinctAnswers) {
        if (groupAnswers.every((answers) => answers.includes(distinctAnswer))) {
          answersEveryoneAnswered.add(distinctAnswer);
        }
      }
      return Array.from(answersEveryoneAnswered).length;
    })
    .reduce((a, b) => a + b);
}

module.exports = { partOne, partTwo };
