#!/usr/bin/env bash
IMAGE=${IMAGE:-kubia:1.0}
fullImageTag="${PREFIX}${IMAGE}"
echo "Building image ${fullImageTag}"
docker build -t ${fullImageTag} kubia-v1-image/
if [ "${PUSH}" == "true" ]; then
  docker push ${fullImageTag}
fi