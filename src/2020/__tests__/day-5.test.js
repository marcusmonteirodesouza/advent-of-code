const day5 = require('../day-5');

describe('day-5', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day5.partOne()).resolves.toBe(944);
    });
  });

  describe('partTwo', () => {
    it('should return the correct result', async () => {
      await expect(day5.partTwo()).resolves.toBe(554);
    });
  });
});
