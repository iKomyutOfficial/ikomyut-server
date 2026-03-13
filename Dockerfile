# Use official Node.js image as the base image
FROM node:18-alpine

# Create and set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port your app runs on
EXPOSE 8080

# Start the app
CMD ["node", "dist/main.js"]
