
if [[ "$1" == *"build"* ]]
then
    docker compose -f dev.docker-compose.yml build
fi

docker compose -f dev.docker-compose.yml up
