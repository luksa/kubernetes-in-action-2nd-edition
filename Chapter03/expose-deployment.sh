#!/usr/bin/env bash

set -x

kubectl expose deployment kubia --type=LoadBalancer --port=8080

