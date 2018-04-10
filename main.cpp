#define _GLIBCXX_USE_C99 1
#include <iostream>
#include <string>     // std::string, std::stoi
#include <algorithm>    // std::count

int main (int argc, const char *argv[])
{
int suma=0;
 std::string str = argv[1];
 std::size_t len = str.length();
 std::size_t pos = str.find("[");
 std::size_t posi = str.find("]");
 str.erase (posi,posi);
 str.erase (0,1);
 size_t n = std::count(str.begin(), str.end(), ',');
 for (int i = 0; i < n+1 ;i++ ){
std::size_t coma = str.find(",");
 std::string str3 = str.substr(0,coma);
 str.erase(0,coma+1);
suma=suma+ std::atoi( str3.c_str());
    }
std::cout<<suma<<"\n";
  return suma;
}
