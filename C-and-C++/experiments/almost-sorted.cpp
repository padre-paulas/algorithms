#include <iostream>
using namespace std;

bool isAlmostSorted(int arr[], int length);

int main() {

  int arr[] = {3, 2, 4, 5, 6};
  int length = sizeof(arr) / sizeof(int);

  cout << isAlmostSorted(arr, length) << endl;

  return 0;
}

bool isAlmostSorted(int arr[], int length) {

  int violations = 0;

  for (int i = 0; i < length - 1; i++) {
    if (arr[i] > arr[i+1]) {
      violations++;
      if (violations == 2) return false;
    }
  }

  return true;
}