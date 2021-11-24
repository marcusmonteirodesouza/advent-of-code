const day1 = require('../day-1');

describe('day-1', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day1.partOne()).resolves.toBe(494475);
    });
  });

  describe('partTwo', () => {
    it('should return the correct result', async () => {
      await expect(day1.partTwo()).resolves.toBe(267520550);
    });
  });
});
