#include <iostream>
#include <string>
using namespace std;

class Number {
  public:
    Number(double n) {
      number = (double *) malloc(sizeof(double)); // C implemenation
      number = new double;
      *number = n;
      cout << "Constructor executing!\n" << "Number: " << *number << endl;
    }
    ~Number() {
      cout << "Destructor executing!\n" << "Number: " << *number << endl;
      free(number);
    }
  private:
    double *number;
};

void test() {
  Number six(6);
}

int main() {

  Number *five = new Number(5);

  test();

  Number Eight(8);

  delete five;
  return 0;
}