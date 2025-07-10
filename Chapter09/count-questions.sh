#!/usr/bin/env bash

kubectl exec -it quiz -c mongo -- mongosh kiada --quiet --eval "db.questions.countDocuments()"
