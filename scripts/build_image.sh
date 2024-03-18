#!/bin/bash

# Customizable variables
IMAGE_NAME="lean-conformance-service"
DOCKERFILE_PATH="./Dockerfile"
VERSION="1.0.0" # modify this on each new change

# Build the Docker image with the version tag
docker build -t $IMAGE_NAME:$VERSION -f $DOCKERFILE_PATH .

# Display success message
echo "Docker image built successfully with tag: $IMAGE_NAME:$VERSION"
