-include Makefile.overrides

IMAGE ?= quiz-db-initializer:0.1
FULL_IMAGE_TAG = "$(PREFIX)$(IMAGE)"

all: image push

image:
	@echo "Building image $(FULL_IMAGE_TAG)"
	docker build -t $(FULL_IMAGE_TAG) ./

push:
	docker push $(FULL_IMAGE_TAG)

run:
	docker run -it --name mongo $(FULL_IMAGE_TAG)

deploy:
	kubectl apply -f ../../Chapter08/pvc.quiz-data.dynamic.yaml
	kubectl apply -f ../../Chapter08/pod.quiz-db-initializer.yaml
