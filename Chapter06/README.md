# Kubernetes in Action, 2nd Edition

## Chapter 6. Managing the lifecycle of the Pod's containers


### Adding a liveness probe
- [kiada-liveness.yaml](kiada-liveness.yaml) - YAML manifest file for the `kiada-liveness` pod
- [kiada-liveness-tcp-socket.yaml](kiada-liveness-tcp-socket.yaml) - YAML manifest file for the `kiada-liveness-tcp-socket` pod
- [kiada-liveness-exec.yaml](kiada-liveness-exec.yaml) - YAML manifest file for the `kiada-liveness-exec` pod

### Adding a startup probe
- [kiada-startup-probe.yaml](kiada-startup-probe.yaml) - YAML manifest file for the `kiada-startup-probe` pod

### Adding lifecycle hooks
- [quote-poststart.pod.yaml](quote-poststart.pod.yaml) - YAML manifest file for the `quote-poststart` pod
- [quote-prestop.pod.yaml](quote-prestop.pod.yaml) - YAML manifest file for the `quote-prestop` pod

### Setting the termination grace period
- [kiada-ssl-shortgraceperiod.yaml](kiada-ssl-shortgraceperiod.yaml) - YAML manifest file for the `kiada-ssl-shortgraceperiod` pod

### Handling the TERM signal in the Kiada application
Building the **`kiada:1.1`** image:
- [Makefile](kiada-0.3-image/Makefile) - contains commands to build and push the image
- [Dockerfile](kiada-0.3-image/Dockerfile) - Docker instructions for building the image
- [app.js](kiada-0.3-image/app.js) - application code (JavaScript)

Deploying the pod:
- [kiada-ssl-v1-1.yaml](kiada-ssl-v1-1.yaml) - Manifest for the `kiada-ssl-v1-1` pod

