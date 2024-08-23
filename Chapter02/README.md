# Kubernetes in Action, 2nd Edition

## Chapter 2. Understanding containers

### Deploying resources
- [../scripts/apply.sh](../scripts/apply.sh) - helper script to deploy resource yaml files and update prefix values.  Resource files should be specified as arguments.

### Creating the pod manifest for the Kiada application
- [pod.kiada.yaml](pod.kiada.yaml) - YAML manifest file for the `kiada` pod

### Creating the Kiada container image

Building the **`kiada:1.0`** image:
- [Makefile](kiada-0.1/Makefile) - contains commands to build and push the image
- [Dockerfile](kiada-0.1/Dockerfile) - Docker instructions for building the image
- [app.js](kiada-0.1/app.js) - application code (JavaScript)
