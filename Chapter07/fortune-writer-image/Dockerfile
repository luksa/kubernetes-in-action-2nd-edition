FROM alpine
RUN apk add fortune
COPY docker_entrypoint.sh /docker_entrypoint.sh
VOLUME /var/local/output
ENTRYPOINT ["/docker_entrypoint.sh"]

