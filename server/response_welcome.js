// Listen for joins
galaxy.addListener("join", function (channel, who) {
	// Welcome them
	if (who !== 'Galaxy') {
		galaxy.say(channel, randomHello(who));
		GalaxyStore.lastWelcomed = who; // Set this for welcoming confusion
	}
});

// Random message generator
var randomHello = function (name) {
	var prop = _.shuffle(_.keys(helloList))[0];
	return helloList[prop] + " " + name + "! (that's \"hello\" in " + prop + ")";
}

// Respond to confused queries about my bot-ly welcoming
galaxy.addListener('message#meteor', function (from, message) {
	if (GalaxyStore.lastWelcomed === from) {
		// I just welcomed somebody! This may have something to do with me
		reaction = message.toLowerCase().match(/[a-zA-Z]+/g)[0];
		if (_.contains(wtfList, reaction)) {
			// Probably confused. Let's clue them in.
			galaxy.say('#meteor', from + ': ' + "If you're confused about the greeting, you may find it helpful to know that I'm the Meteor IRC bot! Check out what I can do at http://galaxy.meteor.com");
		}

		GalaxyStore.lastWelcomed = null; // Reset
	}
});

var wtfList = [
	'wtf',
	'wat',
	'what',
	'wut',
	'what',
	'huh',
	'uh',
	'um',
	'umm'
];

// Hello object
var helloList = {
	Afrikaans: "Hallo",
	Amharic: "Selam",
	Arabic: "Ahalan",
	Armenian: "Parev",
	Azerbaijani: "Salam",
	Basque: "Kaixo",
	Bengali: "Ei Je",
	Bosnian: "Zdravo",
	Breton: "Demat",
	Bulgarian: "Zdravei",
	Cantonese: "Nei ho",
	Catalan: "Hola",
	Cornish: "Dydh da",
	Creole: "Alo",
	Croatian: "Bok",
	Danish: "Hej",
	Dutch: "Goede dag",
	Esperanto: "Saluton",
	Estonian: "Tere",
	Eurish: "Salve",
	Farsi: "Sa'lam",
	Finnish: "Hei",
	French: "Bonjour",
	Frisian: "Goeie",
	German: "Guten Tag",
	Hawaiian: "Aloha",
	Hebrew: "Shalom",
	Hindi: "Namaste",
	Ido: "Bona jorno",
	Indonesian: "Halo",
	Interlingua: "Salute",
	Irish: "Dia dhuit",
	Italian: "Ciao",
	Japanese: "Kon-nichiwa",
	Korean: "An-nyong Ha-se-yo",
	Latin: "Salve",
	Malaysian: "Helo",
	Mandarin: "Ni hao",
	Norwegian: "Hallo",
	Polish: "Dzien dobry",
	Quecha: "Allillanchu",
	Russian: "Zdravstvuyte",
	Serbian: "Zdravo",
	Sesotho: "Helele",
	Spanish: "Hola",
	Swahili: "Jambo",
	Swedish: "Hej",
	Tagalog: "Kumusta",
	Thai: "Sa-wat-dee",
	Tswana: "Dumela",
	Turkish: "Merhaba",
	Ukrainian: "Vitayu",
	Welsh: "Hylo",
	Zulu: "Sawubona"
}