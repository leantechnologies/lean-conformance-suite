# Use the official Node.js image as the base image
FROM node:18.19.1-bullseye

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json
COPY package.json ./

# Install Wiretap globally
RUN npm install -g @pb33f/wiretap

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Create a script to run Wiretap, conformance.js, and start the server
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose multiple ports
EXPOSE 9090 9091

# Set the default command to run the script
CMD ["/usr/src/app/entrypoint.sh"]
