#include <iostream>
using namespace std;

void q2();
void q3();
void q4();
// void q5();
// void q6();

int main() {

  // int a = 15, b = 0, c;

  // if (a = b) { c = b; c = a; } c = b;

  // cout << c << endl;

  q4();

  return 0;
}

void q2() {
  double d1 = 2.56, d2, d3;
  d2 = (int)d1 + 1.5;
  d3 = (int)(d1 + 1.5);

  cout << "d2: " << d2 << " d3: " << d3 << endl;
}

void q3() {
  int a = 11, b = 111, m;

  m = a > b ? a : b;

  cout << m << endl;
}

void q4() {

  int i, d;
  for (i = 0, d = 0; i < 10; i++, d = !d);

  cout << i << " " << d << endl;
}