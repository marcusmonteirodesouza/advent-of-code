const fs = require('fs').promises;
const path = require('path');

async function readBootCode() {
  const input = await fs.readFile(
    path.join(__dirname, 'inputs', 'day-8.txt'),
    'utf8'
  );

  return input
    .trim()
    .split('\n')
    .map((line) => {
      const [operation, argument] = line.split(' ');
      return [operation, Number.parseInt(argument)];
    });
}

function execute([operation, argument], acc, ip) {
  switch (operation) {
    case 'acc':
      return [argument + acc, ip + 1];
    case 'jmp':
      return [acc, ip + argument];
    case 'nop':
      return [acc, ip + 1];
    default:
      throw new Error(`Invalid operation ${operation}`);
  }
}

async function partOne() {
  const bootCode = await readBootCode();
  const executedOperations = new Set();
  let accumulator = 0;
  let instructionPointer = 0;
  while (instructionPointer < bootCode.length) {
    if (executedOperations.has(instructionPointer)) {
      return accumulator;
    }

    executedOperations.add(instructionPointer);

    const instruction = bootCode[instructionPointer];

    [accumulator, instructionPointer] = execute(
      instruction,
      accumulator,
      instructionPointer
    );
  }
}

async function partTwo() {}

module.exports = { partOne, partTwo };
