#!/usr/bin/env bash

kubectl exec -it quiz -c mongo -- mongo kiada --quiet --eval "db.questions.count()"
