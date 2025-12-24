#include <iostream>
#include <string>
using namespace std;

class Cafe {
  public:
    string name;
    int coffeePrice;

    void printAttributes() {
      cout << "At cafe " << name << " one coffee costs " << coffeePrice << endl;
    }
    Cafe(string name, int coffeePrice) {
      this->name = name;
      this->coffeePrice = coffeePrice;
    }
    Cafe() : name(""), coffeePrice(0) {}
    Cafe(string name) : name(name), coffeePrice(0) {}
};

int main() {

  Cafe Kredens("Kredens", 99);
  Kredens.printAttributes();

  Cafe KKSL;
  KKSL.printAttributes();

  Cafe Foundation("Foundation");
  Foundation.printAttributes();

  return 0;
}
