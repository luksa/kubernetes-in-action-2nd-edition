IMAGE ?= init-demo:1.0
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

build:
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push:
	docker push $(FULL_IMAGE_TAG)