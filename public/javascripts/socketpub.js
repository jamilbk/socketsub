$(document).ready(function () {
  if (!WebSocket) alert('browser does not support websockets');

  var ws = new WebSocket(
    'ws://' + window.location.hostname + ':' + window.location.port
  );

  console.log(ws);
});
