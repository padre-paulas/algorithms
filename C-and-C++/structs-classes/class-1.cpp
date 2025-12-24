#include <iostream> 
#include <string>
#define клас class
#define публічне public
#define рядок string
#define ціле int
#define власне private
#define пусте void
#define повертає return
#define головна main
#define свивід cout
#define кінецьр endl

using namespace std;

клас БанківськийАкаунт {
  публічне:
    рядок імя;
    ціле баланс;

  власне:
    рядок прізвище;
};

пусте перша();

ціле головна() {

  перша();

  повертає 0;
}

пусте перша() {

  БанківськийАкаунт акаунт1;

  акаунт1.імя = "Віктор";

  свивід << акаунт1.імя << кінецьр;
}