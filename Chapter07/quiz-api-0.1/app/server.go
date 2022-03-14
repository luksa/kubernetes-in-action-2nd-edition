package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type HTTPServer struct {
	db Database
}

func NewHTTPServer(db Database) HTTPServer {
	return HTTPServer{
		db: db,
	}
}

func (s *HTTPServer) handleRoot(res http.ResponseWriter, req *http.Request) {
	hostname, err := os.Hostname()
	if err != nil {
		s.handleInternalError(res, err)
	}
	res.WriteHeader(http.StatusOK)
	_, err = res.Write([]byte(fmt.Sprintf("This is the quiz service running in pod %s\n", hostname)))
	if err != nil {
		s.handleInternalError(res, err)
	}
}

func (s *HTTPServer) handleReadiness(res http.ResponseWriter, req *http.Request) {
	conn, err := s.db.Connect()
	if err != nil {
		s.handleInternalError(res, err)
		return
	}
	defer conn.Close()

	res.WriteHeader(http.StatusOK)
	_, err = res.Write([]byte("Readiness check successful"))
	if err != nil {
		s.handleInternalError(res, err)
	}
}

func (s *HTTPServer) handleGetQuestion(res http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	id := params["questionID"]
	log.Printf("Received request for question %s", id)

	conn, err := s.db.Connect()
	if err != nil {
		s.handleInternalError(res, err)
		return
	}
	defer conn.Close()

	var question Question
	var found bool
	if id == "random" {
		question, found, err = conn.GetRandomQuestion()
	} else {
		questionID, err := strconv.Atoi(params["questionID"])
		if err != nil {
			s.handleClientError(res, err)
			return
		}
		question, found, err = conn.GetQuestion(questionID)
	}
	if err != nil {
		s.handleInternalError(res, err)
		return
	} else if !found {
		s.errorResponse(res, http.StatusNotFound, fmt.Errorf("Question %s not found", id))
		return
	}

	log.Printf("Question: %v", question)

	encoder := json.NewEncoder(res)
	err = encoder.Encode(question)
	if err != nil {
		s.handleInternalError(res, err)
		return
	}
}

func (s *HTTPServer) handlePostAnswer(res http.ResponseWriter, req *http.Request) {
	params := mux.Vars(req)
	questionID, err := strconv.Atoi(params["questionID"])
	if err != nil {
		s.handleClientError(res, err)
		return
	}
	log.Printf("Received answer to question %d", questionID)

	answer := Answer{}
	decoder := json.NewDecoder(req.Body)
	err = decoder.Decode(&answer)
	if err != nil {
		s.handleClientError(res, err)
		return
	}
	if questionID != answer.QuestionID {
		s.handleClientError(res, fmt.Errorf("questionId in payload doesn't match id in URL"))
		return
	}
	conn, err := s.db.Connect()
	if err != nil {
		s.handleInternalError(res, err)
		return
	}
	defer conn.Close()

	question, found, err := conn.GetQuestion(questionID)
	if err != nil {
		s.handleInternalError(res, err)
		return
	} else if !found {
		s.handleInternalError(res, err)
		return
	}

	answer.Timestamp = time.Now().Truncate(time.Microsecond)
	answer.CorrectAnswerIndex = question.CorrectAnswerIndex
	answer.Correct = answer.AnswerIndex == question.CorrectAnswerIndex

	log.Printf("Answer: %v", answer)

	err = conn.InsertAnswer(answer)
	if err != nil {
		s.handleInternalError(res, err)
		return
	}

	answer.CorrectAnswerIndex = question.CorrectAnswerIndex

	encoder := json.NewEncoder(res)
	err = encoder.Encode(answer)
	if err != nil {
		s.handleInternalError(res, err)
		return
	}
}

func (s *HTTPServer) handleInternalError(res http.ResponseWriter, err error) {
	log.Printf("INTERNAL ERROR: %v", err)
	s.errorResponse(res, http.StatusInternalServerError, err)
}

func (s *HTTPServer) handleClientError(res http.ResponseWriter, err error) {
	s.errorResponse(res, http.StatusBadRequest, err)
}

func (s *HTTPServer) errorResponse(res http.ResponseWriter, statusCode int, err error) {
	res.WriteHeader(statusCode)
	_, _ = fmt.Fprintf(res, "ERROR: %v\n", err.Error())
}

func (s *HTTPServer) ListenAndServe(listenAddress string) {
	router := mux.NewRouter()
	router.Methods("GET").Path("/").HandlerFunc(s.handleRoot)
	router.Methods("GET").Path("/healthz/ready").HandlerFunc(s.handleReadiness)
	router.Methods("GET").Path("/questions/{questionID:[0-9]+|random}").HandlerFunc(s.handleGetQuestion)
	router.Methods("POST").Path("/questions/{questionID:[0-9]+}/answers").HandlerFunc(s.handlePostAnswer)

	allowedHeaders := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type"})
	// originsOk := handlers.AllowedOrigins([]string{getConfigOption("--cors-allowed-origins", "CORS_ALLOWED_ORIGINS", "*"})
	// methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})

	http.Handle("/", handlers.CORS(allowedHeaders)(router))
	// http.Handle("/", handlers.CORS(originsOk, allowedHeaders, methodsOk)(router))
	err := http.ListenAndServe(listenAddress, nil)
	if err != nil {
		panic(err)
	}
}
