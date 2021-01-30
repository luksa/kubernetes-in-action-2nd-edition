#!/usr/bin/env bash

set -x

kubectl expose deployment kiada --type=LoadBalancer --port=8080

