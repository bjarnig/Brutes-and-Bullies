
(

SynthDef(\mySynth, {|amp=0.2, freq=60, gate=1, atk=1, sus=1, rel=1|
	var env = EnvGen.ar(Env.perc, gate, doneAction:2);
	var sound = Impulse.ar(LFNoise1.ar([freq/10,freq/2], 200, 220), 0, 0.2);
	Out.ar(0, sound * env);
}).add;

SynthDef(\mySine, {|amp=0.2, freq=60, gate=1, atk=1, sus=1, rel=1|
	var env = EnvGen.ar(Env.perc, gate, doneAction:2);
	var sound = SinOsc.ar(LFNoise1.ar([freq/10,freq/2], 200, 220), 0, 0.1);
	Out.ar(0, sound * env);
}).add;

)

(  /// TERRA

n = NetAddr.new("127.0.0.1", 57121);

n.sendMsg("/", ( \action : "attach", \type : "maxAge", \id: "l01" ).asString);
n.sendMsg("/", ( \action : "attach", \type : "averageEnergy", \id: "l01" ).asString);
n.sendMsg("/", ( \action : "detach", \id: "l01" ).asString);

// Recieve from the Node Server
OSCdef(\x, {|msg, time|

	var obj = msg[1].asString.split($ );

	obj.postln;

/*	if(obj[0] == "A", {
		Synth(\mySynth, [\freq, msg[1].asInteger]);
	});

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

// "open -a safari http://localhost:3000".unixCmd;

"open -a safari http://localhost:3000/?agent=2".unixCmd;

"open -a safari http://localhost:3000/?agent=1".unixCmd;

