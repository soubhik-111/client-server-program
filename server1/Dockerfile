# Setup environment
FROM node:20-alpine

# Set Working directory
WORKDIR /server1

# Copy package.json
COPY package*.json .

# Install dependencies
RUN npm install

# Copy all data
COPY . .

# Expose the port
EXPOSE 3001

# Command to start
CMD [ "npm" , "start" ]