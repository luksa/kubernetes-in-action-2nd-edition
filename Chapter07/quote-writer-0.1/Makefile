-include ../Makefile.overrides
-include Makefile.overrides

IMAGE ?= quote-writer:0.1
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

all: image push

image:
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push:
	docker push $(FULL_IMAGE_TAG)