#!/bin/sh

steps=${1:-5}

echo "Initialization started..."

for i in $(seq 1 $steps); do
  echo "Performing initialization procedure $i/$steps"
  sleep 1
done

echo "Initialization complete!"
