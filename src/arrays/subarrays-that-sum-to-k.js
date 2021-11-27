function subArraysThatSumToK(arr, k) {
  const result = [];
  const map = new Map();
  const initial = [];
  initial.push(-1);
  map.set(0, initial);
  let prefixSum = 0;

  for (let i = 0; i < arr.length; i++) {
    prefixSum += arr[i];
    if (map.has(prefixSum - k)) {
      const startIndexes = map.get(prefixSum - k);
      for (const index of startIndexes) {
        result.push(arr.slice(index + 1, i + 1));
      }
      return result;
    }

    let newStart = [];
    if (map.has(prefixSum)) {
      newStart = map.get(prefixSum);
    }

    newStart.push(i);
    map.set(prefixSum, newStart);
  }
}

module.exports = { subArraysThatSumToK };
