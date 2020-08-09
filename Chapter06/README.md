# Kubernetes in Action, 2nd Edition

## Chapter 6. Managing the lifecycle of the Pod's containers


### Adding a liveness probe
- [kubia-liveness.yaml](kubia-liveness.yaml) - YAML manifest file for the `kubia-liveness` pod
- [kubia-liveness-tcp-socket.yaml](kubia-liveness-tcp-socket.yaml) - YAML manifest file for the `kubia-liveness-tcp-socket` pod
- [kubia-liveness-exec.yaml](kubia-liveness-exec.yaml) - YAML manifest file for the `kubia-liveness-exec` pod

### Adding a startup probe
- [kubia-startup-probe.yaml](kubia-startup-probe.yaml) - YAML manifest file for the `kubia-startup-probe` pod

### Adding lifecycle hooks
- [fortune-poststart.yaml](fortune-poststart.yaml) - YAML manifest file for the `fortune-poststart` pod
- [fortune-prestop.yaml](fortune-prestop.yaml) - YAML manifest file for the `fortune-prestop` pod

### Setting the termination grace period
- [kubia-ssl-shortgraceperiod.yaml](kubia-ssl-shortgraceperiod.yaml) - YAML manifest file for the `kubia-ssl-shortgraceperiod` pod

### Handling the TERM signal in the kubia application
Building the **`kubia:1.1`** image:
- [Makefile](kubia-v1-1-image/Makefile) - contains commands to build and push the image
- [Dockerfile](kubia-v1-1-image/Dockerfile) - Docker instructions for building the image
- [app.js](kubia-v1-1-image/app.js) - application code (JavaScript)

Deploying the pod:
- [kubia-ssl-v1-1.yaml](kubia-ssl-v1-1.yaml) - Manifest for the `kubia-ssl-v1-1` pod

