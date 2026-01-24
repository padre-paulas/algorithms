export const arr = [1, 3, 5, 77, 4];
let sum = 0;

function addArrElements(arr, count) {
  if (count == 0) return 0;
  else {
    count--;
    console.log(arr[count]);
    return arr[count] + addArrElements(arr, count);
  }
}

console.log("hello " + addArrElements(arr, 5));


