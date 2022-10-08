/**
 *
 * Handles WebSocket Communication with client.js
 *
 **/

let wsc = null;

var WebSocketServer = require("ws").Server,
  wss = new WebSocketServer({
    port: 40510,
  }),
  osc = require("osc");

let udpPort = new osc.UDPPort({
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

  wsc = ws; /// ??

  // listen to the client file
  wsc.on("message", function (message) {
    console.log("received: %s", message);

    //if (message === "scstart" || message === "scstop") {
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
    // Send the messge to SuperCollider
    // console.log(
    //   "Sending message",
    //   msg.address,
    //   msg.args,
    //   "to",
    //   udpPort.options.remoteAddress + ":" + udpPort.options.remotePort
    // );
    udpPort.send(msg);
    // }
  });
});

// Message from SuperCollider
udpPort.on("message", function (msg) {
  if (msg && msg.address) {
    console.log(JSON.stringify(msg));
    // Send to browser
    wsc.send(msg.args[0].value);
  }
});