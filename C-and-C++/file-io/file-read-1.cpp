#include <iostream>
#include <fstream>

int main() {

  std::ifstream inFile;
  inFile.open("file-1.txt");

  if (!inFile.is_open()) {
    std::cout << "Couldn't open the file\n";
    return 1;
  }

  int number = 0;

  inFile >> number;
  inFile >> number;
  if(inFile.fail()) {
    std::cout << "Error file format incorrect.\n";
    return 1;
  }

  std::cout << number << std::endl;

  inFile.close();

  return 0;
}