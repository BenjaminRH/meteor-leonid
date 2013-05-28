// Create the bot
galaxy = new IRC.Client("irc.freenode.net", "Galaxy", {
	channels: ["#meteor"],
	userName: "galaxy",
	realName: "Galaxy: The Meteor IRC Bot",
	floodProtection: true,
	floodProtectionDelay: 1000,
});

// Catch errors
galaxy.addListener('error', function (message) {
	console.log('IRC Error: ', message);
});

// Define the object
GalaxyStore = {};