#!/bin/bash

# Run your service in the background
nohup npm run service &
PID1=$!

# Run the wiretap command in the background
nohup npm run wiretap &
PID2=$!

# Wait for any of the background processes to finish, keeping the container alive
wait $PID1 $PID2
