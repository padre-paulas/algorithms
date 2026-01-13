#include <iostream>
#include <iterator>

bool isIntArrSorted(int arr[], int arrSize);
int biSearch(int arr[], int arrSize, int lookingFor);

int main() {

  int arr[20] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};
  int lookingFor = 12;
  int arrSize = sizeof(arr) / sizeof(arr[0]);

  if (isIntArrSorted(arr, arrSize)) {
    int i = biSearch(arr, arrSize, lookingFor);
    if (i != -1) {
      std::cout << "Value found at i: " << i << std::endl;
    } else {
      std::cout << "Out of bounds!\n";
    }
  } else {
    std::cout << "Array isn't sorted!\n";
  }

  

  return 0;
}

bool isIntArrSorted(int arr[], int arrSize) {
  if (arrSize == 0) return false;
  if (arrSize == 1) return true;
  for (int i = 0; i < arrSize - 1; i++) {
    if (arr[i] > arr[i+1]) {
      return false;
    }
  }
  return true;
}

int biSearch(int arr[], int arrSize, int lookingFor) {
  if (arrSize == 0) return -1;
  if (arrSize == 1 && lookingFor == arr[0]) return 0;

  if (lookingFor > arr[arrSize - 1] || lookingFor < arr[0]) {
    return -1;
  }

  int right = arrSize - 1;
  int left = 0;
  int mid = 0;

  while (left <= right) {
    mid = (right + left) / 2;
    if (arr[mid] == lookingFor) {
      return mid;
    }
    if (arr[mid] > lookingFor) {
      std::cout << "right: " << right << " left: " << left << " mid: " << mid << std::endl;
      right = mid - 1;
    } else {
      std::cout << "right: " << right << " left: " << left << " mid: " << mid << std::endl;
      left = mid + 1;
    }
  }
  return -1;
}