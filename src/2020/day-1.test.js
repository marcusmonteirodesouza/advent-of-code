const day1 = require('./day-1');

describe('day-1', () => {
  describe('solution', () => {
    it('should return the correct result', async () => {
      await expect(day1.solution()).resolves.toBe(494475);
    });
  });
});
