
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

const agent = getAgent("agent");

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
      ti = rrange(0, 19);
      Terrapp.run();
    }

    if(obj.action === "redirect") {
      if(obj.type) {
        let redstr = 'http://localhost:3000/hydra' + obj.type + '/?agent='+obj.agent;
        window.location.href = redstr;
      }
      else {
        window.location.href = 'http://localhost:3000/hydra' + obj.type + '/?agent='+obj.agent;;
      }
    }
  }
};
