#!/usr/bin/env bash

kubectl create configmap kiada-envoy-config \
    --from-file envoy.yaml=./envoy.yaml
