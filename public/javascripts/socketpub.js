$(document).ready(function () {
  if (!WebSocket) alert('browser does not support websockets');

  var ws = new WebSocket('ws://' + window.location.hostname + ':8080');

  console.log(ws);
});
