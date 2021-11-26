const day7 = require('../day-7');

describe('day-7', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day7.partOne()).resolves.toBe(222);
    });
  });

  describe('partTwo', () => {
    it('should return the correct result', async () => {
      await expect(day7.partTwo()).resolves.toBe(13264);
    });
  });
});
