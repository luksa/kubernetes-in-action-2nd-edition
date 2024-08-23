-include Makefile.overrides
-include ../../env

IMAGE ?= quote-writer:0.1
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

all: gen push

gen:
	strfile book-quotes.txt book-quotes.txt.dat

image:
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push: image
	docker push $(FULL_IMAGE_TAG)

kind-load: image
	kind load docker-image $(FULL_IMAGE_TAG)
