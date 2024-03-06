#!/bin/bash

# Define the path to your Kubernetes configuration files
K8S_CONFIG_PATH="configs/k8s"

# Deploy the conformance suite
echo "Deploying lean conformance suite"
kubectl apply -f $K8S_CONFIG_PATH/lean_conformance_deployment.yaml

# Deploy the conformance suite
echo "Deploying lean conformance service..."
kubectl apply -f $K8S_CONFIG_PATH/lean_conformance_service.yaml