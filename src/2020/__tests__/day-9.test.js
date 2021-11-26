const day9 = require('../day-9');

describe('day-9', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day9.partOne()).resolves.toBe(552655238);
    });
  });

  describe('partTwo', () => {
    it('should return the correct result', async () => {
      await expect(day9.partTwo()).resolves.toBe(70672245);
    });
  });
});
