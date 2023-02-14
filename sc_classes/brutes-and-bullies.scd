
(

~bb = ();

~bb.init = {|e, addr="127.0.0.1",port=57121|

	"## init brutes and bullies ##".postln;

	Ndef.clear;
	~bb.net = NetAddr.new(addr, port);
};

~bb.browsers = {

	"open -n -a safari http://localhost:3000/?agent=x".unixCmd;
	"open -n -a safari http://localhost:3000/?agent=y".unixCmd;
};

~bb.action = {

};

~bb.attach = {|e, ref="x", agent="nanite", type="maxAge"|

	if(agent == "nanite", {

		n.sendMsg("/", (\agent : "x", \action : "attach", \type :type, \id: "x01" ).asString);

		Ndef(agent.asSymbol, {|nf=3, sf=0.0007, hpf=20000|
			HPF.ar(Nanite.ar(nf, surface:sf, freqShift:50.neg),
				EnvGen.ar(Env([19900,100,300,8000,18000],[0.2,22,14,22], 'sine'))
		) * 2 }).play;

		OSCdef(\ox, {|msg, time|
			var obj = msg[1].asString.split($ );
			if(obj[0] == "x" && obj[1] == "x01", {
				Ndef(agent.asSymbol).set(\nf, (obj[2].asInteger.linlin(100,400,40,200) * 0.08));
			});
		}, "\scjs");
	});

	if(agent == "depfm", {

		n.sendMsg("/", (\agent : "x", \action : "attach", \type : "averageEnergy", \id: "l02" ).asString);
		n.sendMsg("/", (\agent : "x", \action : "scene", \index : 1).asString);

		Ndef(\depfm, {|freqMin=5, freqMax=10, mul=20, add=80, rate=0.5, modFreq=2100, index=0.3, amp=0.5|
			var trig, seq, freq;
			trig = Impulse.kr(rate);
			seq = Diwhite(freqMin, freqMax, inf).midicps;
			freq = Demand.kr(trig, 0, seq);
			HPF.ar(PMOsc.ar(LFCub.kr([freq, freq/2], 0, mul, add), modFreq, index) * 0.4 * amp, 30)
		}).play
	});

	if(agent == "bloded", {

		n.sendMsg("/", (\agent : "y", \action : "scene", \index : 4).asString);
		n.sendMsg("/", (\agent : "y", \action : "attach", \type : "averageEnergy", \id: "y01" ).asString);

		Ndef(\bloded, { |freq=90, modFreq=11, harms=150|
			var son = Splay.ar ( HPF.ar(Blip.ar( Array.series(4, freq, 5), harms).fold2(
				SinOsc.ar(Array.series(4, modFreq, modFreq/2))), 30)) * 0.6;
			son = BBandStop.ar(son, LFNoise1.ar(1).exprange(100, 8000), 8);
			LPF.ar(son, 12000)
		}).play;

		OSCdef(\oy, {|msg, time|
			var obj = msg[1].asString.split($ );
			if(obj[0] == "y" && obj[1] == "y01", {
				Synth(\mySawster, [\freq, obj[2].asInteger.linlin(7,20,1900,2000)]);
			});
		}, "\scjs");
	});

	if(agent == "demwav", {

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
	});
};

~bb.scene = {|e, agent, scene, factor=0.8|

	if(agent == ["x", "y"], {

		n.sendMsg("/", (\agent : "x", \action : "scene", \index : 2).asString);
		n.sendMsg("/", (\agent : "y", \action : "scene", \index : 6).asString);

		Ndef(\bloded, { |freq=90, modFreq=11, harms=150|
			var son = Splay.ar ( HPF.ar(Blip.ar( Array.series(14, freq, 5), harms).fold2(
				SinOsc.ar(Array.series(4, modFreq, modFreq/2))), 30)) * 0.6;
			son = BBandStop.ar(son, LFNoise1.ar(1).exprange(100, 8000), 8);
			LPF.ar(son, LFNoise1.ar(1).range(20,400))
		});

		Ndef(\depfm, {|freqMin=1, freqMax=2, mul=20, add=80, rate=0.5, modFreq=8100, index=0.3, amp=0.3|
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

		Ndef(\nanite, {|nf=3, sf=0.007, hpf=20000|
			HPF.ar(Nanite.ar(nf, surface:sf, freqShift:10.neg),
				EnvGen.ar(Env([19900,100,300,8000,18000],[0.2,22,14,22], 'sine'))
		) * 1.5 }).play;

	})
};

~bb.start = {|e, ref="x"|

	n.sendMsg("/", (\agent : ref, \action : "start").asString);

	if(ref == "y", {
		n.sendMsg("/", (\agent : "y", \action : "scene", \index : 6).asString);
	})
};

~bb.fold = {|e, ref="x"|

	n.sendMsg("/", (\agent : "y", \action : "scene", \index : 8).asString);
	n.sendMsg("/", (\agent : "x", \action : "scene", \index : 7).asString);
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

	Ndef(\bloded, { |freq=90, modFreq=11, harms=150|
			var son = Splay.ar ( HPF.ar(Blip.ar( Array.series(14, freq*2, 5), harms).fold2(
				SinOsc.ar(Array.series(4, modFreq, modFreq/2))), 30)) * 0.6;
			son = BBandStop.ar(son, LFNoise1.ar(11).exprange(100, 8000), 8);
			LPF.ar(son, LFNoise1.ar(10).range(20,1400))
		});

	Ndef(\demwav, {
		var signal;
		signal = LPF.ar(DemandEnvGen.ar(
			Dseq([-1, 0.1,  Dwhite(-0.1, 0.1, 5), Dwhite(-0.2, 0.2, 5)], inf),
			SampleDur.ir * LFNoise1.ar(8).range(0.096, 10.1), 1, 0,  1, Impulse.ar([10, 40]))
		* 0.07 *  LFNoise1.ar(18).range(0.1, 0.9), Line.ar(8000,400,3));
		BPeakEQ.ar(signal, LFNoise1.ar(18).range(100, 10000), 18, EnvGen.ar(Env([0, -1, -7, 0], [4, 2, 3]).circle))
	});

	Ndef(\depfm, {|freqMin=5, freqMax=10, mul=20, add=90, rate=0.5, modFreq=1100, index=0.3, amp=0.5|
			var trig, seq, freq;
			trig = Impulse.kr(rate);
			seq = Diwhite(freqMin, freqMax, inf).midicps;
			freq = Demand.kr(trig, 0, seq);
			HPF.ar(PMOsc.ar(LFCub.kr([freq, freq/2], 0, mul, add), modFreq, index) * 0.4 * amp, 30)
		});
};

~bb.seed = {|e, ref="x"|

	n.sendMsg("/", (\agent : "x", \action : "scene", \index : 7).asString);
    n.sendMsg("/", (\agent : "y", \action : "scene", \index : 8).asString);

		Ndef(\bloded, { |freq=90, modFreq=11, harms=150|
			var son = Splay.ar ( HPF.ar(Blip.ar( Array.series(14, freq*20.rand, 5), harms).fold2(
				SinOsc.ar(Array.series(4, modFreq, modFreq/9))), 30)) * 0.6;
			son = BBandStop.ar(son, LFNoise1.ar(11).exprange(100, 8000), 2);
			LPF.ar(son, LFNoise1.ar(10).range(20,1400))
		}).play;

	Ndef(\demwav, {
		var signal;
		signal = LPF.ar(DemandEnvGen.ar(
			Dseq([-1, 0.1,  Dwhite(-0.1, 0.1, 5), Dwhite(-0.2, 0.2, 5)], inf),
			SampleDur.ir * LFNoise1.ar(18).range(0.0096, 15.1), 1, 0,  1, Impulse.ar([10, 40]))
		* 0.07 *  LFNoise1.ar(18.rand).range(0.1, 0.9), Line.ar(8000,400,3));
		BPeakEQ.ar(signal, LFNoise1.ar(28).range(100, 10000), 18, EnvGen.ar(Env([0, -1, -7, 0], [4, 2, 3]).circle))
	}).play;

	Ndef(\depfm, {|freqMin=5, freqMax=10, mul=20, add=90, rate=0.5, modFreq=1100, index=1.3, amp=0.5|
			var trig, seq, freq;
			trig = Impulse.kr(rate);
			seq = Diwhite(freqMin, freqMax, inf).midicps;
			freq = Demand.kr(trig, 0, seq);
			HPF.ar(PMOsc.ar(LFCub.kr([freq, freq/2], 0, mul, add.rand), modFreq.rand, index.rand) * 0.4 * amp, 30)
		}).play;
};

~bb.terminate = {|e, ref="x"|

	n.sendMsg("/", (\agent : "x", \action : "destroy").asString);
	n.sendMsg("/", (\agent : "y", \action : "destroy").asString);

	o = OF(this);

	o.action.interrupt(\depfm);
	o.action.interrupt(\demwav);
	o.action.interrupt(\bloded);
	o.action.interrupt(\nanite);
}

)

// Script

x = BrutesAndBullies();

x.init()
x.start("x")
x.attach("x","nanite","maxAge")
x.attach("x","depfm","averageEnergy")
x.start("y")
x.attach("y","bloded")
x.scene( ["x","y"], [2,6])
x.fold( ["x","y"], "bloded")
x.seed()

x.terminate(this)

~bb.init()
~bb.start("x")
~bb.attach("x","nanite","maxAge")
~bb.attach("x","depfm","averageEnergy")
~bb.start("y")
~bb.attach("y","bloded")
~bb.scene( ["x","y"], [2,6])
~bb.fold( ["x","y"], "bloded")
~bb.seed()
~bb.terminate().terminate()

~bb.init()
~bb.start("x")
~bb.attach("x","nanite","maxAge")
~bb.attach("x","depfm","averageEnergy")
~bb.start("y")
~bb.attach("y","bloded")
~bb.scene( ["x","y"], [2,6])
~bb.fold( ["x","y"], "bloded")
~bb.seed()
~bb.terminate()

