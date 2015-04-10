var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var CHANNELS = [
  'news',
  'btcprice',
  'bugs'
];

/*
 * BEGIN
 * WebSockets Stuff
 */
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080})
  , clients = [];

// broadcast postgres notification to ws connected clients
var wsBroadcast = function (pgResponse) {
  console.log('pubsub message received');
  console.log(pgResponse);
  clients.forEach(function (client) {
    client.send(pgResponse.payload);
  });
};
 
wss.on('connection', function (ws) {
  // add client to list of connected clients
  clients.push(ws);
  ws.on('close', function () {
    // remove connected client
    clients.splice(clients.indexOf(ws), 1);
  });
});
/*
 * END
 * WebSockets Stuff
 */

/*
 * BEGIN
 * Postgresql Stuff
 */
var pg = require('pg');
//                                 user      host      table
var db = new pg.Client('postgres://socketsub@localhost/socketsub');
db.connect(function (err) {
  if (err) throw err;

  CHANNELS.forEach(function (channel) {
    console.log('listening on channel ' + channel);
    db.query('LISTEN ' + channel)
  });

  db.on('notification', wsBroadcast);
});
/*
 * END
 * Postgresql Stuff
 */

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
