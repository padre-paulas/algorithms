const arr = [
  -42, -39, -35, -31, -28, -24, -21, -18, -15, -12,
   -9,  -7,  -5,  -3,  -1,   0,   2,   4,   6,   8,
   10,  12,  14,  16,  18,  20,  22,  24,  26,  28,
   30,  32,  34,  36,  38,  40,  42,  44,  46,  48
];

function innerFindNum(arr, target, left, right) {
  if (left > right) return -1;
  let mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] > target) right = mid - 1;
  else left = mid + 1;
  return innerFindNum(arr, target, left, right);
}

function findNum(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = innerFindNum(arr, target, left, right);
  if (result === -1) return null;
  else return result;
}

let target1 = -100;
let target2 = -3;

console.log(`Number ${target1} is found at index ` + findNum(arr, target1));
console.log(`Number ${target2} is found at index ` + findNum(arr, target2));