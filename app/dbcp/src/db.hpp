#ifndef DATABASE_LIB
#define DATABASE_LIB

#include <fmt/core.h>
#include <string>
#include <vector>
#include <pqxx/pqxx>
#include <fmt/format.h>
#include <iostream>


namespace DB {
    const std::string user     = "egor";
    const std::string password = "admin";
    const std::string host     = "31.31.202.46";
    const std::string port     = "5432";
    const std::string dbName   = "lab_db_egor";

    class Condition;

    class Column {
        public:
            std::string name;
            Column(){};
            Column(const std::string& c) : name(c) {};
    };

    class Condition {
        private:
            std::string key;
            std::string value;
            bool set = false;
            Condition(const std::string& key, const std::string& value): key(key), value(value) {}
            Condition(const std::string& key, const std::vector<std::string>& values): key(key) {
                set = true;
                value = "(";
                for (std::string x: values) {
                    value += x + ", ";
                }
                value.pop_back();
                if (value.size() > 0) {
                    value[value.size() - 1] = ')';
                }
            }
        public:
            std::string GetKey() const;
            std::string GetValue() const;
            std::string GetEqForm() const;

            friend class IntColumn;
            friend class StrColumn;
    };

    class Int : public Column {
        public:
            Int(const std::string& c) : Column(c) {}
            Int(int c) : Column(std::to_string(c)) {}
    };

    class Str : public Column {
        public:
            Str(const std::string& c) : Column(c) {}
            Str(Column c) : Column(c) {}
    };

    class Vec : public Column {
        public:
            std::vector<std::string> items;
            Vec(const std::vector<std::string>& v) : items(v), Column() {};
            Vec(Column c) : Column(c) {}
    };

    class IntColumn : public Column {
        public:
            Condition operator == (const DB::Int& other) const {
                return Condition(name, other.name);
            }
            Condition operator == (const DB::Vec& other) const {
                return Condition(name, other.items);
            }
            IntColumn(const std::string& s) : Column(s) {};
    };

    class StrColumn : public Column {
        public:
            Condition operator == (const DB::Str& other) const {
                return Condition(name, fmt::format("'{}'", other.name));
            }
            Condition operator == (const DB::Vec& other) const {
                return Condition(name, other.items);
            }
            // TODO: == для DB:Int просто кастует его к Str, вметсо ошибки
            StrColumn(const std::string& s) : Column(s) {};
    };


    class Connection {
        public:
            pqxx::connection Connect();
    };

    class SelectQuery : private Connection {
        private:
            std::string tableName;
            std::vector<Column> res;

        public:
            std::string CreateSqlQueryString(const std::vector<Condition>& v);
            SelectQuery(const std::string& s, const std::vector<Column>& v): tableName(s), res(v) {}

            std::vector<std::vector<std::string>> Where(const std::vector<Condition>& v);
    };

    class InsertQuery : private Connection {
        private:
            std::string tableName;
        public:
            std::string CreateSqlQueryString(const std::vector<Condition>& v);
            InsertQuery(const std::string& s): tableName(s) {}

            bool Where(const std::vector<Condition>& v);
    };

    class UpdateQuery : private Connection {
        private:
            std::string tableName;
            std::vector<Condition> res;

        public:
            std::string CreateSqlQueryString(const std::vector<Condition>& v);
            UpdateQuery(const std::string& s, const std::vector<Condition>& v): tableName(s), res(v) {}

            bool Where(const std::vector<Condition>& v);
    };

    class RemoveQuery : private Connection {
        private:
            std::string tableName;
        public:
            std::string CreateSqlQueryString(const std::vector<Condition>& v);
            RemoveQuery(const std::string& s): tableName(s){}

            bool Where(const std::vector<Condition>& v);
    };

    class User {
        
        static const std::string tableName;
        
        public:

            /* list of columns names in table `users` */
            static const IntColumn id;
            static const StrColumn username;
            static const StrColumn password;
            static const StrColumn apiKey;
            static const StrColumn date;
            static const StrColumn email;

            static SelectQuery Select(const std::vector<Column>& queryCols);
            static InsertQuery Insert();
            static RemoveQuery Remove();
    };

    class Project {
        
        static const std::string tableName;
        
        public:

            /* list of columns names in table `projects` */
            static const IntColumn id;
            static const StrColumn name;
            static const StrColumn date;
            static const IntColumn ownerId;

            static SelectQuery Select(const std::vector<Column>& queryCols);
            static InsertQuery Insert();
            static RemoveQuery Remove();
    };

    class Note {
        
        static const std::string tableName;
        
        public:

            /* list of columns names in table `notes` */
            static const IntColumn id;
            static const StrColumn name;
            static const StrColumn body;
            static const StrColumn date;
            static const IntColumn projectId;

            static const IntColumn posX;
            static const IntColumn posY;

            static SelectQuery Select(const std::vector<Column>& queryCols);
            static UpdateQuery Update(const std::vector<Condition>& queryCols);
            static InsertQuery Insert();
            static RemoveQuery Remove();
    };

    class Edge {
        
        static const std::string tableName;
        
        public:

            /* list of columns names in table `notes` */
            static const IntColumn id;
            static const IntColumn start;
            static const IntColumn dest;

            static SelectQuery Select(const std::vector<Column>& queryCols);
            static InsertQuery Insert();
            static RemoveQuery Remove();
    };

    class Executor : private Connection {
        public:
            Executor() {};
        std::vector<std::vector<std::string>> Exec(const std::string& q);
    };
};

#endif /* ifndef DATABASE_LIB */

