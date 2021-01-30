FROM mongo
COPY questions.json /import/
COPY import-questions.sh /docker-entrypoint-initdb.d/

# replace last line with echo to prevent mongod from starting after dbinit is complete
RUN sed -i '$ s/.*/echo "Quiz DB init complete."/g' /usr/local/bin/docker-entrypoint.sh

