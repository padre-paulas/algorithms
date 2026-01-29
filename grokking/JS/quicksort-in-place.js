const quicksortFuncInner = (array, left = 0, right = array.length - 1) => {
  if (left < right) {
    const pivotIndex = partition(array, left, right);
    quicksortFuncInner(array, left, pivotIndex - 1);
    quicksortFuncInner(array, pivotIndex + 1, right);
  }
  return array;
}
const partition = (array, left, right) => {
  const pivot = array[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (array[j] <= pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    } 
  }

  [array[i + 1], array[right]] = [array[right], array[i + 1]];
  console.log(array)
  return i + 1;
}

const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
console.log(arr)
console.log(quicksortFuncInner(arr))