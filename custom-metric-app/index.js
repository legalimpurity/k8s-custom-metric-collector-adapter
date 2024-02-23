const http = require('http');
const app = require('./app');

const HTTP_PORT = 8080;

const httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, () => {
  console.log('server listening on', httpServer.address().port);
});