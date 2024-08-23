-include Makefile.overrides
-include ../../env

IMAGE ?= static-http-server:0.1
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

PLATFORM=linux/amd64

all: push

build:
	@echo "Building go binaries"
	@DOCKER_BUILDKIT=1 docker build app/ --target bin --output app/bin/ --platform ${PLATFORM}

image: build
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push: image
	docker push $(FULL_IMAGE_TAG)

kind-load: image
	kind load docker-image $(FULL_IMAGE_TAG)
