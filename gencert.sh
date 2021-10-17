#!/bin/bash

if [[ ! -e ssltls ]]; then
    mkdir ssltls
fi

if [[ -e ssltls/key.pem && -e ssltls/cert.pem ]]; then
    rm -rf ssltls/key.pem
    rm -rf ssltls/cert.pem
fi

openssl req -x509 -newkey rsa:2048 -nodes -keyout ./ssltls/key.pem -out ./ssltls/cert.pem -days 365 -subj "/C=US/O=Dev Cert/CN=localhost"
