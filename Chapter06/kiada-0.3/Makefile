-include Makefile.overrides
-include ../../env

IMAGE ?= kiada:0.3
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

all: push

image:
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push: image
	docker push $(FULL_IMAGE_TAG)

kind-load: image
	kind load docker-image $(FULL_IMAGE_TAG)

run: kind-load
	kubectl delete po kiada --force ; ../../scripts/apply.sh ../pod.kiada.yaml && kubectl wait --timeout=30s --for=condition=Ready pod/kiada && kubectl port-forward kiada 8080
