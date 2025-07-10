#!/usr/bin/env bash

kubectl create configmap kiada-ssl-config \
    --from-literal status-message="This status message is set in the kiada-ssl-config ConfigMap" \
    --from-file envoy.yaml=./envoy.yaml
