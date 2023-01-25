export function rrange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function templates(index) {
  let creatures = [];
  let world = [];
  // let colorsa = [ [138, 48, 51], [60, 12, 16], [228, 144, 35] ];
  let colorsa = [ [184, 106, 132], [90, 6, 25], [227, 11, 93] ];
  let colorsb = [ [125, 17, 40], [247,189,179], [196, 30, 61] ]; 


  if (index == 0) {
    
    creatures.push({
      type: "crea",
      color: colorsa[0],
      maxEnergy: rrange(7,13),
      initialEnergy: 10,
      character: "o",
      size: 10,
    });

    creatures.push({
      type: "creb",
      color: colorsa[1],
      size: 4,
      initialEnergy: 5,
      maxEnergy: 400,
      wait: function () {
        this.energy += 3;
      },
      move: false,
      reproduceLv: 0.65
    });

    world = [
      ["crea", 5],
      ["creb", 1],
    ];
  }

  if (index == 1) {

    creatures.push({
      type: "crec",
      color: colorsa[2],
      maxEnergy: rrange(7,13),
      initialEnergy: 10,
      character: "o",
      size: 10,
    });

    creatures.push({
      type: "cred",
      color: colorsa[0],
      size: 4,
      initialEnergy: 5,
      maxEnergy: 40,
      wait: function () {
        this.energy += 3;
      },
      move: false,
      reproduceLv: 0.65
    });

    creatures.push({
      type: "cree",
      color: colorsa[2],
      size: 1,
      initialEnergy: 2,
      maxEnergy: 6,
      character: "o",
      wait: function () {
        this.energy += rrange(-2,3);
      },
      move: false,
      reproduceLv: 0.2,
    });

    world = [
      ["crea", 85],
      ["creb", 6],
      ["cree", 8],
    ];
  }

  if (index == 2) {
    creatures.push({
      type: "cref",
      color: colorsa[2],
      size: 4,
      character: "o",
      maxEnergy: 2,
      initialEnergy: 5,
      reproduceLv: 0.9,
    });

    creatures.push({
      type: "creg",
      color: colorsa[1],
      size: 4,
      character: "o",
      maxEnergy: 6,
      initialEnergy: 2,
      reproduceLv: 0.9,
    });

    creatures.push({
      type: "creh",
      color: colorsa[0],
      size: 4,
      character: "o",
      maxEnergy: 16,
      initialEnergy: 2,
      wait: function () {
        this.energy += 2;
      },
      reproduceLv: 0.5,
    });

    creatures.push({
      type: "crei",
      color: colorsa[1],
      size: 2,
      initialEnergy: 5,
      maxEnergy: 40,
      wait: function () {
        this.energy += rrange(-3,3);
      },
      move: false,
      reproduceLv: 0.6
    });

    world = [
      ["creh", rrange(12,24)],
      ["cref", rrange(2,4)],
      ["creg", 10 + rrange(2,14)],
      ["crei", 14 + rrange(2,4)]
    ];
  }

  if (index == 3) {
    
    creatures.push({
      type: "crej",
      color: colorsa[0],
      maxEnergy: rrange(7,13),
      initialEnergy: 10,
      character: "o",
      size: 10,
    });

    creatures.push({
      type: "crek",
      color: colorsa[1],
      size: 1,
      initialEnergy: 5,
      maxEnergy: 100,
      wait: function () {
        this.energy += rrange(-1,1);
      },
      move: false,
      reproduceLv: 0.3  
    });

    creatures.push({
      type: "crel",
      color: colorsa[2],
      size: 1,
      initialEnergy: 5,
      character: "o",
      maxEnergy: 100,
      wait: function () {
        this.energy += rrange(-1,2);
      },
      move: false,
      reproduceLv: 0.6
    });

    world = [
      ["crej", 8],
      ["crek",21],
      ["crel", 4],
    ];
  }

  if (index == 4) {
    creatures.push({
      type: "sima",
      color: colorsb[0],
      size: 10,
      initialEnergy: 5,
      maxEnergy: 20,
      wait: function () {
        this.energy += 1;
      },
      move: false,
      reproduceLv: 0.65,
    });

    creatures.push({
      type: "simb",
      color: colorsb[1],
      maxEnergy: 50,
      initialEnergy: 10,
      size: 20,
    });

    creatures.push({
      type: "simc",
      color: colorsb[2],
      initialEnergy: 20,
      reproduceLv: 0.6,
      sustainability: 3,
    });

    world = [
      ["sima", 50],
      ["simb", 5],
      ["simc", 5],
    ];
  }

  if (index == 5) {
    creatures.push({
      type: "simd",
      color: colorsb[0],
      size: 10,
      initialEnergy: 5,
      maxEnergy: 10,
      wait: function () {
        this.energy += 1;
      },
      move: false,
      reproduceLv: 0.65,
    });

    creatures.push({
      type: "sime",
      color: colorsb[1],
      maxEnergy: 30,
      initialEnergy: 10,
      wait: function () {
        this.energy += 2;
      },
      size: 20,
    });

    creatures.push({
      type: "simf",
      color: colorsb[2],
      initialEnergy: 20,
      reproduceLv: 0.8,
      sustainability: 1,
      wait: function () {
        this.energy += 6;
      },
    });

    world = [
      ["simd", 40],
      ["sime", 5],
      ["simf", 5],
    ];
  }

  if (index == 6) {
    creatures.push({
      type: "simg",
      color: colorsb[0],
      size: 10,
      initialEnergy: 5,
      maxEnergy: 1,
      wait: function () {
        this.energy += 1;
      },
      move: false,
      reproduceLv: 0.25,
    });

    creatures.push({
      type: "simh",
      color: colorsb[1],
      maxEnergy: 8,
      initialEnergy: 10,
      wait: function () {
        this.energy += 4;
      },
      size: 20,
    });

    creatures.push({
      type: "simi",
      color: colorsb[2],
      initialEnergy: 20,
      reproduceLv: 0.8,
      sustainability: 1,
      wait: function () {
        this.energy += 11;
      },
    });

    world = [
      ["simg", 5],
      ["simh", 5],
      ["simi", 5],
    ];
  }

  if (index == 7) {
    creatures.push({
      type: "simj",
      color: colorsb[0],
      size: 10,
      initialEnergy: 18,
      maxEnergy: 10,
      wait: function () {
        this.energy += 10;
      },
      move: false,
      reproduceLv: 0.25,
    });

    creatures.push({
      type: "simk",
      color: colorsb[1],
      maxEnergy: 838,
      reproduceLv: 1.1,
      initialEnergy: 2,
      wait: function () {
        this.energy += 6;
      },
      size: 20,
    });

    creatures.push({
      type: "siml",
      color: colorsb[2],
      initialEnergy: 3,
      maxEnergy: 40,
      reproduceLv: 0.9,
      sustainability: 1,
      wait: function () {
        this.energy += 11;
      },
    });

    world = [
      ["simj", 34],
      ["simk", 33],
      ["siml", 33],
    ];
  }

  if (index == 8) {
    creatures.push({
      type: "simm",
      color: colorsb[0],
      size: 10,
      initialEnergy: 5,
      maxEnergy: 10,
      wait: function () {
        this.energy += 1;
      },
      move: false,
      reproduceLv: 0.65,
    });

    creatures.push({
      type: "simn",
      color: colorsb[1],
      maxEnergy: 40,
      initialEnergy: 10,
      wait: function () {
        this.energy += 2;
      },
      size: 20,
    });

    creatures.push({
      type: "simo",
      color: colorsb[2],
      initialEnergy: 20,
      reproduceLv: 0.8,
      sustainability: 1,
      wait: function () {
        this.energy += 6;
      },
    });

    world = [
      ["simm", 8],
      ["simn", 14],
      ["simo", 1],
    ];
  }

  return [creatures, world];
}

export function mapper(data) {
  let totalAge = 0,
    totalEnergy = 0,
    totalItems = 0,
    maxAge = 0,
    minAge = 1000,
    maxEnergy = 0,
    minEnergy = 1000,
    avergaAge,
    averageEnergy;

  data.forEach((line) => {
    line.forEach((item) => {
      if (!isNaN(item.age)) {
        totalAge = totalAge + item.age;
      }

      if (!isNaN(item.energy)) {
        totalEnergy = totalEnergy + item.energy;
      }

      if (item.age > maxAge) {
        maxAge = item.age;
      }

      if (item.energy > maxEnergy) {
        maxEnergy = item.energy;
      }

      if (item.age < minAge) {
        minAge = item.age;
      }

      if (item.energy < minEnergy) {
        minEnergy = item.energy;
      }

      totalItems++;
    });
  });

  avergaAge = totalAge / totalItems;
  averageEnergy = totalEnergy / totalItems;

  // console.log("totalAge: " + totalAge);
  // console.log("totalEnergy: " + totalEnergy);
  // console.log("avergaAge: " + avergaAge);
  // console.log("averageEnergy: " + averageEnergy);
  // console.log("maxAge: " + maxAge);
  // console.log("maxEnergy: " + maxEnergy);
  // console.log("minAge: " + minAge);
  // console.log("minEnergy: " + minEnergy);

  return {
    totalAge: totalAge,
    totalEnergy: totalEnergy,
    avergaAge: avergaAge,
    averageEnergy: averageEnergy,
    maxAge: maxAge,
    maxEnergy: maxEnergy,
    minAge: minAge,
    minEnergy: minEnergy,
  };
}
