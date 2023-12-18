FROM ubuntu:22.04

RUN apt update && apt install -y libpqxx-dev libfmt-dev git cmake
RUN apt-get -y install build-essential
RUN apt install -y libasio-dev 
RUN git clone https://github.com/CrowCpp/Crow.git && cd Crow && mkdir build && cd build && cmake .. -DCROW_BUILD_EXAMPLES=OFF -DCROW_BUILD_TESTS=OFF && make install
RUN apt-get -y install wget
RUN wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-2/wkhtmltox_0.12.6.1-2.jammy_amd64.deb
RUN apt install -y ./wkhtmltox_0.12.6.1-2.jammy_amd64.deb
 
COPY . .

RUN bash ./src/run.sh

EXPOSE 8000
