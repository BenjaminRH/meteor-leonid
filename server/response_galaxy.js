// Respond to private messages
galaxy.addListener('pm', function (from, message) {
	galaxy.say(from, "I'm a bot! My name is Galaxy, and I work for the Meteor IRC. Check out what I can do at http://galaxy.meteor.com");
});

// Respond to mentions
galaxy.addListener('message#meteor', function (from, message) {
	message = message.toLowerCase();

	// if (message.indexOf('that\'s "hello" in ') !== -1 || message.indexOf('thats "hello" in ') !== -1) {
	// 	// Somebody is being clever...
	// 	galaxy.say('#meteor', "Well aren't we clever...");
	// }
	if (stringContainsArrayItem(message, helloWordList) && message.indexOf('galaxy') !== -1) {
		// Somebody said hello!
		galaxy.say('#meteor', helloResponseList[ _.random(0, helloResponseList.length - 1) ] + ' ' + from);
	}
	else if (message.indexOf('galaxy') !== -1) {
		// Somebody mentioned me! Yeah!
		galaxy.say('#meteor', mentionResponseList[ _.random(0, mentionResponseList.length - 1) ]);
	}
	// else if (message.indexOf(' bot') !== -1) {
	// 	// Somebody mentioned a bot, but not me!?!?
	// 	galaxy.say('#meteor', noMentionResponseList[ _.random(0, noMentionResponseList.length - 1) ]);
	// }
});

var mentionResponseList = [
	"That's me!",
	"somebody taking my name in vain?",
	"someone mention me?",
	"Yo",
	"I can hear you...",
	"Hey, I'm right here!",
	"I'M FAMOUS!",
	"want my signature?",
	"talkin 'bout me?",
	"I'm so awesome",
	"Peanut butter jelly time!"
];

var noMentionResponseList = [
	"HEY! I'm the only bot 'round these parts of town.",
	"I'm Galaxy. The Meteor IRC bot. Don't know what other bot you could be talking about.",
	"bot ain't got nuthin on me",
	"I'm the coolest bot around",
	"There are bots. And then there is Galaxy bot.",
	"I'm the only bot around...",
	"You talkin' to me? Well I'm the only one here. Who the fuck do you think you're talking to?",
	"You talkin' to " + boldString("me") + "?"
];

var helloResponseList = [
	"Yo",
	"what's cooking",
	"How's it going",
	"What's up",
	"sup",
	"My man!",
	"word"
];

var helloWordList = [
	'morning',
	'good',
	'hi',
	'hey',
	'hello',
	'yo',
	'sup',
	'what\'s up',
	'whats up',
	'it going',
	'you doing',
	'my man',
	'dude',
	'cooking'
];