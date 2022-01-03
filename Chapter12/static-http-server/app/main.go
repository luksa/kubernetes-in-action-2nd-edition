package main

import (
	"log"
	"net/http"

	"github.com/spf13/pflag"
)


func main() {
	var listenAddress string
	var responseCode int
	var responseText string

	pflag.StringVar(&listenAddress, "listen-address", ":8080", "The address the server should listen on.")
	pflag.IntVar(&responseCode, "response-code", http.StatusOK, "The HTTP response code that the server should return for all requests.")
	pflag.StringVar(&responseText, "response-text", "OK", "The string that the server should return in the HTTP response.")
	pflag.Parse()

	log.Printf("Static HTTP Server 0.1 starting...")
	log.Printf("Listen address:  %q", listenAddress)
	log.Printf("Response: %d %s", responseCode, responseText)

	server := NewHTTPServer(responseCode, responseText)
	server.ListenAndServe(listenAddress)
}
