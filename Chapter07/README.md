# Kubernetes in Action, 2nd Edition

## Chapter 7. Mounting storage volumes into the Pod's containers


### Fortune pod with or without a volume
- [fortune-no-volume.yaml](fortune-no-volume.yaml) - YAML manifest file for the `fortune-no-volume` pod
- [fortune-emptydir.yaml](fortune-emptydir.yaml) - YAML manifest file for the `fortune-emptydir` pod with an emptyDir volume
- [fortune.yaml](fortune.yaml) - YAML manifest file for the `fortune` pod with two containers that share a volume

### MongoDB pod with external volume
- [mongodb-pod-gcepd.yaml](mongodb-pod-gcepd.yaml) - YAML manifest file for the `mongodb` pod using a GCE Persistent Disk volume
- [mongodb-pod-aws.yaml](mongodb-pod-aws.yaml) - YAML manifest file for the `mongodb` pod using an AWS Elastic Block Store volume
- [mongodb-pod-nfs.yaml](mongodb-pod-nfs.yaml) - YAML manifest file for the `mongodb` pod using an NFS volume
- [mongodb-pod-hostpath.yaml](mongodb-pod-hostpath.yaml) - YAML manifest file for the `mongodb` pod using a hostPath volume (for use in _Minikube_)
- [mongodb-pod-hostpath-kind.yaml](mongodb-pod-hostpath-kind.yaml) - YAML manifest file for the `mongodb` pod using a hostPath volume (for use in _kind_)

### Using a hostPath volume
- [node-explorer.yaml](node-explorer.yaml) - YAML manifest file for the `node-explorer` pod
- [node-explorer-directory.yaml](node-explorer-directory.yaml) - YAML manifest file for the `node-explorer` pod with the hostPath volume type set to Directory

