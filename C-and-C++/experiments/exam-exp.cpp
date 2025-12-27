#include <iostream>

struct Book {
  char title[100];
  char author[100];
  int year;
  double price;
};

int f7(char []);
void tellSize();
void doStruct();
int calculateArr(int *arr, int size);


int main() {

  // int a = 11;
  // int b = 111, m;

  // std::cout << (m = a > b ? a : b);

  // int a = 1, b = 2;
  // int *p = &a;
  // int *q = &b;
  // a = b;
  
  // std::cout << (*p == *q) << '\n';

  // char c[10] = "543";

  // std::cout << f7(c) << std::endl;

  // tellSize();

  // doStruct();

  int arr[10] = {3, 5, 4, 2, 7, 87, 23, 8, 22, 11};
  int size = sizeof(arr) / sizeof(arr[0]);
  std::cout << calculateArr(arr, size) << std::endl;

  return 0;
}

int f7(char c[]) {
  int i, s;

  for (i = s = 0; c[i] >= '0' && c[i] <= '7' && c[i]; i++) {
    s = s * 8 + c[i] - '0';
  }
  return s;
}

void tellSize() {
  union Floats {
    short int a;
    float f;
    double d;
    long double c;
  };
  Floats one;
  one.a = 1;
  one.f = 1.0;
  one.d = 1.0;
  one.c = 1.0;
  std::cout << sizeof(Floats) << std::endl;
  std::cout << sizeof(one) << std::endl;


}

void doStruct() {
  std::cout << sizeof(Book) << std::endl;
  std::cout << sizeof(int) << std::endl;
  std::cout << sizeof(double) << std::endl;

  if (2 % 2) std::cout << "AAAA\n";
}

int calculateArr(int *arr, int size) {
  int max = INT_MIN;
  int min = INT_MAX;
  bool even = false;

  for (int i = 0; i < size; i++) {
    if (!even) {
      if (arr[i] > max) max = arr[i];
    } else {
      if (arr[i] < min) min = arr[i];
    }
    even = !even;
  }
  std::cout << min << std::endl;
  std::cout << max << std::endl;

  return max - min;
}