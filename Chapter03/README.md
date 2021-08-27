# Kubernetes in Action, 2nd Edition

## Chapter 3. Deploying your first application

### Creating a three-node cluster with the [kind](https://kind.sigs.k8s.io/) tool
- [create-kind-cluster.sh](create-kind-cluster.sh) - script that creates the cluster
- [kind-multi-node.yaml](kind-multi-node.yaml) - configuration file for kind

### Creating the Kiada Deployment and Service
- [create-deployment.sh](create-deployment.sh) - creates a Deployment object that runs the Kiada application 
- [expose-deployment.sh](expose-deployment.sh) - exposes the Kiada application to the world
