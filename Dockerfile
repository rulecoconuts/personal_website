# syntax=docker/dockerfile:1.7-labs

FROM golang:alpine3.19 as go_build
# ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /backend
COPY ./backend/go.mod ./backend/go.sum ./
# Install go depedencies as part of the build process
RUN --mount=type=cache,target=/usr/local/go/pkg/mod go mod download && go mod verify
COPY ./backend .
RUN go build

# node dependency installation and build step
FROM node:20-alpine3.19 as node_build
WORKDIR /main

COPY package.json ./
RUN npm install

COPY --exclude=*.go . .
RUN npm run build

# main container
FROM node:20-alpine3.19 as main
WORKDIR /main
COPY --from=go_build /backend/personal_website_backend ./personal_website_backend
COPY --from=node_build /main .

CMD [ "sh", "docker_entrypoint.sh" ]
EXPOSE 5000