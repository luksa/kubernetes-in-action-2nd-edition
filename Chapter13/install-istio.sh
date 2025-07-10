#!/bin/bash

kubectl get crd gateways.gateway.networking.k8s.io || kubectl apply -k "github.com/kubernetes-sigs/gateway-api/config/crd/experimental"

# install only istiod
istioctl install -y --set profile=minimal

