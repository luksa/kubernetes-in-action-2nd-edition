FROM busybox
COPY insert-questions.js /
CMD cp /insert-questions.js /initdb.d/ \
    && echo "Successfully copied insert-questions.js to /initdb.d" \
    || echo "Error copying insert-questions.js to /initdb.d"
