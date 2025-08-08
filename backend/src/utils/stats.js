// Utility intentionally unused by routes (candidate should refactor)
function mean(arr, reduceKey = "") {
  return arr.reduce((a, b) => a + (b?.[reduceKey] ?? b ?? 0), 0) / arr.length;
}

module.exports = { mean };