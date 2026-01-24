const arr = Array.from( { length: 5 }, () => Math.floor(Math.random() * 100))

function quicksort(arr) {  
  if (arr.length < 2) return arr;

  let less = [];
  let greater = [];
  const pivot = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      // less.push(arr[i])
      less = [...less, arr[i]];
    } else {
      // greater.push(arr[i])
      greater = [...greater, arr[i]];
    }
  }
  return [...quicksort(less), pivot, ...quicksort(greater)];
}

console.log(arr)
console.log(quicksort(arr));

function quicksort2(arr) {  
  if (arr.length < 2) return arr;

  let less = [];
  let greater = [];
  const pivotIndex = Math.floor(Math.random() * arr.length)
  const pivot = arr[pivotIndex];
  
  for (let i = 0; i < pivotIndex; i++) {
    if (arr[i] < pivot) {
      less.push(arr[i])
    } else {
      greater.push(arr[i])
    }
  }
  for (let i = pivotIndex + 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      less.push(arr[i])
    } else {
      greater.push(arr[i])
    }
  }
  return [...quicksort2(less), pivot, ...quicksort2(greater)];
}

console.log(quicksort2(arr));
