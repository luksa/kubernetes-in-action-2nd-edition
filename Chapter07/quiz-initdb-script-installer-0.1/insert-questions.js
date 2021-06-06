db.getSiblingDB("kiada").questions.insertMany(
[{
    "id": 1,
    "text": "First question",
    "correctAnswerIndex": 0,
    "answers": [
        "First answer",
        "Second answer",
        "Third answer"
    ]
},
{
    "id": 2,
    "text": "Second question",
    "correctAnswerIndex": 1,
    "answers": [
        "First answer",
        "Second answer",
        "Third answer",
        "Fourth answer"
    ]
},
{
    "id": 3,
    "text": "Third question",
    "correctAnswerIndex": 2,
    "answers": [
        "First answer",
        "Second answer",
        "Third answer",
        "Fourth answer",
        "Fifth answer"
    ]
}]
);