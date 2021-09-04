FROM node:16
COPY app.js /app.js
COPY html/ /html

ENV POD_NAME unknown
ENV POD_IP unknown
ENV NODE_NAME unknown
ENV NODE_IP unknown

ENTRYPOINT ["node", "app.js"]
CMD ["--listen-port", "8080"]
