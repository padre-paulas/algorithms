const arr = [16, 2, 3, 4, 11, 5, 7, 90, 8];

function selection(arr) {
  let value = Infinity;
  let prevValue = -Infinity;
  let arrCopy = [];

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
  return arrCopy;
}

// let arrCopy = selection(arr);
// console.log(arrCopy);

function selectMin(arr) {
  let min = arr[0];
  let minIndex = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) {
      min = arr[i];
      minIndex = i;
    }
  }
  return minIndex;
}

function selection2_0(arr) {
  let arrCopy = [];
  let minIndex;
  let length = arr.length
  
  for (let i = 0; i < length; i++) {
    minIndex = selectMin(arr);
    arrCopy.push(arr[minIndex]);
    arr.splice(minIndex, 1)
  }
  return arrCopy
}

let arrCopy2 = selection2_0(arr);
console.log(arrCopy2);

