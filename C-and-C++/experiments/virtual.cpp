#include <iostream>

class Base {
  public:
  virtual void print() const {
    std::cout << "base" << std::endl;
  }
};

class Derived: public Base {
  public:
  void print() const override {
    std::cout << "Derived" << std::endl;
  }
};

class Shape {
  public:
  virtual double getPerimeter() const = 0;
};

class Rectangle: public Shape {
  private:
  double width;
  double height;
  public: 
  Rectangle(double width, double height) : width(width), height(height) {};
  double getPerimeter() const override {
    return width * 2 + height * 2;
  }
};

int main() {

  Base base;
  Derived derived;

  derived.print();
  derived.Base::print();

  Base *b2 = new Derived();
  b2->print();

  Base base2 = base;
  base2.print();

  Rectangle rect(10, 34);
  std::cout << rect.getPerimeter() << std::endl;


  return 0;
}