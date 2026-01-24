const arr = Array.from( { length: 50 }, () => Math.floor(Math.random() * 100))

function quicksort(arr) {  
  if (arr.length < 2) return arr;

  let less = [];
  let greater = [];
  let pivot = arr[0];
  
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

