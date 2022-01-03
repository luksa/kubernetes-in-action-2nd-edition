package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type HTTPServer struct {
	responseCode int
	responseText string
}

func NewHTTPServer(responseCode int, responseText string) HTTPServer {
	return HTTPServer{
		responseCode: responseCode,
		responseText: responseText,
	}
}

func (s *HTTPServer) handleRequest(res http.ResponseWriter, req *http.Request) {
	res.WriteHeader(s.responseCode)
	_, err := res.Write([]byte(s.responseText))
	if err != nil {
		s.handleInternalError(res, err)
	}
}

func (s *HTTPServer) handleInternalError(res http.ResponseWriter, err error) {
	log.Printf("ERROR: %v", err)
	s.errorResponse(res, http.StatusInternalServerError, err)
}

func (s *HTTPServer) errorResponse(res http.ResponseWriter, statusCode int, err error) {
	res.WriteHeader(statusCode)
	_, _ = fmt.Fprintf(res, "ERROR: %v\n", err.Error())
}

func (s *HTTPServer) ListenAndServe(listenAddress string) {
	router := mux.NewRouter()
	router.Methods("GET").HandlerFunc(s.handleRequest)

	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	http.Handle("/", handlers.CORS(allowedHeaders)(router))
	err := http.ListenAndServe(listenAddress, nil)
	if err != nil {
		panic(err)
	}
}
