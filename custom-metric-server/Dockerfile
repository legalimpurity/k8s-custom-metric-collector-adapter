FROM --platform=linux/amd64 node:18-alpine

# Set working directory
WORKDIR /home/node

COPY package*.json .
RUN npm ci

COPY . /home/node/

CMD ["node", "index.js"]