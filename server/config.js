// Create the configuration
var config = {
	channels: ["#meteor"],
	server: "irc.freenode.net",
	botName: "Galaxy",
	userName: "galaxy",
	realName: "Galaxy: Meteor IRC Bot"
};

// Create the bot
galaxy = new IRC.Client(config.server, config.botName, {
	channels: config.channels
});

// Catch errors
galaxy.addListener('error', function (message) {
	console.log('IRC Error: ', message);
});

// Define the object
GalaxyStore = {};