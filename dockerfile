# Use the official Node.js image as the base image
FROM node:18-bullseye

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Wiretap globally
RUN npm install -g @pb33f/wiretap

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Create a script to run Wiretap, conformance.js, and start the server
COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose the port your app runs on
EXPOSE 3000

# Set the default command to run the script
CMD ["/usr/src/app/scripts/entrypoint.sh"]
