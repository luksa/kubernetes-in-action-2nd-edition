-include Makefile.overrides

IMAGE ?= quiz-api:0.2
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

PLATFORM=linux

all: build image push

build:
	@echo "Building go binaries"
	@DOCKER_BUILDKIT=1 docker build app/ --target bin --output app/bin/ --platform ${PLATFORM}

image:
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push:
	docker push $(FULL_IMAGE_TAG)
