#include <iostream>
#include <iterator>

int main() {

  int arr[20] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20};

  int lookingFor = 20;
  int right = sizeof(arr) / sizeof(arr[0]) - 1;
  int left = 0;
  int mid = 0;

  while (left <= right) {
    mid = (right + left) / 2;
    if (arr[mid] == lookingFor) {
      std::cout << "Value found at i: " << mid << std::endl;
      break;
    }
    if (arr[mid] > lookingFor) {
      std::cout << "right: " << right << " left: " << left << " mid: " << mid << std::endl;
      right = mid - 1;
    } else {
      std::cout << "right: " << right << " left: " << left << " mid: " << mid << std::endl;
      left = mid + 1;
    }
  }


  return 0;
}