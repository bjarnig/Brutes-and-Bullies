
let Terrapp = {};
var world;
let countDisturb = 0; 

function rrange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.onclick = function(event) {
  Terrapp.run();
  WsClient.send("scstart");
}

Terrapp.run = function () {

  if(!world) {
    world = new terra.Terrarium(50, 50, {id: 'myTerrarium', cellSize:15});
  } else {
    var a = 'a', b = 'b';
    terra.registerCreature({type: a});
    terra.registerCreature({type: b});
    world.grid = world.makeGrid(function (x, y) {
      return (x + y) % 2 ? a : b;
    });
  }
  
world.custom = {};
world.custom.counter = 0;
world.custom.rate = 10;

// custom work! 

let testcount = 0;

world.custom.work = function(grid) {
  
  world.custom.counter += 1; 

  if(world.custom.counter % world.custom.rate == 0) {

    if(testcount % 16 == 0) {
      // console.log(' send back! ');
      // testcount = 0;

      // change the simulation //


    }

    testcount = testcount + 1;
    
    /*let age = 0, energy = 0, bozoCount=0, dieterCount=0;

    grid.forEach((line) => {
      line.forEach((column) => { 

        if(column && column.age) {
          age += column.age;
        }

        if(column && column.energy) {
          energy += column.energy;
        }

        if(column && column.type == "bozo") {
          bozoCount += 1;
        }

        if(column && column.type == "dieter") {
          dieterCount += 1;
        }


      });
    });
   
    console.log(" ## custom work: " + world.custom.counter + " age : " + age + " energy " + energy);
    console.log(" ## bozo: " + bozoCount + " dieter : " + dieterCount);
    */

    // if(grid[0][0].type && grid[0][0].type == "bozo") {
    //   console.log( grid[0][0].type ); 
    // }
    //console.log( grid[0][0].type ); 
    // WsClient.send([age,energy]);
    //WsClient.send([age, [11,22,44] ]);
  }

}; 

WsClient.listen = function(msg) {
  
  console.log("Receive from SC: " + msg.data); 
  
  // console.log(countDisturb);
  // countDisturb = countDisturb + 1;

  // if(countDisturb < 7) {
  //   Terrapp.run(); 
  // }
  
}; 

let aaColor = [234, 222, 218];

if(Math.random() > 0.5) {
  aaColor = [130, 51, 41];
}

let aaMaxEnergy = rrange(1,4);
if(countDisturb > 4) {
  aaMaxEnergy = 1;
}

terra.registerCreature({
  type: 'aa',
  // color: [234, 222, 218],
  color: aaColor,
  size: 10,
  initialEnergy: 1,
  maxEnergy: aaMaxEnergy,  // was 3
 // character : 'b',
  // wait: function() {
  //   // photosynthesis :)
  //   this.energy += 0.05;
  // },
  move: false,
  efficiency: 0.01,
  reproduceLv: 0.24
});

var plantMax = rrange(15,20);

if(countDisturb > 2) {
  plantMax = rrange(8,15);
}

if(countDisturb > 4) {
  plantMax = 5;
}

terra.registerCreature({
  type: 'plant',
  color: [191, 184, 173],
  size: 2,
  initialEnergy: 5,
  // maxEnergy: rrange(15,20), // was 20
  maxEnergy: 100, // was 20
  wait: function() {
    // photosynthesis :)
    this.energy += 1;
    // console.log(this.grid);
    //console.log(world.grid);
    // terra.stop();
  },
  move: false,
  character: 'i',
  reproduceLv: Math.random() // var 0.15
});

// let runDieter = false;  

// if(Math.random() > 0.5) { 

//   runDieter = true;

// }

terra.registerCreature({
  type: 'dieter',
  color: [138, 48, 51],
  maxEnergy: 11, // was 50
  initialEnergy: 10,
  character: 'o',
  size: 10
});

terra.registerCreature({
  type: 'bully',
  color: [241, 196, 15],
  initialEnergy: 20,
  reproduceLv: 0.6,
  sustainability: 3,
  maxEnergy: 2000,
});

terra.registerCreature({
  type: 'bozo',
  color: [60, 120, 60],
  size: 10,
  initialEnergy: 5,
  maxEnergy: 20,
  wait: function() {
   // this.energy += Math.random();
  },
  move: false,
  reproduceLv: 0.65
});

//world.grid = world.makeGridWithDistribution([['plant', 50], ['dieter', 5], ['bully', 25]]);
// world.grid = world.makeGridWithDistribution([['plant', 50], ['dieter', 5] ]);


if(countDisturb > 5) {
  console.log(' ## singular systems a');
  world.grid = world.makeGridWithDistribution([['plant', 20],['aa', 30] ]);
} else {
  
  console.log(' ## singular systems b');
  
  // original 
  // world.grid = world.makeGridWithDistribution([['bully', 50], ['dieter', 5], ['aa', 25] ]);
  
  // nice, with bully 
  // world.grid = world.makeGridWithDistribution([['plant', 50], ['dieter', rrange(1,10)], ['bully', 25] ]);
  
  // the number indicates how much space they take 
  // world.grid = world.makeGridWithDistribution([['plant', 50], ['bully', 5] ]);

  // world.grid = world.makeGridWithDistribution([['dieter', 5], ['bozo', 50] ]);

  /* SLOW !!! */

  terra.registerCreature({
    type: 'slowa',
    color: [91, 84, 173],
    size: 2,
    initialEnergy: 5,
    maxEnergy: 4000,
    wait: function() {
      this.energy += 15;
    },
    move: false,
    character: 'i',
    reproduceLv: 0.75
  });

  terra.registerCreature({
    type: 'slowb',
    color: [60, 12, 6],
    size: 4,
    initialEnergy: 5,
    maxEnergy: 400,
    wait: function() {
      this.energy += 2;
    },
    move: false,
    reproduceLv: 0.65
  });

  //world.grid = world.makeGridWithDistribution([['plant', 50], ['slowb', 5] ]);
  
  world.grid = world.makeGridWithDistribution([['dieter', 5], ['slowb', 1] ]);

  // we could ... create different configurations of creat

  setInterval(() => {
    
    console.log('1 second passed!');
    // WsClient.send("hundatussa");

    const rnd = Math.random();

    if(rnd > 0.5) {

      var crea = 'crea' + Math.random();
      var creb = 'creb' + Math.random();

    terra.registerCreature({
      type: crea,
      color: [138*Math.random(), 48*Math.random(), 51*Math.random()],
      maxEnergy: 11, // was 50
      initialEnergy: 10,
      size: 1,
      character: 'o',
      size: 10
    });

    terra.registerCreature({
      type: creb,
      color: [138*Math.random(), 48*Math.random(), 51*Math.random()],
      size: 2,
      initialEnergy: 5,
      maxEnergy: 400,
      wait: function() {
        this.energy += 2;
      },
      move: false,
      reproduceLv: 0.65
    });

    world.grid = world.makeGridWithDistribution([[crea, 20 * Math.random()], [creb, 10 * Math.random()] ]);

    } else {

      terra.registerCreature({
        type: 'plantx',
        color: [0, 120, 0],
        size: 10,
        initialEnergy: 5,
        maxEnergy: 20,
        wait: function() {
          // photosynthesis :)
          this.energy += 1;
        },
        move: false,
        reproduceLv: 0.65
      });
      
      terra.registerCreature({
        type: 'brutex',
        color: [0, 255, 255],
        maxEnergy: 50,
        initialEnergy: 10,
        size: 20
      });
      
      terra.registerCreature({
        type: 'bullyx',
        color: [241, 196, 15],
        initialEnergy: 20,
        reproduceLv: 0.6,
        sustainability: 3
      });
      
      world.grid = world.makeGridWithDistribution([['plantx', 50], ['brutex', 5], ['bullyx', 5]]);
      bbTerrarium.animate();

    }

    

  }, 3000);

}

world.animate();

};

if (typeof module !== "undefined") {
  module.exports = Terrapp;
}