#include <stdio.h>

void swap(int *a, int *b);

int main() {

  int a, b, c;
  a = b = c = 0;

  // printf("Enter 3 numbers: ");
  // scanf("%d %d %d", &a, &b, &c);
  // printf("Result: %d\n", a + b + c);

  int x = 5;
  int y = 10;

  int *p1 = &x;
  int *p2 = &y;


  printf("x: %d, y: %d\n", x, y);
  printf("&x: %p, &y: %p\n", &x, &y);
  swap(&x, &y);
  // swap(p1, p2);
  printf("x: %d, y: %d\n", x, y);

  return 0;
}

void swap(int *a, int *b) {
  printf("&x: %p, &y: %p\n", a, b);

  int temp = 0;
  temp = *a;
  *a = *b;
  *b = temp;
}