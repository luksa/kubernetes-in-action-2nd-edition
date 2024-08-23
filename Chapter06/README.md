# Kubernetes in Action, 2nd Edition

## Chapter 6. Managing the lifecycle of the Pod's containers

### Deploying resources
- [../scripts/apply.sh](../scripts/apply.sh) - helper script to deploy resource yaml files and update prefix values.  Resource files should be specified as arguments.

### Adding a liveness probe
- [pod.kiada-liveness.yaml](pod.kiada-liveness.yaml) - YAML manifest file for the `kiada-liveness` pod

### Adding a startup probe
- [pod.kiada-startup-probe.yaml](pod.kiada-startup-probe.yaml) - YAML manifest file for the `kiada-startup-probe` pod

### Adding lifecycle hooks
- [pod.quote-poststart.yaml](pod.quote-poststart.yaml) - YAML manifest file for the `quote-poststart` pod
- [pod.quote-prestop.yaml](pod.quote-prestop.yaml) - YAML manifest file for the `quote-prestop` pod

### Setting the termination grace period
- [pod.kiada-ssl-shortgraceperiod.yaml](pod.kiada-ssl-shortgraceperiod.yaml) - YAML manifest file for the `kiada-ssl-shortgraceperiod` pod

### Handling the TERM signal in the Kiada application
Building the **`kiada:1.1`** image:
- [Makefile](kiada-0.3-image/Makefile) - contains commands to build and push the image
- [Dockerfile](kiada-0.3-image/Dockerfile) - Docker instructions for building the image
- [app.js](kiada-0.3-image/app.js) - application code (JavaScript)

Deploying the pod:
- [kiada-ssl-v1-1.yaml](kiada-ssl-v1-1.yaml) - Manifest for the `kiada-ssl-v1-1` pod

