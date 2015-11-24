
function generate(){
	document.getElementById("generated").innerHTML = apology[getRandomInt(0,apology.length-1)] + subject[getRandomInt(0,subject.length-1)] + action[getRandomInt(0,action.length-1)];
}

function getRandomInt(minimum,maximum){
	return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}
var apology = [ 
 					"I would be playing better, but ", 
 
 					"The only reason my KD is so low is that ", 
 
 					"I would be carrying the team, but ", 
 
 					"I'm only losing because ", 
 
 					"My ranking would be higher, but ", 
 
 					"I'd be top of the team, except ",
					
					"We'd be doing better, but ",
					
					"I'd have better REQ cards, except ",
					
					"I would have finished the campaign, except "
]; 
var subject = [ 
 					"343i ", 
 
 					"my controller ", 
 
 					"my headset ", 
 
 					"the other team ", 
 
 					"my internet ", 
 
 					"my xbox ",
					
					"the new update ",
					
					"ground pound ",
					
					"clamber ",
					
					"this needler ",
					
					"Master Chief ",
					
					"Spartan Locke ",
					
					"the hydra ",
					
					"Breakout ",
					
					"Warzone ",
					
					"the ranking system ",
					
					"my spartan company ",
					
					"the Warden Eternal ",
					
					"Cortana ",
					
					"Greenskull ",
					
					"my mom ",
					
					"my aim ",
					
					"my bag of Doritos ",
					
					"that Mountain Dew ",
					
					"my left thumbstick ",
					
					"The Arbiter ",
					
					"Mr. Fruit ",
					
					"my TV ",
					
					"this dedicated server ",
					
					"my knee ",
					
					"Bill Gates ",
					
					"Rhabby_V ",
					
					"my hdmi cord ",
					
					"that warthog ",
					
					"this grunt "
	
];
var action = [ 
 					"is lagging.", 
 
 					"is broken.", 
 
 					"is hacking.", 
 
 					"hurts my eyes.", 
 
 					"hates me.", 
 
 					"is over powered.",
					
					"needs to be buffed.",
					
					"is evil!",
					
					"is bad.",
					
					"throws off my aim.",
					
					"keeps camping.",
					
					"is spawn killing me.",
					
					"has a sniper.",
					
					"is a noob.",
					
					"is distracting me.",
					
					"is on fire.",
					
					"keeps yelling at me.",
					
					"keeps screen peeking.",
					
					"is looking at me funny.",
					
					"is spooky."
];

