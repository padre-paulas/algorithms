#include <iostream>
using namespace std;

int main() {

  int * p[10];
  int x;
  x = 240;
  p[0] = &x;
  *p[0] = 100;
  // *p[1] = 200;

  return 0;
}