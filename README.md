# socketsub
Example Websocket notifications from Postgres' LISTEN / NOTIFY


SocketSub is a Proof-of-Concept implementation for tying a backend notification
channel (in this, Postgresql's LISTEN / NOTIFY) to a WebSocket server to
provide updates to a client's browser.

## Requirements
1. Postgres 9.x (8.x may work, haven't tested)
2. Node > 0.10.x

## Setup
1. Make sure you have a working Postgresql installation
2. Edit config.json to match your database settings
3. ```npm install```
4. ```bower install```

## Running
1. ```bin/www```
2. Navigate to http://localhost:3000 in any modern browser
3. Issue a NOTIFY command to Postgres, like so:
```bin/gen CHANNELNAME MESSAGE```
