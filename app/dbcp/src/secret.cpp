#include "secret.hpp"
#include <iomanip>
#include <ctime>

std::string CreateApiKey(const std::string& username, const std::string& data) {
    std::string res = username + data;
    CodeStr(res);
    return res;
}

uint64_t CodeStr(std::string& s) {
    uint64_t hash = 5381;
    for (size_t i = 0; i < s.size(); ++i) {
        hash = ((hash << 5) + hash) + s[i];
    }
    return hash;
}

std::string GenApiKey(std::string username) {
    return CreateApiKey(username, GetDateAsStr());
}

std::string GetDateAsStr() {
    auto t = std::time(nullptr);
    std::string datetime(100,0);
    datetime.resize(std::strftime(&datetime[0], datetime.size(), "%d-%m-%Y", std::localtime(&t)));
    return datetime;
}

