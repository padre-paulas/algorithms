#include <iostream>
using namespace std;

void q2();

int main() {

  // int a = 15, b = 0, c;

  // if (a = b) { c = b; c = a; } c = b;

  // cout << c << endl;

  q2();

  return 0;
}

void q2() {
  double d1 = 2.56, d2, d3;
  d2 = (int)d1 + 1.5;
  d3 = (int)(d1 + 1.5);

  cout << "d2: " << d2 << " d3: " << d3 << endl;
}