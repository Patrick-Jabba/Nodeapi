## ----POSTGRES
docker run --name postgres -e POSTGRES_USER=usuario -e POSTGRES_PASSWORD=minhasenhasecreta -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

docker ps (lista os containers ativos) docker ps -a lista todos on ou off / docker stop containerID ou nome do container / docker start containerID ou nome do container / docker image ls lista as imagens existentes / docker rmi nome do repository ou imageID para remover a imagem da maquina

## ----ADMINER
docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

## -----MONGO DB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=minhasenhasecreta -d mongo:4

docker run --mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'patrick', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"