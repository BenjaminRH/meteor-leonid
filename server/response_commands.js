// Respond to commands
galaxy.addListener('message#meteor', function (from, message) {
	lowerMessage = message.toLowerCase();

	if (message[0] === '!') {
		// It's a command!
		var words = lowerMessage.match(/\w+/g).slice(1);
		var command = lowerMessage.match(/\S+/g)[0];
		switch (command) {
			case '!np':
				var person = words.length === 0 ? "" : message.replace('!np ', '') + ": ";
				galaxy.say('#meteor', person + "No problem! " + from + " was happy to help. If you have any other questions, jump right in and ask!");
				break;
			case '!mrt':
			case '!meteorite':
				if (words.length === 0) {
					// Default information
					galaxy.say('#meteor', "Meteorite is a Meteor version manager and package manager. It provides an easy way to run different versions of Meteor, use non-core packages, and to install packages from the Atmosphere package repository. http://oortcloud.github.io/meteorite/");
				} else {
					// Info about a specific command
					console.log('Failed to document MRT, with "coming soon" notice'); // Debug
					galaxy.say('#meteor', "That feature is coming soon...");
				}
				break;
			case '!atmo':
			case '!atmosphere':
			case '!package':
			case '!packages':
			case '!pkg':
				if (words.length === 0) {
					// Default information
					galaxy.say('#meteor', "Atmosphere is a community-maintained Meteor smart package repository. It works with Meteorite, a Meteor version and smart package manager. https://atmosphere.meteor.com/");
				} else {
					// Info about a specific package
					var query = lowerMessage.replace('!atmo ', '').replace('!atmosphere ', '').replace('!package ', '').replace('!packages ', '');
					console.log('Package docs requested: ' + query); // Debug
					galaxy.say('#meteor', getPackageInfo(query));
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
			case '!devs':
			case '!people':
				galaxy.say('#meteor', 'The Meteor team: Geoff Schmidt (@immir), Matt DeBergalis (@debergalis), Nick Martin (@n1mmy), David Greenspan (@DavidLG), Avital Oliver, David Glasser (@glasser), Kristy Hilands (@khilands), Jade Wang (@qiqing), and Naomi Seyfer (@sixolet)');
				break;
			case '!list':
			case '!commands':
				galaxy.say('#meteor', "[GALAXY HELP]: " + listCommands());
				break;
			case '!command':
			case '!help':
				if (words.length > 0) {
					var query = lowerMessage.replace('!command ', '').replace('!help ', '');
					galaxy.say('#meteor', "[GALAXY HELP]: " + helpCommand(query));
				} else {
					galaxy.say('#meteor', "[GALAXY HELP]: " + listCommands());
				}
				break;
			default:
				galaxy.say(from, invalidCommandResponseList[ _.random(0, invalidCommandResponseList.length - 1) ]);
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

var commands = [
	[['!mrt', '!meteorite'], ["Basic information about Meteorite. Aliases: $aliases"]],
	[['!atmo', '!atmosphere', '!package', '!pkg', '!packages'], ["Usage: $command <package>. Lookup an Atmosphere package. If used without an argument, basic information about Atmosphere. Aliases: $aliases"]],
	[['!list', '!commands'], ["List of Galaxy commands"]],
	[['!command', '!help'], ["Usage: $command <command>. Lookup a Galaxy command, and provide information about it. Aliases: $aliases"]],
	[['!devs', '!people'], ["Members of the Meteor team"]],
	[['!np'], ["Usage: !np <user>. Provides a 'no problem' message when a user thanks you for your help. If used without an argument, does not address the message to the specific user you helped"]],
	[['!dataja'], ["'Don't ask to ask, Just ask!'"]],
	[['!ugt'], ["Basic information about Universal Greeting Time"]]
];

// Get list of all commands separately
var allCommands = [];
_.each(commands, function (item) {
	allCommands.push(item[0]);
});
allCommands = _.flatten(allCommands);

// List of Galaxy bot commands
var listCommands = function () {
	list = [];
	_.each(commands, function (command) {
		list.push(command[0][0]);
	});
	return "Available commands (use !command <command> for specific info on a command): " + list.join(', ');
}

// Specific help on a command
var helpCommand = function (command) {
	if (command[0] !== '!')
		command = '!' + command;

	var result = _.filter(commands, function (item) {
		return _.contains(item[0], command);
	})[0];

	if (typeof result === 'undefined' || result.length === 0) {
		// No matching command.
		var similarCommands = similarGalaxyCommands(command);
		if (similarCommands === false) {
			// There were no similar commands either
			return "Sorry, I could not find that command, or any similar commands. " + listCommands();
		} else {
			// There were similar commands!
			return "I could not find any command '" + command + "'. Perhaps you meant one of these: " + similarCommands.join(', ');
		}
	}

	var info = result[1][0];
	var aliases = result[0].join(', ');

	return info.replace('$command', command).replace('$aliases', aliases);
}

// Get similar Galaxy commands
var similarGalaxyCommands = function (query) {
	var results = _.filter(allCommands, function (command) {
		return command.score(query) > 0.6;
	});

	if (results.length > 0) {
		// There were matching packages!
		return results;
	} else {
		// There were no matching packages
		return false;
	}
}

// Important package shit
var getPackageInfo = function (name) {
	if (GalaxyStore.loadedPackages === true) {
		// We've loaded the packages, continue
		var pkg = _.findWhere(atmosphere.collections.packages, { name: name });

		if (typeof pkg !== 'undefined') {
			// Whee! Give them the package
			var sep = boldString("; ");

			return "[PACKAGE INFO]: " +
				boldString(pkg.name) +sep+
				"Current version: " + pkg.latest +sep+
				"Description: " + pkg.description +sep+
				"By: " + pkg.author.name +sep+
				pkg.homepage;
		}
		else if (typeof pkg === 'undefined') {
			// That package doesn't exist
			var similar = findSimilar(name, atmosphere.collections.packages, 'name');

			if (similar !== false) {
				// There are similar packages!
				return "[PACKAGE INFO]: " +
					"I could not find any package named '" + name + "'. " +
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
var findSimilar = function (query, collection, property) {
	// Find matching packages
	var results = _.filter(
		collection,
		function (thing) {
			return thing[property].score(query) > 0.6;
		}
	);

	if (typeof results !== 'undefined' || results.length === 0) {
		// There were no matching packages
		return false;
	}

	// Take just the name property
	results = _.pluck(results, property);

	// Change package names to lower case
	results = _.map(results, function (value) {
		return value.toLowerCase();
	});

	return results; // Finally, give them results
}