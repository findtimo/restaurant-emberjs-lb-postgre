# Use the official Node.js 12 image.
# Check if Loopback 3 requires a different version.
FROM node:12

# Create and define the node_modules's cache directory.
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json and package-lock.json
COPY package*.json ./

# If you have native dependencies, you'll need extra tools
RUN npm install

# Bundle app source
COPY . .

# Copy the entrypoint script
COPY entrypoint.sh /usr/src/app/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/src/app/entrypoint.sh

# Expose the port the app runs on
EXPOSE 8080

# Set the entrypoint script to be executed
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
