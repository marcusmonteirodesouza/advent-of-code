const day2 = require('../day-2');

describe('day-2', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day2.partOne()).resolves.toBe(546);
    });
  });

  describe('partTwo', () => {
    it('should return the correct result', async () => {
      await expect(day2.partTwo()).resolves.toBe(275);
    });
  });
});
