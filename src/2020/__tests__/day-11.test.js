const day11 = require('../day-11');

describe('day-11', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day11.partOne()).resolves.toBe(2334);
    });
  });

  describe.skip('partTwo', () => {
    it('should return the correct result', async () => {});
  });
});
