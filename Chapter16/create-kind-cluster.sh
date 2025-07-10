#!/usr/bin/env bash
echo Creating kind cluster with the following config:
cat kind-multi-node.yaml
echo
kind create cluster --config kind-multi-node.yaml

