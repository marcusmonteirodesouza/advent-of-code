const fs = require('fs').promises;
const path = require('path');

async function readPasswordDB() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-2.txt'),
    'utf8'
  );

  return input.trim().split('\n');
}

function countChars(str, char) {
  return (str.match(new RegExp(char, 'g')) || []).length;
}

async function partOne() {
  function parsePasswordDB(passwordDB) {
    return passwordDB.map((line) => {
      splittedLine = line.split(' ');
      const [lowestNumberOfTimes, highestNumberOfTimes] = splittedLine[0]
        .split('-')
        .map((n) => Number.parseInt(n));
      return {
        password: splittedLine[2],
        passwordPolicy: {
          letter: splittedLine[1][0],
          lowestNumberOfTimes,
          highestNumberOfTimes,
        },
      };
    });
  }

  const passwordDB = await readPasswordDB();

  return parsePasswordDB(passwordDB).filter((record) => {
    const { letter, lowestNumberOfTimes, highestNumberOfTimes } =
      record.passwordPolicy;
    letterCount = countChars(record.password, letter);
    return (
      letterCount >= lowestNumberOfTimes && letterCount <= highestNumberOfTimes
    );
  }).length;
}

async function partTwo() {
  function parsePasswordDB(passwordDB) {
    return passwordDB.map((line) => {
      splittedLine = line.split(' ');
      const [position0, position1] = splittedLine[0]
        .split('-')
        .map((n) => Number.parseInt(n) - 1);
      return {
        password: splittedLine[2],
        passwordPolicy: {
          letter: splittedLine[1][0],
          position0,
          position1,
        },
      };
    });
  }

  const passwordDB = await readPasswordDB();

  return parsePasswordDB(passwordDB).filter((record) => {
    const password = record.password;
    const { letter, position0, position1 } = record.passwordPolicy;
    if (password[position0] === letter && password[position1] !== letter) {
      return true;
    }
    if (password[position0] !== letter && password[position1] === letter) {
      return true;
    }
    return false;
  }).length;
}

module.exports = { partOne, partTwo };
