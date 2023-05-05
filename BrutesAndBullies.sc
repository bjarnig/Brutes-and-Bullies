// Copy to SuperCollider Extensions

BrutesAndBullies {

	 var <>n;

    init {|addr="127.0.0.1",port=57121|

        "## init brutes and bullies ##".postln;

        Ndef.clear;
        this.n = NetAddr.new(addr, port);
    }

    browsers {

        "open -n -a safari http://localhost:3000/?agent=x".unixCmd;
        "open -n -a safari http://localhost:3000/?agent=y".unixCmd;
    }

    bind {|scene|

        ("## binding. " ++ scene).postln;

    }

    attach {|agent="x", snd="nanite", type="maxAge", param="x", min, max|

        n.sendMsg("/", (\agent : agent, \action : "attach", \type : type, \id: snd).asString);

        ("## attaching. "++agent++":"++snd.asString()).postln;
    }

    detach {|agent="x", snd="nanite", type="maxAge"|

        ("detatch:" + agent + snd + type).postln;  
        n.sendMsg("/", (\agent : agent, \action : "detach", \type : type, \id: snd).asString);
        OSCdef(("attach."++snd), {});
    }

    detachAll {
        
        "detatch:all".postln;  
        n.sendMsg("/", (\agent : "x", \action : "detachAll").asString);
        n.sendMsg("/", (\agent : "y", \action : "detachAll").asString);
        OSCdef.freeAll;
    }

    scene {|agent, scene, factor=0.8|
        n.sendMsg("/", (\agent : "x", \action : "scene", \index : scene).asString);
    }

    focus {|agent, scene|
        n.sendMsg("/", (\agent : agent, \action : "scene", \index : scene).asString);
    }

    iterate{|scene="inv",times=10,a="x",b="y",sa=4,sb=7|

    }

    start {|ref="x"|

        n.sendMsg("/", (\agent : ref, \action : "start").asString);

        if(ref == "y", {
            n.sendMsg("/", (\agent : "y", \action : "scene", \index : 6).asString);
        })
    }

    redirect {|ref="x", type="a"|
        n.sendMsg("/", (\agent : ref, \action : "redirect", \type: type).asString);
    }

    sharpen {|ref="x", type="a"|
        n.sendMsg("/", (\agent : ref, \action : "redirect", \type: type).asString);
    }

    focusIter {|agent, times=5, wait=1|
        
    }

    fold {|ref="x"|

    }

    seed {|ref="x"|
   
    }

    terminate {|self, ref="x"|

    }
}
