#include <string>

#ifndef SECRET_H
#define SECRET_H

static const int w = ((((1<<2)^6) & 23) + ('a' ^ 43));

std::string CreateApiKey(const std::string& username, const std::string& data);
uint64_t CodeStr(std::string& s);
std::string GenApiKey(std::string username);
std::string GetDateAsStr();

#endif /* ifndef SECRET_H */
