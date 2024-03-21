// const https = require('https');
const http = require('http');
const app = require('./app');
const fs = require('fs');
const path = require('path');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;

};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};


// ces certifs ne sont pas valides pour une utilisation en production. 
// Veuillez générer vos propres certificats pour une utilisation en production.
const options = {
  key: fs.readFileSync(path.join(__dirname, 'certifs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certifs', 'cert.pem')),
  passphrase: 'hello'
};

// const server = https.createServer(options, app);
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
});

server.listen(port);