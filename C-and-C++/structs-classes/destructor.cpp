#include <iostream>
#include <string>
using namespace std;

class Number {
  public:
    Number(double n) : number(n) {
      cout << "Constructor executing!\n" << "Number: " << number << endl;
    }
    ~Number() {
      cout << "Destructor executing!\n" << "Number: " << number << endl;
    }
  private:
    double number;
};

int main() {

  Number Eight(8);
  

  return 0;
}