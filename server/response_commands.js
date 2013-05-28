// Respond to commands
galaxy.addListener('message#meteor', function (from, message) {
	message = message.toLowerCase();

	if (message[0] === '!') {
		// It's a command!
		var words = message.match(/\w+/g);
		var command = message.match(/\S+/g)[0];
		switch (message) {
			case '!docs':
				galaxy.say('#meteor', 'That feature is coming soon...');
				break;
			case '!dataja':
				galaxy.say('#meteor', "Don't ask to ask, Just ask!");
				break;
			case '!ugt':
				galaxy.say('#meteor', "It is always morning when someone comes into a channel. We call that Universal Greeting Time http://www.total-knowledge.com/~ilya/mips/ugt.html")
				break;
			default:
				galaxy.say('#meteor', invalidCommandResponseList[ _.random(0, invalidCommandResponseList.length - 1) ]);
		}
	}
});

var invalidCommandResponseList = [
	"What's that? A command?",
	"Whiskey Tango Foxtrot rodger",
	"What am I supposed to say to that?",
	"!NotACommand",
	"!foobar",
	"! to you too",
	"!wtf",
	"!lalalalalalala",
	"I don't recognize that",
	"You talkin' to " + boldString("me") + "?",
	"! your momma",
	"!!!!! !?!?!?!?",
	"!... !... !... !... FLINCH!!!"
];