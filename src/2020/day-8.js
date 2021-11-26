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

class CPU {
  #instructionPointer;
  #executedInstructions;
  #accumulator;
  #program;

  get status() {
    return {
      instructionPointer: this.#instructionPointer,
      executedInstructions: this.#executedInstructions,
      accumulator: this.#accumulator,
      isProgramFinished: this.#instructionPointer >= this.#program.length,
      isInInfiniteLoop: this.#isInInfiniteLoop(),
    };
  }

  load(program) {
    this.#instructionPointer = 0;
    this.#executedInstructions = [];
    this.#accumulator = 0;
    this.#program = program;
  }

  execute() {
    if (this.status.isProgramFinished) {
      return;
    }

    if (this.status.isInInfiniteLoop) {
      throw new Error(`Infinite loop detected! CPU status %o`, this.status);
    }

    const previousInstructionPointer = this.#instructionPointer;

    const [operation, argument] = this.#program[this.#instructionPointer];

    switch (operation) {
      case 'acc':
        (this.#accumulator += argument), (this.#instructionPointer += 1);
        break;
      case 'jmp':
        this.#instructionPointer += argument;
        break;
      case 'nop':
        this.#instructionPointer += 1;
        break;
      default:
        throw new Error(`Invalid operation ${operation}`);
    }

    this.#executedInstructions.push(previousInstructionPointer);
  }

  #isInInfiniteLoop() {
    return this.#executedInstructions.includes(this.#instructionPointer);
  }
}

async function partOne() {
  const bootCode = await readBootCode();
  const cpu = new CPU();
  cpu.load(bootCode);
  while (!cpu.status.isInInfiniteLoop) {
    cpu.execute();
  }
  return cpu.status.accumulator;
}

async function partTwo() {
  function xkcdCosmicRay([operation, argument]) {
    if (operation === 'jmp') {
      return [true, ['nop', argument]];
    } else if (operation === 'nop') {
      return [true, ['jmp', argument]];
    } else {
      return [false, [operation, argument]];
    }
  }

  const bootCode = await readBootCode();
  const cpu = new CPU();
  let i = 0;

  while (true) {
    let modifiedBootCode = [...bootCode];

    while (i < modifiedBootCode.length) {
      let instruction = modifiedBootCode[i];
      const [wasModified, modifiedInstruction] = xkcdCosmicRay(instruction);
      if (wasModified) {
        modifiedBootCode[i] = modifiedInstruction;
        i++;
        break;
      }
      i++;
    }

    cpu.load(modifiedBootCode);

    while (!cpu.status.isInInfiniteLoop && !cpu.status.isProgramFinished) {
      cpu.execute();
    }

    if (cpu.status.isProgramFinished) {
      break;
    }
  }

  return cpu.status.accumulator;
}

module.exports = { partOne, partTwo };
