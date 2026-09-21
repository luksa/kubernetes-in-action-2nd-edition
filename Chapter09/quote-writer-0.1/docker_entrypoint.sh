#!/bin/sh
trap "exit" INT

INTERVAL=${INTERVAL:-60}
INPUT_FILE=${INPUT_FILE:-/book-quotes.txt}
OUTPUT_FILE=${1:-/var/local/output/quote}

echo "Quote Writer 0.1"
echo "Configured to write quote from ${INPUT_FILE} to $OUTPUT_FILE every $INTERVAL seconds"

while :
do
  echo "$(date) Writing fortune..."
  fortune $INPUT_FILE > $OUTPUT_FILE
  sleep $INTERVAL
done

