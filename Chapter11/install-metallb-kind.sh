#!/usr/bin/env bash

kubectl create namespace metallb-system
kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/v0.15.2/config/manifests/metallb-native.yaml

KIND_ADDRESS_RANGE=$(docker network inspect kind | jq '.[0].IPAM.Config[0].Subnet' -r)
if [[ "$KIND_ADDRESS_RANGE" == *.0.0/16 ]]; then
  PREFIX=${KIND_ADDRESS_RANGE%".0.0/16"}
  LB_ADDRESS_RANGE=$PREFIX.255.200-$PREFIX.255.250
else
  # TODO: add support for other CIDR blocks
  echo "Only x.y.0.0/16 subnets are supported by this script. Your kind subnet is $KIND_ADDRESS_RANGE."
  exit 1
fi

# Waiting till the controller is running.
kubectl -n metallb-system rollout status deployment controller

kubectl apply -f - <<EOF
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: l2-ip
  namespace: metallb-system
spec:
  ipAddressPools:
  - default-pool
---
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: default-pool
  namespace: metallb-system
spec:
  addresses:
  - $LB_ADDRESS_RANGE
EOF

