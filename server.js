/*
  Created by orange1337
*/
const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const fs            = require('fs');
const helmet        = require('helmet');
const compression   = require('compression');

process.on('uncaughtException', (err) => {
    console.log(` ======= UncaughtException Main Server : `, err);
});

const app  = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

app.set('view engine', 'html');
app.set('views', '../dist');

// ################### create http node express server
const debug = require('debug')('asd:server');
const http = require('http');
const port = normalizePort(process.env.PORT || '5050');
app.set('port', port);
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.use(express.static(path.join(__dirname, './dist')));

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, './dist/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

// ################### catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ################### error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error('===== Page not Found ', err);
  res.status(404).send('Page not found!');
});

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) return val;
  if (port >= 0) return port; 
  return false;
}
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      break;
    default:
      throw error;
  }
}
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
  console.log(`Listening on ${bind}`);
}
