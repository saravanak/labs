# Build Stage
FROM lacion/alpine-golang-buildimage:1.13 AS build-stage

LABEL app="build-dstr"
LABEL REPO="https://github.com/saravanak/dstr"

ENV PROJPATH=/go/src/github.com/saravanak/dstr

# Because of https://github.com/docker/docker/issues/14914
ENV PATH=$PATH:$GOROOT/bin:$GOPATH/bin

ADD . /go/src/github.com/saravanak/dstr
WORKDIR /go/src/github.com/saravanak/dstr

RUN make build-alpine

# Final Stage
FROM lacion/alpine-base-image:latest

ARG GIT_COMMIT
ARG VERSION
LABEL REPO="https://github.com/saravanak/dstr"
LABEL GIT_COMMIT=$GIT_COMMIT
LABEL VERSION=$VERSION

# Because of https://github.com/docker/docker/issues/14914
ENV PATH=$PATH:/opt/dstr/bin

WORKDIR /opt/dstr/bin

COPY --from=build-stage /go/src/github.com/saravanak/dstr/bin/dstr /opt/dstr/bin/
RUN chmod +x /opt/dstr/bin/dstr

# Create appuser
RUN adduser -D -g '' dstr
USER dstr

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

CMD ["/opt/dstr/bin/dstr"]
