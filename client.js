/**
 *
 * Client JS, WebSocket Communication to ws.js
 *
 **/

let WsClient = {}, agents = 'xyz', agentCount = 0;

WsClient.init = function () {
  const ws = new WebSocket("ws://localhost:40510");

  ws.onopen = function () {
    console.log("## Brutes and Bullies, Websockets connected ...");
    ws.send("connected");
  };

  ws.onmessage = function (ev) {
    if (WsClient.listen) {
      WsClient.listen(ev);
    }
  };

  WsClient.send = function (message) {
    if (ws.readyState === 1) {
      ws.send(message);
    } else {
      setTimeout(function () {
        WsClient.send(message);
      }, 100);
    }
  };
};

if (typeof module !== "undefined") {
  module.exports = WsClient;
}

WsClient.init();
