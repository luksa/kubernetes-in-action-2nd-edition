#!/usr/bin/env bash

kubectl create ns kiada
kubectl config set-context --current --namespace kiada
kubectl apply -f SETUP -R
