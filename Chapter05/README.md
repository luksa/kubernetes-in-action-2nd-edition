# Kubernetes in Action, 2nd Edition

## Chapter 5. Running applications in Pods


### Creating the pod manifest for the kubia application
- [kubia.yaml](kubia.yaml) - YAML manifest file for the `kubia` pod

### Modifying the application to read from standard input
Building the **`kubia:1.0-stdin`** image:
- [Makefile](kubia-stdin-image/Makefile) - contains commands to build and push the image
- [Dockerfile](kubia-stdin-image/Dockerfile) - Docker instructions for building the image
- [app.js](kubia-stdin-image/app.js) - application code (JavaScript)

Deploying the pod:
- [kubia-stdin.yaml](kubia-stdin.yaml) - manifest for the `kubia-stdin` pod
- [kubia-stdin-once.yaml](kubia-stdin-once.yaml) - manifest for the `kubia-stdin-once` pod, which uses `stdinOnce: true`
- [kubia-stdin-tty.yaml](kubia-stdin-tty.yaml) - manifest for the `kubia-stdin-tty` pod, which uses `tty: true`

### Adding the Envoy proxy container to the kubia pod
Building the **`kubia-ssl-proxy:1.0`** image:
- [Makefile](kubia-ssl-proxy-image/Makefile) - contains commands to build and push the image
- [Dockerfile](kubia-ssl-proxy-image/Dockerfile) - Docker instructions for building the image
- [envoy.yaml](kubia-ssl-proxy-image/envoy.yaml) - Envoy proxy configuration file
- [example-com.crt](kubia-ssl-proxy-image/example-com.crt) - Server certificate used by Envoy
- [example-com.key](kubia-ssl-proxy-image/example-com.key) - Private key used by Envoy

Deploying the pod:
- [kubia-ssl.yaml](kubia-ssl.yaml) - Manifest for the `kubia-ssl` pod


### Creating a pod with init containers
Building the **`init-demo:1.0`** image:
- [Makefile](init-demo-image/Makefile) - contains commands to build and push the image
- [Dockerfile](init-demo-image/Dockerfile) - Docker instructions for building the image
- [docker_entrypoint.sh](init-demo-image/docker_entrypoint.sh) - Shell script that runs in the container

Building the **`network-connectivity-checker:1.0`** image:
- [Makefile](network-connectivity-checker-image/Makefile) - contains commands to build and push the image
- [Dockerfile](network-connectivity-checker-image/Dockerfile) - Docker instructions for building the image
- [docker_entrypoint.sh](network-connectivity-checker-image/docker_entrypoint.sh) - Shell script that runs in the container

Deploying the pod:
- [kubia-init.yaml](kubia-init.yaml) - Manifest for the `kubia-init` pod
- [kubia-init-slow.yaml](kubia-init-slow.yaml) - Manifest for the `kubia-init-slow` pod, whose init container takes 60s to start
