#!/usr/bin/env bash

kubectl create configmap quote-config \
    --from-file quotes=./book-quotes.txt \
    --from-file quotes.dat=./book-quotes.txt.dat \
    --from-literal interval=60

