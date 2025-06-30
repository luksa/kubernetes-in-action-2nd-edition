package main

import "time"

type Question struct {
	ID                 int      `json:"id" bson:"id"`
	Text               string   `json:"text" bson:"text"`
	CorrectAnswerIndex int      `json:"correctAnswerIndex" bson:"correctAnswerIndex"`
	Answers            []string `json:"answers" bson:"answers"`
}

type Answer struct {
	Timestamp          time.Time `json:"timestamp" bson:"timestamp"`
	QuestionID         int       `json:"questionId" bson:"questionId"`
	AnswerIndex        int       `json:"answerIndex" bson:"answerIndex"`
	CorrectAnswerIndex int       `json:"correctAnswerIndex"`
	Correct            bool      `json:"correct" bson:"correct"`
}
