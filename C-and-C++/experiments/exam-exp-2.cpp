#include <iostream>
#include <vector>
#include <fstream>
using namespace std;

void q2();
void q3();
void q4();
void q5();
void q6();
char q11(char str[]);
void q12();
void q13();

struct MonthlyInfo {
  char month;
  float plan;
  float complete;
};

int main() {

  // int a = 15, b = 0, c;

  // if (a = b) { c = b; c = a; } c = b;

  // cout << c << endl;

  // char string[26] = " well.  hello or whatever";
  // char result = q11(string);

  // cout << result << endl;

  q13();

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

void q5() {

}

void q6() {
  double p = (1 - 1 / pow(2, 2));
  int n = 3;
  for (; n < 10000; n++) {
    p *= (1 - 1 / pow(n, 2));
  }
  cout << p << endl;
}

char q11(char str[]) {
  int wordNumber = 0;
  string dynStr;
  for (int i = 0; str[i] != '\0'; i++) {
    cout << i << endl;
    if (str[i] != ' ') {
      if (str[i - 1] == ' ') wordNumber++;
      if (wordNumber == 3) break;
      dynStr.push_back(str[i]);
    }
  }
  return dynStr.back();
}

void q12() {
  int n = 3;
  double arr[n][n];
  ifstream inFile("AA.txt");
  ofstream outFile("CC.txt");
  if (!inFile.is_open()) return;
  if (!outFile.is_open()) return;

  int i = 0;
  while (i < n) {
    inFile >> arr[i][0] >> arr[i][1] >> arr[i][2];
    i++;
  }

  double sum = 0;
  for (i = 1; i < n; i++) {
    for (int j = 0; j < i; j++) {
      if (arr[i][j] < 0) {
        sum += arr[i][j];
      }
    }
  }
  outFile << sum;
}

void q13() {
  vector<MonthlyInfo> infoArray;
  int dataAmount = 20;
  MonthlyInfo MI;
  for (int i = 0; i < 3; i++) {
      cout << "Enter letter for the month: ";
      cin >> MI.month;

      cout << "Enter a number for plan: ";
      cin >> MI.plan;

      cout << "Enter number from 0 to 1 for the completeness of the plan: ";
      cin >> MI.complete;
      infoArray.push_back(MI);
  }
  MonthlyInfo temp;
  for (int i = 0; i < dataAmount; i++) {
    for (int j = 0; j < dataAmount; j++) {
      if (infoArray[j].complete < infoArray[j + 1].complete) {
        temp = infoArray[j];
        infoArray[j] = infoArray[j + 1];
        infoArray[j + 1] = temp;
      }
    }
  }
  for (int i = 0; i < dataAmount; i++) {
    cout << "Month: " << infoArray[i].month << " Plan: " << infoArray[i].plan << " Complete: " << infoArray[i].complete << endl;
  }
}