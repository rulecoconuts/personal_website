FROM golang:alpine3.19
# ENV PATH="/usr/local/go/bin:${PATH}"

WORKDIR /backend
COPY ./backend/go.mod ./backend/go.sum ./
# Install go depedencies as part of the build process
RUN --mount=type=cache,target=/usr/local/go/pkg/mod go mod download && go mod verify
COPY ./backend .
RUN go build

FROM node:alpine3.19
WORKDIR /main
COPY --from=0 /backend/personal_website_backend ./personal_website_backend

COPY package.json ./
RUN npm i

COPY . .

CMD [ "sh", "docker_entrypoint.sh" ]
EXPOSE 5000 7000