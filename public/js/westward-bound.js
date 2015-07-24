var game = new Game('Westward Bound', {
	actions : {
		cardinalDirections : {
			prompt   : 'What direction should do go? ',
			options  : [
				'North' ,
				'South' ,
				'East'  ,
				'West'
			]
		},
		driverStatus : {
			prompt  : 'What should you do? ',
			options : [
				'Sleep'  ,
				'Coffee' ,
				'Drive'
			]
		},
		restaurants  : {
			prompt: 'Where shall you eat? ',
			options: [
				'IHOP'               ,
				'Waffle House'       ,
				'Hotel Restaurant'   ,
				'Gas station snacks'
			]
		}
	},
	steps : [
		{
			intro:   'You have to drive a truck with a trailer across the country from New York to Colorado in the winter.\nThere is a blizzard to the West.',
			actions: 'cardinalDirections',
			die:     'White out conditions. Snow piles up beyond the tail pipe. You die sleepily in your vehicle awaiting rescue.'
		}
	]
});

var player = game.player;

if (window.console)
{
	game.init();
}
else
{
	document.getElementsByTagName('h1')[0].innerHTML = 'Gotta use a different browser.';
}