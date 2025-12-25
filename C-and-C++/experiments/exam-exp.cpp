#include <iostream>

int f7(char []);

int main() {

  // int a = 11;
  // int b = 111, m;

  // std::cout << (m = a > b ? a : b);

  int a = 1, b = 2;
  int *p = &a;
  int *q = &b;
  a = b;
  
  std::cout << (*p == *q) << '\n';

  char c[10] = "543";

  std::cout << f7(c) << std::endl;

  return 0;
}

int f7(char c[]) {
  int i, s;

  for (i = s = 0; c[i] >= '0' && c[i] <= '7' && c[i]; i++) {
    s = s * 8 + c[i] - '0';
  }
  return s;
}