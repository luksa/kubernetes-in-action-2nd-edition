#!/usr/bin/env bash

set -x

kubectl create deployment kubia --image=luksa/kubia:1.0

