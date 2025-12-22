#include <stdio.h>

void swap(int *a, int *b);

int main() {

  int a, b, c;
  a = b = c = 0;

  printf("Enter 3 numbers: ");
  scanf("%d %d %d", &a, &b, &c);

  printf("Result: %d\n", a + b + c);

  int x = 5;
  int y = 10;

  int *p1 = &x;
  int *p2 = &y;

  swap(&x, &y);
  swap(p1, p2);

  return 0;
}

void swap(int *a, int *b) {
  int temp = 0;
  temp = *a;
  *a = *b;
  *b = temp;
}