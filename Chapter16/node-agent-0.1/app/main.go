package main

import (
	"log"

	flag "github.com/spf13/pflag"
)

func main() {
	log.Printf("Kiada Node Agent 0.1 starting...")

	listenAddress := flag.String("listen-address", ":80", "The address that the server should bind to")
	flag.Parse()

	log.Printf("Listen address:  %q", *listenAddress)

	log.Printf("Starting HTTP server...")
	nodeInfo := NewNodeInfo()
	server := NewHTTPServer(nodeInfo)
	server.ListenAndServe(*listenAddress)
}
