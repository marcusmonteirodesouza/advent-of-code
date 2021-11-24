const day4 = require('../day-4');

describe('day-4', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day4.partOne()).resolves.toBe(230);
    });
  });

  describe('partTwo', () => {
    it('should return the correct result', async () => {
      await expect(day4.partTwo()).resolves.toBe(156);
    });
  });
});
