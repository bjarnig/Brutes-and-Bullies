export function templates(index) {
  let creatures = [];
  let world = [];

  if (index == 0) {
    creatures.push({
      type: "crea",
      color: [138, 48, 51],
      maxEnergy: 11, // was 50
      initialEnergy: 10,
      character: "o",
      size: 10,
    });

    creatures.push({
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

    world = [
      ["crea", 5],
      ["creb", 1],
    ];
  }

  if (index == 1) {
    creatures.push({
      type: "plant",
      color: [0, 120, 0],
      size: 10,
      initialEnergy: 5,
      maxEnergy: 20,
      wait: function () {
        // photosynthesis :)
        this.energy += 1;
      },
      move: false,
      reproduceLv: 0.65,
    });

    creatures.push({
      type: "brute",
      color: [0, 255, 255],
      maxEnergy: 50,
      initialEnergy: 10,
      size: 20,
    });

    creatures.push({
      type: "bully",
      color: [241, 196, 15],
      initialEnergy: 20,
      reproduceLv: 0.6,
      sustainability: 3,
    });

    world = [
      ["plant", 50],
      ["brute", 5],
      ["bully", 5],
    ];
  }

  if (index == 2) {
    creatures.push({
      type: "plant",
      color: [0, 120, 0],
      size: 10,
      initialEnergy: 5,
      maxEnergy: 10,
      wait: function () {
        // photosynthesis :)
        this.energy += 1;
      },
      move: false,
      reproduceLv: 0.65,
    });

    creatures.push({
      type: "brute",
      color: [0, 255, 255],
      maxEnergy: 30,
      initialEnergy: 10,
      wait: function () {
        // photosynthesis :)
        this.energy += 2;
      },
      size: 20,
    });

    creatures.push({
      type: "bully",
      color: [241, 196, 15],
      initialEnergy: 20,
      reproduceLv: 0.8,
      sustainability: 1,
      wait: function () {
        // photosynthesis :)
        this.energy += 6;
      },
    });

    world = [
      ["plant", 50],
      ["brute", 5],
      ["bully", 5],
    ];
  }

  if (index == 3) {
    creatures.push({
      type: "plant",
      color: [0, 120, 0],
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
      type: "brute",
      color: [0, 255, 255],
      maxEnergy: 8,
      initialEnergy: 10,
      wait: function () {
        this.energy += 4;
      },
      size: 20,
    });

    creatures.push({
      type: "bully",
      color: [241, 196, 15],
      initialEnergy: 20,
      reproduceLv: 0.8,
      sustainability: 1,
      wait: function () {
        this.energy += 11;
      },
    });

    world = [
      ["plant", 30],
      ["brute", 10],
      ["bully", 20],
    ];
  }

  if (index == 4) {
    creatures.push({
      type: "plant",
      color: [0, 120, 0],
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
      type: "brute",
      color: [0, 255, 255],
      maxEnergy: 838,
      reproduceLv: 0.9,
      initialEnergy: 2,
      wait: function () {
        this.energy += 4;
      },
      size: 20,
    });

    creatures.push({
      type: "bully",
      color: [241, 196, 15],
      initialEnergy: 3,
      maxEnergy: 40,
      reproduceLv: 0.9,
      sustainability: 1,
      wait: function () {
        this.energy += 11;
      },
    });

    world = [
      ["plant", 34],
      ["brute", 33],
      ["bully", 33],
    ];
  }

  if (index == 5) {
    creatures.push({
      type: "crea",
      color: [138, 48, 111],
      size: 30,
      character: "a",
      maxEnergy: 21,
      initialEnergy: 40,
    });

    creatures.push({
      type: "creb",
      color: [48, 132, 138],
      size: 4,
      character: "b",
      maxEnergy: 6,
      initialEnergy: 5,
      move: false,
      reproduceLv: 0.9,
      wait: function () {
        this.energy += 3;
      },
    });

    creatures.push({
      type: "crec",
      color: [228, 144, 35],
      size: 1,
      initialEnergy: 2,
      maxEnergy: 6,
      character: "c",
      wait: function () {
        this.energy += 1;
      },
      move: false,
      reproduceLv: 0.3,
    });

    world = [
      ["crea", 30],
      ["creb", 30],
      ["crec", 30],
    ];
  }

  if (index == 6) {
    creatures.push({
      type: "crea",
      color: [48, 132, 238],
      size: 4,
      character: "b",
      maxEnergy: 2,
      initialEnergy: 5,
      reproduceLv: 0.9,
    });

    creatures.push({
      type: "creb",
      color: [48, 132, 138],
      size: 4,
      character: "b",
      maxEnergy: 6,
      initialEnergy: 2,
      reproduceLv: 0.9,
    });

    creatures.push({
      type: "crec",
      color: [148, 132, 138],
      size: 4,
      character: "c",
      maxEnergy: 16,
      initialEnergy: 5,
      reproduceLv: 0.9,
    });

    world = [
      ["crea", 30],
      ["creb", 30],
      ["crec", 30],
    ];
  }

  if (index == 7) {
    creatures.push({
      type: "plant",
      color: [0, 120, 0],
      size: 10,
      initialEnergy: 5,
      maxEnergy: 10,
      wait: function () {
        // photosynthesis :)
        this.energy += 1;
      },
      move: false,
      reproduceLv: 0.65,
    });

    creatures.push({
      type: "brute",
      color: [0, 255, 255],
      maxEnergy: 30,
      initialEnergy: 10,
      wait: function () {
        // photosynthesis :)
        this.energy += 2;
      },
      size: 20,
    });

    creatures.push({
      type: "bully",
      color: [241, 196, 15],
      initialEnergy: 20,
      reproduceLv: 0.8,
      sustainability: 1,
      wait: function () {
        // photosynthesis :)
        this.energy += 6;
      },
    });

    world = [
      ["plant", 15],
      ["brute", 15],
      ["bully", 5],
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

      if (!isNaN(item.totalEnergy)) {
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
  console.log("averageEnergy: " + averageEnergy);
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
