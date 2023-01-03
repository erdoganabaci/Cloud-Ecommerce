docker pull postgres
docker run --name postgres_Cloud -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -p 5432:5432 postgres
