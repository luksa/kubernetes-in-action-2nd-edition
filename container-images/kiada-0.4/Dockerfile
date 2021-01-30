FROM node:12
COPY app.js /app.js
COPY html/ /html

ENV INITIAL_STATUS_MESSAGE=""

ENTRYPOINT ["node", "app.js"]
CMD ["--listen-port", "8080"]
