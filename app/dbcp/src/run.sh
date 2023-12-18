#! /usr/bin/bash

set -x
g++ -c src/main.cpp
g++ -c src/secret.cpp
g++ -c src/db.cpp
g++ main.o secret.o db.o -lpqxx -lpq -lfmt
rm  main.o secret.o db.o

