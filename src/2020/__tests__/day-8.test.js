const day8 = require('../day-8');

describe('day-8', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day8.partOne()).resolves.toBe(1859);
    });
  });

  describe.skip('partTwo', () => {
    it('should return the correct result', async () => {});
  });
});
