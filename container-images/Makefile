PREFIX ?= luksa/

all: image push

image:
	@echo "BUILDING ALL IMAGES"
	@echo "Using image prefix $(PREFIX)"
	@echo ""
	PREFIX=$(PREFIX) make --directory kiada-0.1 image
	PREFIX=$(PREFIX) make --directory kiada-0.2 image
	PREFIX=$(PREFIX) make --directory kiada-0.3 image
	PREFIX=$(PREFIX) make --directory kiada-0.4 image
	PREFIX=$(PREFIX) make --directory kiada-1.0 image
	PREFIX=$(PREFIX) make --directory kiada-ssl-proxy-0.1 image
	PREFIX=$(PREFIX) make --directory init-demo-0.1 image
	PREFIX=$(PREFIX) make --directory quote-writer-0.1 image
	PREFIX=$(PREFIX) make --directory network-connectivity-checker-0.1 image

push:
	@echo "PUSHING ALL IMAGES"
	@echo "Using image prefix $(PREFIX)"
	@echo ""
	PREFIX=$(PREFIX) make --directory kiada-0.1 push
	PREFIX=$(PREFIX) make --directory kiada-0.2 push
	PREFIX=$(PREFIX) make --directory kiada-0.3 push
	PREFIX=$(PREFIX) make --directory kiada-0.4 push
	PREFIX=$(PREFIX) make --directory kiada-1.0 push
	PREFIX=$(PREFIX) make --directory kiada-ssl-proxy-0.1 push
	PREFIX=$(PREFIX) make --directory init-demo-0.1 push
	PREFIX=$(PREFIX) make --directory quote-writer-0.1 push
	PREFIX=$(PREFIX) make --directory network-connectivity-checker-0.1 push
