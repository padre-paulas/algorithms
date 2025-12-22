#include <stdio.h>

int main() {

  int b = 42;

  int *a;

  a = &b;

  printf("b: %d\n", b);
  printf("&b: %p\n", &b);
  printf("a: %p\n", a);

  *a = 90;
  
  printf("b: %d\n", b);
  printf("&b: %p\n", &b);
  printf("a: %p\n", a);

  return 0;
}