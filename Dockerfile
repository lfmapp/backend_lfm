FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the application port
ENV PORT=8080
EXPOSE 8080

# Start the application
CMD ["node", "server.js"]
