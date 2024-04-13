#!/bin/bash

IMAGE_NAME="cyber-sage-image"
CONTAINER_NAME="cyber-sage-container"

EXISTING_CONTAINER=$(docker ps -aq -f name=^${CONTAINER_NAME}$)
if [ ! -z "$EXISTING_CONTAINER" ]; then
    echo "Stopping and removing existing container..."
    docker stop ${CONTAINER_NAME}
    docker rm ${CONTAINER_NAME}
else
    echo "No existing container to remove."
fi

EXISTING_IMAGE=$(docker images -q ${IMAGE_NAME})
if [ ! -z "$EXISTING_IMAGE" ]; then
    echo "Removing existing image..."
    docker rmi ${IMAGE_NAME}
else
    echo "No existing image to remove."
fi

echo "Building new Docker image..."
docker build -t ${IMAGE_NAME} .

echo "Running new container..."
docker run -d --name ${CONTAINER_NAME} -e DISCORD_TOKEN='YourBotTokenHere' ${IMAGE_NAME}

echo "Container is running."
