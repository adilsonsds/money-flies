# Stage 1: Build Stage
FROM node:22 AS build-stage

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app to the container
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Stage 2: Serve Stage
FROM nginx:stable-alpine AS production-stage

# Copy the built files from the previous stage to the Nginx html directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]