#!/usr/bin/env bash

kubectl create configmap quote-data \
    --from-file=book-quotes.txt \
    --from-file=book-quotes.txt.dat \
    --dry-run=client -o yaml > cm.quote-data.yaml

