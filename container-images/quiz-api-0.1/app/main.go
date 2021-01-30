package main

import (
	"log"
	"os"
)


func main() {
	log.Printf("Quiz API Server 0.1 starting...")

	listenAddress := getConfigOption("listen-address", "LISTEN_ADDRESS", ":8080")
	mongoAddress := getConfigOption("mongo-address", "MONGO_ADDRESS", "mongodb://127.0.0.1:27017")

	log.Printf("Listen address:  %q", listenAddress)
	log.Printf("MongoDB address: %q", mongoAddress)

	db := NewDatabase(mongoAddress)

	log.Printf("Checking if MongoDB is reachable...")
	conn, err := db.Connect()
	if err != nil {
		log.Fatalf("Could not connect to MongoDB: %v", err)
	}
	conn.Close()
	log.Printf("MongoDB connection check succeeded!")

	log.Printf("Starting HTTP server...")
	server := NewHTTPServer(db)
	server.ListenAndServe(listenAddress)
}

func getConfigOption(argName string, envVarName string, defaultValue string) string {
	// TODO
	value := os.Getenv(envVarName)
	if value != "" {
		return value
	}
	return defaultValue
}


