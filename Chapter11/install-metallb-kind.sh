#!/usr/bin/env bash

kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/master/manifests/namespace.yaml
kubectl create secret generic -n metallb-system memberlist --from-literal=secretkey="$(openssl rand -base64 128)"
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/master/manifests/metallb.yaml

KIND_ADDRESS_RANGE=$(docker network inspect kind | jq '.[0].IPAM.Config[0].Subnet' -r)
if [[ "$KIND_ADDRESS_RANGE" == *.0.0/16 ]]; then
  PREFIX=${KIND_ADDRESS_RANGE%".0.0/16"}
  LB_ADDRESS_RANGE=$PREFIX.255.200-$PREFIX.255.250
else
  # TODO: add support for other CIDR blocks
  echo "Only x.y.0.0/16 subnets are supported by this script. Your kind subnet is $KIND_ADDRESS_RANGE."
  exit 1
fi

kubectl apply -f - <<EOF
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: metallb-system
  name: config
data:
  config: |
    address-pools:
    - name: default
      protocol: layer2
      addresses:
      - $LB_ADDRESS_RANGE
EOF

