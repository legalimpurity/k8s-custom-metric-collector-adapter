const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path')

const app = require('./app');

const HTTP_PORT = 8080;
const HTTPS_PORT = 8443;

/** @type {https.ServerOptions} */
const secureOptions = {
  key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(secureOptions, app);

httpServer.listen(HTTP_PORT, () => {
  console.log('http-server listening on', httpServer.address().port);
});
httpsServer.listen(HTTPS_PORT, () => {
  console.log('https-server listening on', httpsServer.address().port);
});