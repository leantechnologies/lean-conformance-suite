#!/bin/bash

# Function to display usage help
usage() {
  echo "Usage: $0 [-i ingress.yaml] [-d deployment.yaml] [-s service.yaml]"
  echo "Deploys Kubernetes resources from YAML files."
  echo "Options:"
  echo "  -i  Ingress file (default: ingress.yaml)"
  echo "  -d  Deployment file (default: deployment.yaml)"
  echo "  -s  Service file (default: service.yaml)"
  echo "  -h  Display this help message"
}

# Default values for files
INGRESS_FILE="configs/k8s/lean_conformance_ingress.yaml"
DEPLOYMENT_FILE="configs/k8s/lean_conformance_deployment.yaml"
SERVICE_FILE="configs/k8s/lean_conformance_service.yaml"

# Parse command-line arguments
while getopts "i:d:s:h" option; do
  case $option in
    i) INGRESS_FILE=$OPTARG;;
    d) DEPLOYMENT_FILE=$OPTARG;;
    s) SERVICE_FILE=$OPTARG;;
    h) usage; exit 0;;
    *) usage; exit 1;;
  esac
done

# Check for required tools (kubectl, docker)
for tool in kubectl docker; do
  if ! command -v $tool &> /dev/null; then
    echo "$tool could not be found. Please install $tool to proceed."
    exit 1
  fi
done

# Validate file existence
for file in $INGRESS_FILE $DEPLOYMENT_FILE $SERVICE_FILE; do
 if [ ! -f "$file" ]; then
  echo "Error: File $file not found."
  exit 1
 fi
done

# Apply the Kubernetes resource files
kubectl apply -f $INGRESS_FILE
kubectl apply -f $DEPLOYMENT_FILE
kubectl apply -f $SERVICE_FILE

# Check for deployment status
echo "Waiting for deployment to be ready..."
kubectl rollout status deployment/lean-conformance-service
echo "Deployment complete!"
