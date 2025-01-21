docker build -t cybersage .

docker run -d \
--name cybersage \
-e TOKEN= \
cybersage

sleep 2

docker logs cybersage
