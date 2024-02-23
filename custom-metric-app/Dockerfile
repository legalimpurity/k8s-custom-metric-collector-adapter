FROM --platform=linux/amd64 node:18-alpine

RUN apk --no-cache add curl

# Set working directory
WORKDIR /home/node

COPY package*.json .
RUN npm ci

COPY index.js app.js /home/node/

CMD ["node", "index.js"]