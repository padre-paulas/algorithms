#include <iostream>
#include <fstream>
using namespace std;

void readFile2();

int main() {

  readFile2();

  return 0;
}

void readFile() {
  ifstream inFile("file-2.txt");

  double x1 = 0, x2 = 0, x3 = 0;

  while (true) {
    if (inFile.eof()) break;
    inFile >> x1 >> x2 >> x3;
  }
}

void readFile2() {
  ifstream inFile("file-2.txt");

  double arr[3][3];
  int i = 0;
  while (i < 3) {
    for (int j = 0; j < 3; j++) {
      inFile >> arr[i][j];
    }
    i++;
  }
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      cout << arr[i][j] << endl;
    }
  }
}