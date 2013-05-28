// Create the bot
galaxy = new IRC.Client("irc.freenode.net", "Galaxy", {
	channels: ["#meteor"],
	userName: "galaxy",
	realName: "Galaxy: The Meteor IRC Bot",
	floodProtection: true,
	floodProtectionDelay: 1000,
});

console.log('Loaded IRC'); // Startup message

// Catch errors
galaxy.addListener('error', function (message) {
	console.log('IRC Error: ', message);
});

var keepServer = function () {
	// Random bla
	console.log('Bump server online status');
}

// Ensure the server remains online
Meteor.setInterval(keepServer, 1000*60*5);

// Define the object
GalaxyStore = {};
GalaxyStore.loadedPackages = false;


// CONNECT WITH ATMOSPHERE PACKAGE REPOSITORY
atmosphere = new DDPClient({
	host: "atmosphere.meteor.com", 
	port: 80
});

atmosphere.connect(function (error) {
	if (error) {
		// DDP connection error
		console.log('Error connecting to Atmosphere');
		return;
	}

	atmosphere.subscribe('packages', [], function () {
		// Packages have been loaded!
		GalaxyStore.loadedPackages = true;
		console.log('Loaded Atmosphere packages');
		// atmosphere.collections.packages
	});
});