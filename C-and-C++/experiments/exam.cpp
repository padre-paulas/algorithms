#include <iostream>

// int* inputArr();
void sort(int arr[], int length);
void showArr(int arr[], int length);

int main() {

  // inputArr();
  int arr[] = {3, 5, -3, 90, 6, 7, 45, 888};
  int length = sizeof(arr) / sizeof(int);

  showArr(arr, length);
  sort(arr, length);
  showArr(arr, length);

  return 0;
}

// int inputArr() {
//   int length;
//   std::cout << "Hi! How many elements should the array contain? ";
//   std::cin >> length;

//   int arr[length];

//   for (int i = 0; i < length; i++) {
//     std::cout << "Enter an int: ";
//     std::cin >> arr[i];
//   }

//   std::cout << "Here's your array: ";
//   for (int i = 0; i < length; i++) {
//     std::cout << arr[i] << "  ";
//   }
//   std::cout << std::endl;
//   return arr;
// }

void sort(int arr[], int length) {
  int temp = 0;
  for (int i = 0; i < length; i++) {
    for (int j = 0; j < length - 1; j++) {
      if (arr[j] > arr[j+1]) {
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
}

void showArr(int arr[], int length) {
  std::cout << "Here's your array: ";
  for (int i = 0; i < length; i++) {
    std::cout << arr[i] << "  ";
  }
  std::cout << std::endl;
}