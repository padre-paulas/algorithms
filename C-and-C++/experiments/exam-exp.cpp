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

  tellSize();

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
 
}