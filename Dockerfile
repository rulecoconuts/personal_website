FROM golang:alpine3.19 as go_build
# ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /backend
COPY ./backend/go.mod ./backend/go.sum ./
# Install go depedencies as part of the build process
RUN --mount=type=cache,target=/usr/local/go/pkg/mod go mod download && go mod verify
COPY ./backend .
RUN go build

FROM node:alpine3.19 as node_run
WORKDIR /main
COPY package.json ./
RUN npm i

COPY . .
RUN rm -rf ./backend/*
COPY --from=go_build /backend/personal_website_backend ./backend/personal_website_backend

CMD [ "sh", "docker_entrypoint.sh" ]

