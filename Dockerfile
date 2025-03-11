# Step 1: Use the official Node.js 23.6.1 image as a base
FROM --platform=linux/amd64 node:23.6.1-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install react-day-picker date-fns pg

# Copy the rest of your app's source code
COPY . .

# Set environment variables for static export
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Update next.config.js to enable static export and ignore TypeScript errors
RUN echo "module.exports = { output: 'export', typescript: { ignoreBuildErrors: true } };" > next.config.js

# Build the Next.js application with static export
RUN npm run build

# Step 2: Use nginx to serve static files
FROM --platform=linux/amd64 nginx:alpine

# Copy the static files from builder stage
COPY --from=builder /app/out /usr/share/nginx/html

COPY .env .env

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


