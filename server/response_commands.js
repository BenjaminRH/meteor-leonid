// Respond to commands
galaxy.addListener('message#meteor', function (from, message) {
	message = message.toLowerCase();

	if (message[0] === '!') {
		// It's a command!
		var words = message.match(/\w+/g).slice(1);
		var command = message.match(/\S+/g)[0];
		switch (command) {
			case '!np':
			galaxy.say('#meteor', "No problem! " + from + " was happy to help. If you have any other questions, jump right in and ask!");
			break;
			case '!mrt':
			case '!meteorite':
			if (words.length === 0) {
					// Default information
					galaxy.say('#meteor', "Meteorite is a Meteor version manager and package manager. It provides an easy way to run different versions of Meteor, use non-core packages, and to install packages from the Atmosphere package repository. http://oortcloud.github.io/meteorite/");
				} else {
					// Info about a specific command
					galaxy.say('#meteor', "That feature is coming soon...");
				}
				break;
				case '!atmo':
				case '!atmosphere':
				case '!package':
				case '!packages':
				if (words.length === 0) {
					// Default information
					galaxy.say('#meteor', "Atmosphere is a community-maintained Meteor smart package repository. It works with Meteorite, a Meteor version and smart package manager. https://atmosphere.meteor.com/");
				} else {
					// Info about a specific package
					galaxy.say('#meteor', getPackageInfo(words[0]));
				}
				break;
				case '!docs':
				galaxy.say('#meteor', "That feature is coming soon...");
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

// Say important package shit
var getPackageInfo = function (name) {
	if (GalaxyStore.loadedPackages === true) {
		// We've loaded the packages, continue
		var pkg = _.findWhere(atmosphere.collections.packages, { name: name });

		if (pkg !== undefined) {
			// Whee! Give them the package
			var sep = boldString("; ");

			return "[PACKAGE INFO]: " +
				boldString(pkg.name) +sep+
				"Current version: " + pkg.latest +sep+
				"Description: " + pkg.description +sep+
				"By: " + pkg.author.name +sep+
				pkg.homepage;
		}
		else if (pkg === undefined) {
			// That package doesn't exist
			var similar = searchPackages(name);

			if (similar !== false) {
				// There are similar packages!
				return "[PACKAGE INFO]: " +
					"I could not find any package named '" + pkg.name + "'. " +
					"Perhaps you meant one of these: " +
					similar.join(', ');
			} else {
				// There are no similar packages either
				return "Sorry, I could not find that package, or any similar packages.";
			}
		}
	} else {
		// We have NOT loaded the packages
		return "We're currently loading the Atmosphere package information. Please check back soon.";
	}
}

// Search for package
var searchPackages = function (query) {
	// Find matching packages
	var results = _.filter(
		atmosphere.collections.packages,
		function (pkg) {
			return pkg.name.score(query) > 0.65;
		}
	);

	if (! results.length > 0) {
		// There were no matching packages
		return false;
	}

	// Take just the name property
	results = _.pluck(results, 'name');

	// Change package names to lower case
	results = _.map(results, function (value) {
		return value.toLowerCase();
	});

	return results; // Finally, give them results
}