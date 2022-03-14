package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type HTTPServer struct {
	nodeInfo NodeInfo
}

func NewHTTPServer(nodeInfo NodeInfo) HTTPServer {
	return HTTPServer{nodeInfo: nodeInfo}
}

func (s *HTTPServer) handleRoot(res http.ResponseWriter, req *http.Request) {
	nodeName := os.Getenv("NODE_NAME")
	if nodeName == "" {
		// fallback to hostname when NODE_NAME env var isn't set
		var err error
		nodeName, err = os.Hostname()
		if err != nil {
			s.handleInternalError(res, err)
		}
	}

	uptime, err := s.nodeInfo.Uptime()
	if err != nil {
		log.Print(err)
	}
	loadAverage, err := s.nodeInfo.LoadAverage()
	if err != nil {
		log.Print(err)
	}

	res.WriteHeader(http.StatusOK)
	_, err = res.Write([]byte(fmt.Sprintf("%s uptime: %s, load average: %s", nodeName, uptime, loadAverage)))
	if err != nil {
		s.handleInternalError(res, err)
	}
}

func (s *HTTPServer) handleInternalError(res http.ResponseWriter, err error) {
	log.Printf("INTERNAL ERROR: %v", err)
	s.errorResponse(res, http.StatusInternalServerError, err)
}

func (s *HTTPServer) errorResponse(res http.ResponseWriter, statusCode int, err error) {
	res.WriteHeader(statusCode)
	_, _ = fmt.Fprintf(res, "ERROR: %v\n", err.Error())
}

func (s *HTTPServer) ListenAndServe(listenAddress string) {
	router := mux.NewRouter()
	router.Methods("GET").Path("/").HandlerFunc(s.handleRoot)

	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})

	http.Handle("/", handlers.CORS(allowedHeaders)(router))
	err := http.ListenAndServe(listenAddress, nil)
	if err != nil {
		panic(err)
	}
}
