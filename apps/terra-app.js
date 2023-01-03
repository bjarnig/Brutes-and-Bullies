import { templates } from "./terra-utils.js";
import { mapper } from "./terra-utils.js";

let Terrapp = {};
let world;
let listeners = [];

/* - Utilities - */

function rrange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}

function asObject(str) {
  const chars = { "(": "", ")": "", "'": "", ",": "", " ": "", ",": ":" };
  const list = str.replace(/[()\', ]/g, (m) => chars[m]).split(":");
  let obj = {};
  for (let i = 0; i < list.length; i = i + 2) {
    obj[list[i]] = list[i + 1];
  }
  return obj;
}

function getAgent(name) {
  const reference = getQueryVariable(name);

  if (reference === "1") {
    return { name: "A" };
  } else {
    return { name: "B" };
  }
}

/* - Events - */

const agent = getAgent("agent");

let ti = 0;
window.onclick = function () {
  Terrapp.run();
  WsClient.send("scstart");
  document.getElementById("info").innerHTML = " ## system " + agent.name;
  // + new Date().toLocaleTimeString("nl-NL");

  Terrapp.run();

  // setInterval(function () {
  // }, 2000);
};

/* - Terra - */

Terrapp.run = function () {

  if (!world) {
    world = new terra.Terrarium(51, 50, { id: "myTerrarium", cellSize: 15 });
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
  world.custom.rate = 100;
  world.custom.work = (grid) => {
    world.custom.counter += 1;

    if (world.custom.counter % world.custom.rate == 0) {
      
      /*
      grid.forEach((line) => {
        if (world.custom.counter % 64 == 0) {
        }
        line.forEach((column) => {
          // Do custom work with the grid
        });
      });
      */

      // console.log(" ## custom work: " + world.custom.counter);
      // WsClient.send(agent.name + " " + mapper(grid));

    let res = mapper(grid);

      listeners.forEach((l) => {
        WsClient.send(agent.name + " " + l.id + " " + res[l.type]);
      });

    }
  };

  WsClient.listen = function (msg) {
    const obj = asObject(msg.data);

    if(obj.action === 'attach') {
      listeners = listeners.filter(item => item.id !== obj.id);
      listeners.push({ id : obj.id, type : obj.type });
    }

    if(obj.action === 'detach') {
      listeners = listeners.filter(item => item.id !== obj.id);
    }

    console.log(listeners);
  };

  /* - Register creatures and animate - */

  const creatures = templates(ti)[0];
  const setup = templates(ti)[1];

  creatures.forEach((creature) => {
    terra.registerCreature(creature);
  });

  world.grid = world.makeGridWithDistribution(setup);
  world.animate();

  setTimeout(() => {
    ti = rrange(0, 7);
    Terrapp.run();
    // WsClient.send("scstart interval: " + ti);
  }, rrange(6000, 10000));
};

/* - Exports - */

if (typeof module !== "undefined") {
  module.exports = Terrapp;
}
