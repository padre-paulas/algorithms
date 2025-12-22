#include <stdio.h>
#include <stdlib.h>

int main(void) {

  int *a;

  int length = 0;

  printf("Enter arr length: ");
  scanf("%d", &length);

  a = malloc(length * sizeof(int));

  printf("a: %p\n", a);

  for (int i = 0; i < length; i++) {
    a[i] = i * 2;
  }

  for (int i = 0; i < length; i++) {
    printf("a[%d] = %d\n", i, a[i]);
  }

  free(a);

  return 0;
}