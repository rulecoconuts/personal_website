FROM node:alpine3.19
COPY --from=golang:alpine3.19 /usr/local/go /usr/local/go
ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /main

COPY . .

WORKDIR /main/backend

# Install go depedencies as part of the build process
RUN go mod download && go mod verify

RUN go build

WORKDIR /main

RUN npm i

VOLUME [ "/main/node_modules" ]

CMD [ "sh", "docker_entrypoint.sh" ]

