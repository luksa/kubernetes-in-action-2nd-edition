#!/usr/bin/env bash
DIR="$(cd $(dirname $0) ; pwd -P)"

source "${DIR}/../env"

set -x

kubectl create deployment kiada --image="${PREFIX}kiada:0.1"

