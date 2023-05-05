// Create a new hydra-synth instance
const hydra = new Hydra({ detectAudio: false });

function rrange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Hydra commands
// voronoi(50,1)
// .luma(0.5).add(shape(1,1).luma(1))
// .modulate(osc(-1000,-1)
// .modulate(osc().luma()))
// .blend(o0)
// .blend(o0)
// .blend(o0)
// .blend(o0)
// .out();

// voronoi(50,1)
// .luma(0.5).add(shape(1,1).luma(1))
// .modulate(osc(-1000,-1)
// .modulate(osc().luma()))
// .blend(o0)
// .blend(o0)
// .blend(o0)
// .blend(o0)
// .out();

// voronoi(10,1,30).modulatePixelate( noise(3,89),10,2).out(o0)
// voronoi(20,1,30).modulatePixelate( noise(9,89),10,2).out(o1)
// voronoi(30,1,30).modulatePixelate( noise(43,89),10,2).out(o2)
// voronoi(40,1,30).modulatePixelate( noise(53,89),10,2).out(o3)
// render()

let time = 1000;

let loopid = -1;

/*let loop = function() { loopid = setInterval(function() {

    WsClient.send(666);

    osc(1, 0.1)
      .modulate(noise(6), Math.random()) // 0.22
      .diff(o0)
      .modulateScrollY(osc(2).modulate(osc().rotate(), Math.random())) // 0.11
      .scale( Math.random()) // 0.72
      .color(0.99, 1.014, 1)
      .out();

  }, time);

}*/

// was!
// voronoi(10,1,90 * Math.random()).modulatePixelate( noise(3 * Math.random(),79),100,2).out();

s0.initVideo("caseq.mov");
src(s0).modulatePixelate( noise(3 * Math.random(),79),100,2).out();

let change = function() {

  // osc(1, 0.1)
  //   .modulate(noise(6), Math.random()) // 0.22
  //   .diff(o0)
  //   .modulateScrollY(osc(2).modulate(osc().rotate(), 0.11)) // 0.11
  //   .scale(0.72) // 0.72
  //   .color(0.99, 1.014, 1)
  //   .out();

  // osc(10)
  // .rotate(Math.random())
  // .diff(osc(20))
  // .out(o0)

  // osc(10)
  // .rotate(0.5)
  // .diff(osc(2))
  // .out(o1)

  // osc(1)
  // .rotate(0.5)
  // .diff(osc(2000))
  // .out(o2)

  // osc(1000, 0).modulate(o1).out(o2)

  // osc(100)
  // .rotate(0.15)
  // .diff(osc(20))
  // .out(o3)

  // render()


  const months = [
    src(s0).modulatePixelate( noise(3 * Math.random(),79),100,2),
    src(s0).modulatePixelate( noise(3 * Math.random(),9),100,2),
    src(s0).modulatePixelate( noise(3 * Math.random(),9),100,2),
    src(s0).modulatePixelate( noise(3 * Math.random(),79),100,2),
    src(s0).modulatePixelate( noise(3 * Math.random(),9),200,2),
    src(s0).modulatePixelate( noise(9 * Math.random(),0.09),60,2),
    src(s0).modulatePixelate( noise(43 * Math.random(),79),100,2),
    src(s0).modulatePixelate( noise(({time}) => Math.sin(time * 0.5) * 100,79),50 + (50 * Math.random()),2)
  ];

    const random = Math.floor(Math.random() * months.length);
    console.log(random);
    months[random].out();

}

//

// loop();

console.log(" this never runs???");
WsClient.listen = function(msg) {
console.log("Got an BJARNI present: " + msg);
  // time = parseFloat(msg.data);
  // clearInterval(loopid); loop();
  change();



};

// Global
document.addEventListener("click", function (evnt) {

  // osc(1, 0.1)
  //   .modulate(noise(6), Math.random()) // 0.22
  //   .diff(o0)
  //   .modulateScrollY(osc(2).modulate(osc().rotate(), Math.random())) // 0.11
  //   .scale(0.72)
  //   .color(0.99, 1.014, 1)
  //   .out();

  const months = [
    src(s0).modulatePixelate( noise(3 * Math.random(),79),100,2),
    src(s0).modulatePixelate( noise(3 * Math.random(),9),100,2),
    src(s0).modulatePixelate( noise(3 * Math.random(),9),100,2),
    src(s0).modulatePixelate( noise(3 * Math.random(),79),100,2),
    src(s0).modulatePixelate( noise(3 * Math.random(),9),200,2),
    src(s0).modulatePixelate( noise(9 * Math.random(),0.09),60,2),
    src(s0).modulatePixelate( noise(43 * Math.random(),79),100,2),
    src(s0).modulatePixelate( noise(({time}) => Math.sin(time * 0.5) * 100,79),50 + (50 * Math.random()),2)];

    //"January", "February", "March", "April", "May", "June", "July"];

    const random = Math.floor(Math.random() * months.length);
    console.log(random);
    months[random].out();





});

/*

osc(function(){return 10 * Math.sin(time * 0.1)}).out(o0)
osc(40).rotate(1.57).out(o1)
render(o0)

*/

/*

s0.initScreen("Textures")
src(s0).out()

noise(10, 0).out(o0)
src(o0).thresh().out(o1)
src(o0).posterize(3,1).out(o2)
src(o0).pixelate(20, 20).out(o3)
render()


src(s0).out(o0)
src(o0).thresh().out(o1)
src(o0).posterize(3,1).out(o2)
src(o0).pixelate(20, 20).out(o3)
render()

*/
