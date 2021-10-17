-include Makefile.overrides

IMAGE ?= kiada:0.1
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

all: image push

image:
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push:
	docker push $(FULL_IMAGE_TAG)

luksa-run:
	PREFIX=luksa/ make build push && k delete po kiada --force --grace-period 0 ; k apply -f ../../Chapter05/kiada.pod.yaml && k wait --for=condition=Ready pod/kiada && k port-forward kiada 8080
