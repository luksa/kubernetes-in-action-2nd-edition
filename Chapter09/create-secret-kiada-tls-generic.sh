#!/usr/bin/env bash

kubectl create secret generic kiada-tls2 \
    --from-file tls.crt=example-com.crt \
    --from-file tls.key=example-com.key
