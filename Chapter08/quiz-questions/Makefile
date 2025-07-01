-include Makefile.overrides
-include ../../env

IMAGE ?= quiz-questions:latest
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

all: push

image:
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push: image
	docker push $(FULL_IMAGE_TAG)

kind-load: image
	kind load docker-image $(FULL_IMAGE_TAG)
