let Terrapp = {};
let world;

/* - Utilities - */

function rrange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* - Events - */

window.onclick = function () {
  Terrapp.run();
  WsClient.send("scstart");
  document.getElementById("info").innerHTML =
    " ## simulation: " + new Date().toLocaleTimeString("nl-NL");
};

/* - Terra - */

Terrapp.run = function () {
  if (!world) {
    world = new terra.Terrarium(50, 50, { id: "myTerrarium", cellSize: 15 });
  } else {
    var a = "a",
      b = "b";
    terra.registerCreature({ type: a });
    terra.registerCreature({ type: b });
    world.grid = world.makeGrid(function (x, y) {
      return (x + y) % 2 ? a : b;
    });
  }
  
  /* - Custom Work - */

  world.custom = {};
  world.custom.counter = 0;
  world.custom.rate = 10;
  world.custom.work = (grid) => {
    world.custom.counter += 1;

    if (world.custom.counter % world.custom.rate == 0) {
      grid.forEach((line) => {
        line.forEach((column) => {
          // Do custom work with the grid
        });
      });

      /*
    console.log(" ## custom work: " + world.custom.counter);
    WsClient.send(world.custom.counter);
    */
    }
  };

  WsClient.listen = function (msg) {
    console.log("Receive from SC: " + msg.data);
  };

  /* - Register creatures and animate - */

  terra.registerCreature({
    type: "crea",
    color: [138, 48, 51],
    maxEnergy: 11, // was 50
    initialEnergy: 10,
    character: "o",
    size: 10,
  });

  terra.registerCreature({
    type: "creb",
    color: [60, 12, 6],
    size: 4,
    initialEnergy: 5,
    maxEnergy: 400,
    wait: function () {
      this.energy += 2;
    },
    move: false,
    reproduceLv: 0.65,
  });

  world.grid = world.makeGridWithDistribution([
    ["crea", 5],
    ["creb", 1],
  ]);

  world.animate();
};

/* - Exports - */

if (typeof module !== "undefined") {
  module.exports = Terrapp;
}
