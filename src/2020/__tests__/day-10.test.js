const day10 = require('../day-10');

describe('day-10', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day10.partOne()).resolves.toBe(2343);
    });
  });

  describe('partTwo', () => {
    it('should return the correct result', async () => {
      await expect(day10.partTwo()).resolves.toBe(31581162962944);
    });
  });
});
