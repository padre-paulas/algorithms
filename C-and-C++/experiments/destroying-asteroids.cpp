#include <vector> 
#include <algorithm>
#include <iostream>

class Solution {
public:
    bool asteroidsDestroyed(int mass, std::vector<int>& asteroids) {
        std::sort(asteroids.begin(), asteroids.end());
        unsigned long longMass = mass;
        int length = asteroids.size();
        for (int i = 0; i < length; i++) {
            if (asteroids[i] > longMass) return false;
            longMass += asteroids[i];
        }
        return true;
    }
};

int main() {

  Solution s;
  std::vector<int> vec = {3, 43, 33};
  std::cout << s.asteroidsDestroyed(34, vec) << std::endl;

  return 0;
}