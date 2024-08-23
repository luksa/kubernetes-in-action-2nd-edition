-include ../env

directories := init-demo-0.1 kiada-0.1 kiada-0.2 kiada-0.3 kiada-0.4 \
 kiada-0.5 kiada-0.6 kiada-0.7 kiada-0.8 kiada-0.9 kiada-ssl-proxy-0.1 \
 network-connectivity-checker-0.1 node-agent-0.1 quiz-api-0.1 quiz-api-0.2 \
 quiz-initdb-script-installer-0.1 quote-writer-0.1 static-http-server

all: push

image:
	@echo "BUILDING ALL IMAGES"
	@echo "Using image prefix $(PREFIX)"
	@echo ""
	for directory in $(directories) ; do \
		PREFIX=$(PREFIX) make --directory $$directory image ; \
	done

push:
	@echo "PUSHING ALL IMAGES"
	@echo "Using image prefix $(PREFIX)"
	@echo ""
	for directory in $(directories) ; do \
		PREFIX=$(PREFIX) make --directory $$directory push ; \
	done

kind-load:
	@echo "PUSHING ALL IMAGES TO KIND CLUSTER"
	@echo "Using image prefix $(PREFIX)"
	@echo ""
	for directory in $(directories) ; do \
		PREFIX=$(PREFIX) make --directory $$directory kind-load ; \
	done
