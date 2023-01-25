/**
 *
 * Handles WebSocket Communication with client.js
 *
 **/

const clients = [];

const WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({
    port: 40510,
  }),
  osc = require("osc");

const udpPort = new osc.UDPPort({
  // This is the port we're listening on.
  localAddress: "127.0.0.1",
  localPort: 57121,

  // This is where sclang is listening for OSC messages.
  remoteAddress: "127.0.0.1",
  remotePort: 57120,
  metadata: true,
});

// Open the socket.
udpPort.open();

wss.on("connection", function (ws) {
  console.log("** SCJS Websocket connection has connected");

  // listen to the client file
  ws.on("message", function (message) {
    console.log("received: %s", message);

    let msg = {
      address: "/scjs",
      args: [
        {
          type: "s",
          value: message,
        },
        {
          type: "f",
          value: Math.random(),
        },
      ],
    };
    udpPort.send(msg);
  });

  clients.push(ws);
});

// Message from SuperCollider
udpPort.on("message", function (msg) {
  if (msg && msg.address) {
    console.log(JSON.stringify(msg));
    // Send to all clients (browsers)
    for (let client of clients) {
      // TODO: Filter our the lost connection sockets
      if(client.readyState == 1) {
        client.send(msg.args[0].value);
      }
    }
  }
});
