#!/usr/bin/env bash
DIR=$(cd $(dirname $0) ; pwd -P)

kind create cluster --config "${DIR}/kind-multi-node.yaml"

