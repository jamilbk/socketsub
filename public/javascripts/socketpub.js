$(document).ready(function () {
  if (!WebSocket) alert('browser does not support websockets');

  var ws = new WebSocket('ws://' + window.location.hostname + ':8080');

  ws.onmessage = function (event) {
    // client received message from server
    var parsed = JSON.parse(event.data)
      , name = parsed.name
      , data = parsed.data
      , selector = 'tr#' + name + ' td.data';

    $(selector).html(data);
  };
});
