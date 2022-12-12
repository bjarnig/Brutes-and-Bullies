
(  /// TERRA

n = NetAddr.new("127.0.0.1", 57121);    // create the NetAddr
// send the application the message "hello" with the parameter "there"

// Recieve from the Node Server
OSCdef(\x, {|msg, time|

	// var mapped = msg[1].asInteger * 0.01;

	msg[1].postln;

	if(msg[1].asString == "hundatussa", {
		"asdfasfdasdf".postln;
		// send back to the simulation !
		n.sendMsg("/hello", "there");
	});

}, "\scjs");

)

"open -a safari http://localhost:3000".unixCmd;


