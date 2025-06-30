package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	dbName                  = "kiada"
	collectionQuestions     = "questions"
	collectionPostedAnswers = "responses"
)

type Database struct {
	mongoURI string
}

func NewDatabase(mongoURI string) Database {
	return Database{
		mongoURI: mongoURI,
	}
}

func (db *Database) Connect() (*Connection, error) {
	clientOptions := options.Client().ApplyURI(db.mongoURI)

	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, fmt.Errorf("could not connect to mongo: %v", err)
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, fmt.Errorf("connected to mongo, but couldn't execute the ping command: %v", err)
	}

	return &Connection{client: client}, nil
}

type Connection struct {
	client *mongo.Client
}

func (c *Connection) Close() {
	// Close the connection once no longer needed
	err := c.client.Disconnect(context.TODO())
	if err != nil {
		log.Fatal(err)
	}
}

func (c *Connection) GetQuestion(id int) (Question, bool, error) {

	collection := c.client.Database(dbName).Collection(collectionQuestions)

	filter := bson.D{{"id", id}}

	var result Question
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return result, false, nil
		}
		return result, false, err
	}
	return result, true, err
}

func (c *Connection) GetRandomQuestion() (Question, bool, error) {
	collection := c.client.Database(dbName).Collection(collectionQuestions)

	// use $sample to select random document
	sample := bson.D{{"$sample", bson.D{{"size", 1}}}}

	var result Question
	cur, err := collection.Aggregate(context.TODO(), mongo.Pipeline{sample})
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return result, false, nil
		}
		return result, false, err
	}
	defer func() {
		_ = cur.Close(context.TODO())
	}()

	if cur.Next(context.TODO()) {
		err := cur.Decode(&result)
		if err != nil {
			return result, true, err
		}
		return result, true, nil
	}
	return result, false, cur.Err()
}

func (c *Connection) InsertAnswer(answer Answer) error {
	collection := c.client.Database(dbName).Collection(collectionPostedAnswers)

	// Insert a single document
	result, err := collection.InsertOne(context.TODO(), answer)
	if err != nil {
		return err
	}
	log.Println("Inserted answer with internal ID ", result.InsertedID)
	return nil
}

func (c *Connection) examples() {

	collection := c.client.Database(dbName).Collection(collectionQuestions)

	// Finding multiple documents returns a cursor
	findOptions := options.Find()
	findOptions.SetLimit(2)
	var results []*Question
	cur, err := collection.Find(context.TODO(), bson.D{{}}, findOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer cur.Close(context.TODO())

	// Iterate through the cursor
	for cur.Next(context.TODO()) {
		var elem Question
		err := cur.Decode(&elem)
		if err != nil {
			log.Fatal(err)
		}
		results = append(results, &elem)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Found multiple documents (array of pointers): %+v\n", results)
}
