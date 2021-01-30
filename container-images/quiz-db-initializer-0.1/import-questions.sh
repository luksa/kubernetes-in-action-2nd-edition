#!/bin/sh

echo "Importing quiz questions from /import/qestions.json into MongoDB"
mongoimport --db kiada --collection questions --file /import/questions.json --jsonArray
echo "Import finished."