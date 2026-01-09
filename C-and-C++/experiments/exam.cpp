#include <iostream>

void inputArr();
void sort(int arr[], int length);
void showArr(int arr[], int length);

int main() {

  inputArr();

  return 0;
}

void inputArr() {
  int length;
  std::cout << "Hi! How many elements should the array contain? ";
  std::cin >> length;

  int arr[length];

  for (int i = 0; i < length; i++) {
    std::cout << "Enter an int: ";
    std::cin >> arr[i];
  }

  showArr(arr, length);
  sort(arr, length);
  showArr(arr, length);
}

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