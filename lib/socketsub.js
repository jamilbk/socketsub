var ws = require('ws')
  , pg = require('pg');

var SocketSub = function (opts) {

  return {
    start: function () {
      /*
      * WebSockets Stuff
      */
      var WebSocketServer = ws.Server
        , server = new WebSocketServer({ port: 8080 })
        , clients = [];

      // broadcast postgres notification to ws connected clients
      var wsBroadcast = function (pgNotify) {
        console.log('pubsub message received: ');
        console.log(pgNotify);

        // you could filter which messages go to which client here
        clients.forEach(function (client) {
          client.send(pgNotify.payload);
        });
      };
      
      // a list of connected WebSocket clients is maintained
      server.on('connection', function (client) {
        clients.push(client);

        client.on('close', function () {
          // remove connected client
          clients.splice(clients.indexOf(client), 1);
        });
      });


      /*
      * Postgresql Stuff
      */
      var db = new pg.Client(
        'postgres://' +
        opts.db.user + ':' +
        opts.db.password + '@' +
        opts.db.host + '/' +
        opts.db.database);

      db.connect(function (err) {
        if (err) throw err;

        opts.channels.forEach(function (channel) {
          console.log('listening on channel ' + channel);
          db.query('LISTEN ' + channel);
        });

        // bubble notification to websockets client
        db.on('notification', wsBroadcast);
      });
    }
  };
};

module.exports = SocketSub;
