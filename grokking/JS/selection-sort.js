const arr = [16, 2, 3, 4, 11, 5, 7, 90, 8];
let arrCopy = [];

function selection(arr) {
  let value = Infinity;
  let prevValue = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    value = Infinity;
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] < value && arr[j] > prevValue) {
        console.log(value)
        value = arr[j];
      } 
    }
    arrCopy.push(value);
    prevValue = value;
  }
}

selection(arr);
console.log(arrCopy);