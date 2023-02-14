
~simulation = BrutesAndBullies();





















~simulation.init()

~simulation.start("x")
















~simulation.attach("x","nanite","maxAge")



















~simulation.attach("x","depfm","averageEnergy")













~simulation.start("y")

~simulation.attach("y","bloded")














~simulation.scene( ["x","y"], [2,6])

~simulation.fold( ["x","y"], "bloded")

~simulation.seed()














~simulation.terminate()

















(

SynthDef(\mySynth, {|amp=0.2, freq=60, gate=1, atk=1, sus=1, rel=1|
	var env = EnvGen.ar(Env.perc, gate, doneAction:2);
	var sound = Impulse.ar(LFNoise1.ar([freq/10,freq/2], 200, 220), 0, 0.2);
	Out.ar(0, sound * env);
}).add;

SynthDef(\mySine, {|amp=0.2, freq=60, gate=1, atk=1, sus=1, rel=1|
	var env = EnvGen.ar(Env.perc, gate, doneAction:2);
	var sound = SinOsc.ar(freq*10, 0, 0.1 ! 2);
	Out.ar(0, sound * env);
}).add;

SynthDef(\mySawster, {|amp=0.2, freq=2000, gate=1, atk=4, sus=1, rel=4,modFreq=6, feedb=0.01|
	var env = EnvGen.ar(Env.perc(atk, rel), gate, doneAction:2);
	var sound = SinOscFB.ar(LFNoise1.ar(0.001).range(freq, freq*1.1)*2, feedb).fold2(SinOsc.ar([modFreq, modFreq/1.2])) * 0.03;
	Out.ar(0, sound * env);
}).add;

SynthDef(\myNoise, {|amp=0.2, freq=60, gate=1, atk=1, sus=1, rel=1|
	var env = EnvGen.ar(Env.perc, gate, doneAction:2);
	var sound = BPF.ar(BrownNoise.ar, freq * 2, 0.1 ! 2);
	Out.ar(0, sound * env);
}).add;

)

Synth(\mySawster)


(

~bb = ();

~bb.init = {

	"## init bb".postln;

	~bb.net = NetAddr.new("127.0.0.1", 57121);
};

~bb.attach = {

	~bb.sendMsg("/", (\agent : "x", \action : "attach", \type : "maxAge", \id: "l01" ).asString);
	"attached!".postln;

};

~bb.action = {|e, ref|

};

)

~bb.init()
~bb.attach()

/*

[ Two Windows appear, one with QueryString x the other QueryString y ]

- Window X is started through SuperCollider

- A sound process is attached to X, maxAge
- A second sound process is attached to X, averageEnergy
- (we set to a new CA scene)
- Things run a bit ....

- Window Y is started through SuperCollider
- A sound process is attached to Y, minAge
- Scene conditions are set to X, if averageAge reaches a threshold then we shift to another scene
- A second sound process is attached to Y, maxEnergy
- Things run a bit ....

- Both change scenes (randomize function)

- Set resetting rule that loops Y
- Set resetting rule that randmizes X

*/

// sudo killall coreaudiod

n = NetAddr.new("127.0.0.1", 57121);
"open -n -a safari http://localhost:3000/?agent=x".unixCmd;
"open -n -a safari http://localhost:3000/?agent=y".unixCmd;

Ndef.clear;

// Script!

// start the animation and attach the first process
(

n.sendMsg("/", (\agent : "x", \action : "start").asString);
n.sendMsg("/", (\agent : "x", \action : "attach", \type : "maxAge", \id: "x01" ).asString);
n.sendMsg("/", (\agent : "x", \action : "attach", \type : "avergaAge", \id: "x02" ).asString);

// totalAge, 6-10k
// maxAge, from 19 but around 150

Ndef(\nanite, {|nf=3, sf=0.0007, hpf=20000|
	HPF.ar(Nanite.ar(nf, surface:sf, freqShift:50.neg),
	EnvGen.ar(Env([20,100,1000,8000,18000],[13,12,14,22], 'sine'))
) * 2 }).play;

OSCdef(\ox, {|msg, time|
	var obj = msg[1].asString.split($ ); // obj.postln;

    if(obj[0] == "x" && obj[1] == "x01", {
		Ndef(\nanite).set(\nf, (obj[2].asInteger.linlin(100,400,40,200) * 0.08));
	});

}, "\scjs");

)

(
// attach the second process and shift scene
n.sendMsg("/", (\agent : "x", \action : "attach", \type : "averageEnergy", \id: "l02" ).asString);

n.sendMsg("/", (\agent : "x", \action : "scene", \index : 1).asString);

Ndef(\depfm, {|freqMin=5, freqMax=10, mul=20, add=80, rate=0.5, modFreq=2100, index=0.3, amp=0.5|
	var trig, seq, freq;
	trig = Impulse.kr(rate);
    seq = Diwhite(freqMin, freqMax, inf).midicps;
	freq = Demand.kr(trig, 0, seq);
	HPF.ar(PMOsc.ar(LFCub.kr([freq, freq/2], 0, mul, add), modFreq, index) * 0.4 * amp, 30)
}).play

)


// 02

// Window Y is started through SuperCollider and a sound process is attached to Y, minAge
(
n.sendMsg("/", (\agent : "y", \action : "start").asString);
n.sendMsg("/", (\agent : "y", \action : "scene", \index : 4).asString);
n.sendMsg("/", (\agent : "y", \action : "attach", \type : "averageEnergy", \id: "y01" ).asString);

Ndef(\bloded, { |freq=90, modFreq=11, harms=150|
	var son = Splay.ar ( HPF.ar(Blip.ar( Array.series(4, freq, 5), harms).fold2(SinOsc.ar(Array.series(4, modFreq, modFreq/2))), 30)) * 0.6;
	son = BBandStop.ar(son, LFNoise1.ar(1).exprange(100, 8000), 8);
	LPF.ar(son, 12000)
}).play;

OSCdef(\oy, {|msg, time|
	var obj = msg[1].asString.split($ ); // obj.postln;

    if(obj[0] == "y" && obj[1] == "y01", {
		"mySaw".postln;
		Synth(\mySawster, [\freq, obj[2].asInteger.linlin(7,20,1900,2000).postln]);
	});

}, "\scjs");

)

// A second sound process is attached to Y, maxEnergy
(
n.sendMsg("/", (\agent : "y", \action : "attach", \type : "maxAge", \id: "y02" ).asString);

Ndef(\demwav, {
	var signal;
	signal = DemandEnvGen.ar(
		Dseq([-1, 0.1,  Dwhite(-0.1, 0.1, 5), Dwhite(-0.2, 0.2, 5)], inf),
		SampleDur.ir * 1.1, 1, 0,  1, Impulse.ar([10, 40]))
	* XLine.ar(0.001, 0.1, 10) * EnvGen.ar(Env([0,1,1,0],[1,22,14], 'sine'));
	BPeakEQ.ar(signal, 10000, 4, EnvGen.ar(Env([0, -1, -7], [4, 12])));
}).play;

n.sendMsg("/", (\agent : "y", \action : "scene", \index : 5).asString);
)


/// WE ARE HERE !!! THE SOUNDS SHOULD CHANGE !!

// Change scene (need better scenes)
(
n.sendMsg("/", (\agent : "x", \action : "scene", \index : 2).asString);
n.sendMsg("/", (\agent : "y", \action : "scene", \index : 6).asString);

Ndef(\bloded, { |freq=90, modFreq=11, harms=150|
	var son = Splay.ar ( HPF.ar(Blip.ar( Array.series(14, freq, 5), harms).fold2(SinOsc.ar(Array.series(4, modFreq, modFreq/2))), 30)) * 0.6;
	son = BBandStop.ar(son, LFNoise1.ar(1).exprange(100, 8000), 8);
	LPF.ar(son, LFNoise1.ar(1).range(20,400))
});

Ndef(\depfm, {|freqMin=1, freqMax=2, mul=20, add=80, rate=0.5, modFreq=8100, index=0.3, amp=0.5|
	var trig, seq, freq;
	trig = Impulse.kr(rate);
    seq = Diwhite(freqMin, freqMax, inf).midicps;
	freq = Demand.kr(trig, 0, seq);
	HPF.ar(PMOsc.ar(LFCub.kr([freq, freq/2], 0, mul, add), modFreq, index) * 0.4 * amp, 30)
});

Ndef(\demwav, {
	var signal;
	signal = DemandEnvGen.ar(
		Dseq([-1, 0.1,  Dwhite(-0.1, 0.1, 5), Dwhite(-0.2, 0.2, 5)], inf),
		SampleDur.ir * LFNoise1.ar(8).range(1.096, 1.1), 1, 0,  1, Impulse.ar([10, 40]))
	* 0.07 *  LFNoise1.ar(18).range(0.1, 0.9);
	BPeakEQ.ar(signal, LFNoise1.ar(18).range(100, 10000), 18, EnvGen.ar(Env([0, -1, -7, 0], [4, 2, 3]).circle));
});

)

// Set a condition that loops the simulation

(
n.sendMsg("/", (\agent : "y", \action : "scene", \index : 8).asString);
n.sendMsg("/", (\agent : "y", \action : "attach", \type : "totalEnergy", \id: "y04" ).asString);
OSCdef(\oy, {|msg, time|
	var obj = msg[1].asString.split($ ); // obj.postln;

	// condition (loop needs to be shorter)
	if(obj[0] == "y" && obj[1] == "y04", {
		var value = obj[2].asInteger;

		if(value.postln > 50000, {
			n.sendMsg("/", (\agent : "y", \action : "scene", \index : 6).asString);
		})
	});

}, "\scjs");


Ndef(\demwav, {
	var signal;
	signal = LPF.ar(DemandEnvGen.ar(
		Dseq([-1, 0.1,  Dwhite(-0.1, 0.1, 5), Dwhite(-0.2, 0.2, 5)], inf),
		SampleDur.ir * LFNoise1.ar(8).range(1.096, 1.1), 1, 0,  1, Impulse.ar([10, 40]))
	* 0.07 *  LFNoise1.ar(18).range(0.1, 0.9), Line.ar(8000,400,3));
	BPeakEQ.ar(signal, LFNoise1.ar(18).range(100, 10000), 18, EnvGen.ar(Env([0, -1, -7, 0], [4, 2, 3]).circle))
});


)


// Set a condition that randomizes X

(

n.sendMsg("/", (\agent : "x", \action : "scene", \index : 7).asString);
n.sendMsg("/", (\agent : "y", \action : "scene", \index : 8).asString);

)

// Kill the thing!

(

n.sendMsg("/", (\agent : "x", \action : "destroy").asString);
n.sendMsg("/", (\agent : "y", \action : "destroy").asString);

)


//
// (
// n.sendMsg("/", (\agent : "x", \action : "attach", \type : "maxAge", \id: "x04" ).asString);
//
// OSCdef(\oxx, {|msg, time|
// 	var obj = msg[1].asString.split($ ); // obj.postln;
//
// 	// condition (loop needs to be shorter)
// 	if(obj[0] == "x" && obj[1] == "x04", {
// 		var value = obj[2].asInteger;
//
// 		if(value > 30, {
// 			value.postln;
// 			n.sendMsg("/", (\agent : "x", \action : "scene", \index : rrand(0,4)).asString);
// 		})
// 	});
//
// }, "\scjs");
//
// )

// Set a condition that analyses sound and changes the simulations?

// Add and detach more processes?






// Test!


n.sendMsg("/", (\agent : "x", \action : "start").asString); n.sendMsg("/", (\agent : "x", \action : "scene", \index : 3).asString);

n.sendMsg("/", (\agent : "x", \action : "start").asString); n.sendMsg("/", (\agent : "x", \action : "scene", \index : 4).asString);

n.sendMsg("/", (\agent : "x", \action : "scene", \index : ).asString);



n.sendMsg("/", (\agent : "x", \action : "scene", \index : 0).asString);
n.sendMsg("/", (\agent : "x", \action : "scene", \index : 2).asString);

n.sendMsg("/", (\agent : "x", \action : "rscene").asString);


n.sendMsg("/", (\agent : "x", \action : "detach", \id: "l01" ).asString);

n.sendMsg("/", (\agent : "x", \action : "attach", \type : "averageEnergy", \id: "l02" ).asString);
n.sendMsg("/", (\agent : "x", \action : "detach", \id: "l02" ).asString);

n.sendMsg("/", (\agent : "x", \action : "stop").asString);
n.sendMsg("/", (\agent : "x", \action : "destroy").asString);


n.sendMsg("/", (\agent : "y", \action : "start").asString);
n.sendMsg("/", (\agent : "y", \action : "rscene").asString);


(  /// TERRA

// n.sendMsg("/", (\agent : "x", \action : "attach", \type : "averageEnergy", \id: "l02" ).asString);
// n.sendMsg("/", ( \action : "detach", \id: "l01" ).asString);

// Recieve from the Node Server
OSCdef(\x, {|msg, time|

	var obj = msg[1].asString.split($ );

	// obj.postln;

    if(obj[0] == "x" && obj[1] == "l01", {
		Synth(\mySine, [\freq, obj[2].asInteger.postln]);
	});

	if(obj[0] == "x" && obj[1] == "l02", {
		Synth(\mySine, [\freq, obj[2].asInteger.postln]);
	});

	/*

	if(obj[0] == "B", {
		Synth(\mySine, [\freq, msg[1].asInteger]);
	});

	if(msg[1].asString == "hundatussa", {
		"asdfasfdasdf".postln;
		// send back to the simulation !
		n.sendMsg("/hello", "there");
	});

	*/

}, "\scjs");

)

"open -n -a safari http://localhost:3000/?agent=x".unixCmd;
"open -n -a safari http://localhost:3000/?agent=y".unixCmd;
