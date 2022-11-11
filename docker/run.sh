docker network create \
  --driver=bridge \
  --subnet=172.3.0.0/16 \
  --ip-range=172.3.0.0/24 \
  urlshortenernetwork

docker build -t urlshortener:databaselayer \
  --build-arg db_host=localhost \
  --build-arg db_port=3306 \
  --build-arg  db_user=root \
  --build-arg db_password=password \
  --build-arg db_name=urlshortenerservice \
  --no-cache -f ./docker/databaseDockerfile .

docker run -i -t -d --name databasecontainer \
  --network=urlshortenernetwork \
  --ip 172.3.0.10 \
  --privileged urlshortener:databaselayer