package main

import (
	"log"

	flag "github.com/spf13/pflag"
)

func main() {
	log.Printf("Quiz API Server 0.2 starting...")

	listenAddress := flag.String("listen-address", ":8080", "The address that the server should bind to")
	mongoAddress := flag.String("mongo-address", "mongodb://127.0.0.1:27017", "The address of the MongoDB service")
	flag.Parse()

	log.Printf("Listen address:  %q", *listenAddress)
	log.Printf("MongoDB address: %q", *mongoAddress)

	db := NewDatabase(*mongoAddress)

	log.Printf("Starting HTTP server...")
	server := NewHTTPServer(db)
	server.ListenAndServe(*listenAddress)
}
