const day3 = require('../day-3');

describe('day-3', () => {
  describe('partOne', () => {
    it('should return the correct result', async () => {
      await expect(day3.partOne()).resolves.toBe(169);
    });
  });
});
