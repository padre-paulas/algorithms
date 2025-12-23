#include <iostream>
#include <fstream>
using namespace std;

int writeFile();

int main() {

  writeFile();

  return 0;
}

int writeFile() {
  ofstream outFile;
  outFile.open("file-write-1.txt", ofstream::app);

  if (!outFile.is_open()) {
    cout << "Couldn't open file\n";
    return 1;
  }

  outFile << "content\n";

  double x = 4.5;
  int y = 10;
  string z = "abc";

  outFile << x << " " << y << " " << z << endl;

  outFile.close();
  return 0;
}