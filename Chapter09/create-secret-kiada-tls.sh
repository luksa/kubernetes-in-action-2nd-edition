#!/usr/bin/env bash

kubectl create secret tls kiada-tls \
    --cert example-com.crt \
    --key example-com.key
