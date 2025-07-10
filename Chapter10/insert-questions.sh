#!/usr/bin/env bash

echo "Initial number of questions in the database:"
kubectl exec -it quiz -c mongo -- mongosh kiada --quiet --eval "db.questions.countDocuments()"


kubectl cp insert-questions.js quiz:/tmp/ -c mongo
kubectl exec quiz -c mongo -- mongosh kiada -f /tmp/insert-questions.js

echo "Number of questions after insertion:"
kubectl exec -it quiz -c mongo -- mongosh kiada --quiet --eval "db.questions.countDocuments()"
