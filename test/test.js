
console.log("hello world");

// let line = [false,false,false, { energy : 8 }, { energy : 10 }];

let world = [
    [{ energy : 8, age : 4 }, { energy : 10, age : 7 }],
    [{ energy : 3, age : 6 }, { energy : 5 , age : 3 }]
];

const mapper = function(data) {

    let totalAge = 0, totalEnergy = 0, totalItems = 0, highestAge = 0, lowestAge = 1000, highestEnergy = 0, lowestEnergy = 1000;
    
    data.forEach((line) => {
        line.forEach((item) => {
            totalAge = totalAge + item.age;
            totalEnergy = totalEnergy + item.energy;

            if(item.age > highestAge) {
                highestAge = item.age;
            }

            if(item.energy > highestEnergy) {
                highestEnergy = item.energy;
            }

            if(item.age < lowestAge) {
                lowestAge = item.age;
            }

            if(item.energy < lowestEnergy) {
                lowestEnergy = item.energy;
            }

            totalItems++;
        });
    });

    console.log("totalAge: " + totalAge);
    console.log("totalEnergy: " + totalEnergy);
    console.log("avergaAge: " + totalAge / totalItems);
    console.log("averageEnergy: " + totalEnergy / totalItems);
    console.log("highestAge: " + highestAge);
    console.log("highestEnergy: " + highestEnergy);
    console.log("lowestAge: " + lowestAge);
    console.log("lowestEnergy: " + lowestEnergy);
};

mapper(world);

// console.log( line.reduce(function(item, last) { 

//     if(item.energy && last.energy) {
//         return item.energy + last.energy;
//     } else {
//         return 0;
//     }

// }));

/* 

00000011010101
00000011010101
00000011010101
00000011010101

*/

// console.log( [1,2,3,3].reduce(function(item, last) { return item + last }) );