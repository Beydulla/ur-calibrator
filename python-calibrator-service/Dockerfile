FROM ubuntu:20.04

ENV TZ=Europe/Budapest
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get update && apt-get upgrade -y && apt-get clean
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update
RUN apt-get install -y  wkhtmltopdf
RUN apt install -y software-properties-common
RUN add-apt-repository -y ppa:deadsnakes/ppa
# Python package management and basic dependencies
RUN apt-get install -y curl python3.7 python3.7-dev python3.7-distutils
RUN apt-get install -y build-essential
# Register the version in alternatives
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1
# Set python 3 as the default python
RUN update-alternatives --set python /usr/bin/python3.7
# Upgrade pip to latest version
RUN curl -s https://bootstrap.pypa.io/get-pip.py -o get-pip.py && \
    python get-pip.py --force-reinstall && \
    rm get-pip.py

RUN mkdir /app
COPY ./requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt

COPY . /app
WORKDIR /
CMD python /app/main.py