import { templates } from "./terra-utils.js";
import { mapper } from "./terra-utils.js";
import { rrange } from "./terra-utils.js";

let Terrapp = {};
let world;
let listeners = [];

/* - Utilities - */

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
  if (reference) {
    return { name: reference };
  } else {
    return { name: "A" };
  }
}

/* - Events - */

const agent = getAgent("agent");

let ti = 0;
window.onclick = function () {
  document.getElementById("info").innerHTML = " ## system " + agent.name;
};

WsClient.listen = function (msg) {
    
  const obj = asObject(msg.data);
  console.log(obj);
  
  if(obj.agent === agent.name) {

    if (obj.action === "attach") {
      listeners = listeners.filter((item) => item.id !== obj.id);
      listeners.push({ id: obj.id, type: obj.type });
    }

    if (obj.action === "detach") {
      listeners = listeners.filter((item) => item.id !== obj.id);
    }

    if(obj.action === "start") {
      Terrapp.run();
    }

    if(obj.action === "stop") {
      world.stop();
    }

    if(obj.action === "destroy") {
      world.destroy();
    }

    if(obj.action === "scene") {
      ti = obj.index;
      Terrapp.run();
    }

    if(obj.action === "rscene") {
      ti = rrange(0, 7);
      Terrapp.run();
    }
  }
};

/* - Terra - */

Terrapp.run = function () {
  if (!world) {
    world = new terra.Terrarium(51, 50, { id: "myTerrarium", cellSize: 15 });
  }

  /* - Register Custom Work - */

  world.custom = {};
  world.custom.counter = 0;
  world.custom.rate = 100;
  world.custom.work = (grid) => {
    world.custom.counter += 1;

    if (world.custom.counter % world.custom.rate == 0) {
      let res = mapper(grid);
      console.log(res.avergaAge);
      listeners.forEach((l) => {
        WsClient.send(agent.name + " " + l.id + " " + res[l.type]);
      });
    }
  };

  /* - Register creatures and animate - */

  const creatures = templates(ti)[0];
  const setup = templates(ti)[1];

  creatures.forEach((creature) => {
    terra.registerCreature(creature);
  });

  world.grid = world.makeGridWithDistribution(setup);
  world.animate();

};

/* - Exports - */

if (typeof module !== "undefined") {
  module.exports = Terrapp;
}
