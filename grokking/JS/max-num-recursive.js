import { arr } from './sum-recursive.js'

function innerFindMaxNum(arr, count, max) {
  if (count === 0) return max;
  if (max < arr[count - 1]) max = arr[count - 1];
  return innerFindMaxNum(arr, count - 1, max);
}

function findMaxNum() {
  let max = -Infinity;
  const count = arr.length;
  return innerFindMaxNum(arr, count, max)
}


console.log("the max num is " + findMaxNum(arr));