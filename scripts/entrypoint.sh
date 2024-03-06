#!/bin/bash

# Run your conformance.js script
nohup npm run service &

# Run the wiretap command
nohup npm run wiretap &
