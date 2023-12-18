#include <crow/app.h>
#include <crow/common.h>
#include <crow/http_parser_merged.h>
#include <crow/http_request.h>
#include <crow/http_response.h>
#include <crow/json.h>
#include <crow/middlewares/cookie_parser.h>
#include <crow/middlewares/cors.h>
#include <exception>
#include <fmt/core.h>
#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
#include <cstdlib>
#include <fstream>

#include "db.hpp"
#include "secret.hpp"


void               sendFile(crow::response& res, std::string filename, std::string content_type);
void               sendHtml(crow::response& res, std::string filename);
void               sendStyle(crow::response& res, std::string filename);
void               sendScript(crow::response& res, std::string filename);
void               sendImage(crow::response& res, std::string filename);

crow::json::wvalue sendErrorResponse(const std::string& errorMsg);
crow::json::wvalue sendResponse();
crow::json::wvalue sendResponse(const std::vector<std::vector<std::string>>& body);

int main() {
    crow::App<crow::CORSHandler> app;
    auto& cors = app.get_middleware<crow::CORSHandler>();

    cors
      .global()
        .headers("X-Custom-Header", "Upgrade-Insecure-Requests")
        .methods("POST"_method, "GET"_method)
      .prefix("/nocors")
        .ignore();

    CROW_ROUTE(app, "/doc")([&](const crow::request& req, crow::response& res){
        sendFile(res, "doc.pdf", "application/octet-stream");
    });

    CROW_ROUTE(app, "/")([&](const crow::request& req, crow::response& res){
        sendHtml(res, "index");
    });

    CROW_ROUTE(app, "/q")([&](const crow::request& req, crow::response& res){
        sendHtml(res, "ya_index");
    });
    
    CROW_ROUTE(app, "/d")([&](const crow::request& req, crow::response& res){
        sendHtml(res, "index_f");
    });

    CROW_ROUTE(app, "/s")([&](const crow::request& req, crow::response& res){
        sendHtml(res, "sh_index");
    });

    CROW_ROUTE(app, "/css/<string>")([](const crow::request& req, crow::response& res, std::string filename){
        return sendStyle(res, filename);
    });

    CROW_ROUTE(app, "/js/<string>")([](const crow::request& req, crow::response& res, std::string filename){
        return sendScript(res, filename);
    });

    CROW_ROUTE(app, "/img/<string>")([](const crow::request& req, crow::response& res, std::string filename){
        return sendImage(res, filename);
    });

    CROW_ROUTE(app, "/details").methods("POST"_method)([&](const crow::request& req) {
        using namespace std;
        crow::json::rvalue query = crow::json::load(req.body);
        if (!query.has("query")){
            if (query.has("file")) {
                std::ofstream outfile ("../publics/doc.html");
                outfile << query["file"].s();
                outfile.close();
                std::system("wkhtmltopdf ../publics/doc.html ../publics/doc.pdf");
                return sendResponse();
            } else {
                return sendErrorResponse("u abobus");
            }
        }
        DB::Executor e; 
        return sendResponse(e.Exec(query["query"].s()));
    });

    app.port(8000).multithreaded().run();
    return 0;
}

void sendFile(crow::response& res, std::string filename, std::string content_type) {
    std::string ROOT_DIR = "../publics/";
    std::string filepath = ROOT_DIR.append(filename);
    try {
        std::ifstream input_content;
        input_content.open(filepath, std::ifstream::in);
        input_content.exceptions(std::ifstream::failbit | std::ifstream::badbit);

        std::ostringstream string_stream;
        string_stream << input_content.rdbuf();
        input_content.close();

        res.set_header("Content-Type", content_type);
        res.write(string_stream.str());
    } catch (const std::exception& e){
        std::cerr << e.what() << '\n';
        res.code = 404;
        res.write("content not found");
    }

    res.end();
}

void sendHtml(crow::response& res, std::string filename) {
    sendFile(res, filename.append(".html"), "text/html");
}

void sendStyle(crow::response& res, std::string filename) {
    std::string path = "css/" + filename;
    sendFile(res, path, "text/css");
}

void sendScript(crow::response& res, std::string filename) {
    std::string path = "js/" + filename;
    sendFile(res, path, "text/jscript");
}

void sendImage(crow::response& res, std::string filename) {
    std::string path = "img/" + filename;
    sendFile(res, path, "image/jpeg");
}



crow::json::wvalue sendErrorResponse(const std::string& errorMsg){
    crow::json::wvalue x;
    x["status"] = "fail";
    x["error"] = errorMsg;
    return x;
}

crow::json::wvalue sendResponse(const std::vector<std::vector<std::string>>& body){
    crow::json::wvalue x;
    x["status"] = "ok";
    x["body"] = body;
    return x;
}

crow::json::wvalue sendResponse(){
    crow::json::wvalue x;
    x["status"] = "ok";
    return x;
}

std::vector<std::string> split(const std::string& s, char delim) {
    std::vector<std::string> res;
    std::string tmp;
    for (char c: s) {
        if (c == ' ' && ' ' != delim) continue;
        if (c != delim) tmp.push_back(c);
        else {
            res.push_back(tmp);
            tmp.clear();
        }
    }
    if (!tmp.empty()) res.push_back(tmp);
    return res;
}

