#include <iostream> 
#include <climits>
using namespace std;

int q14(int arr[], int length) {
  int min = INT_MAX;
  int max = INT_MIN;

  if (length == 0) return -1;
  if (length == 1) return arr[0];

  for (int i = 0; i < length; i++) {

    cout << arr[i] << endl;

    if ((i+1) % 2 && arr[i] > max) max = arr[i];
    if ((i+1) % 2 == 0 && arr[i] < min) min = arr[i];
  }

  cout << "minimum value: " << min << endl;
  cout << "maximum value " << max << endl;

  return max - min;
}

int main() {

  unsigned short int x = 5;
  long int y = 6;
  unsigned short *ptr1 = &x;
  long *prt2 = &y;
  // if (ptr1 < prt2); 

  enum city {
    street1 = 5,
    street2,
    street3,
  };

  // city::street1;

  int arr[12] = {1, 3, 5, 4, -7, -99, 43, 4, 677, 90, 12, 78};
  int length = sizeof(arr) / sizeof(int);

  int difference = q14(arr, length);

  cout << "The difference is: " << difference << endl;

  return 0;
}

