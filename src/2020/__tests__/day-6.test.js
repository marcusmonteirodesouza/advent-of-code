const day6 = require('../day-6');

describe('day-6', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day6.partOne()).resolves.toBe(6885);
    });
  });

  describe('partTwo', () => {
    it('should return the correct result', async () => {
      await expect(day6.partTwo()).resolves.toBe(3550);
    });
  });
});
