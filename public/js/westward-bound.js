var WB = NewGame('Westward Bound', {
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
	steps: [
	{
		message: 'You have to drive a truck with a trailer across the country from New York to Colorado in the winter.\nThere is a blizzard to the West.',
		prompt:  'cardinalDirections',
		answer:  1,
		die:    'White out conditions. Snow piles up beyond the tail pipe. You die sleepily in your vehicle awaiting rescue.'
	},
	{
		message: 'You get to Washington DC and the roads are fairly dry.',
		prompt:  'cardinalDirections',
		answer:  3,
		die:     'You die in a horrific accident. Too bad about your life.'
	},
	{
		message: 'You get to the foothills of the Appalachians after a long day. ',
		prompt:  'driverStatus',
		answer:  0,
		die:     'You tumble off the highway and are never seen again.'
	},
	{
		message: 'You awake. Well rested but hungry. ',
		prompt:   'restaurants',
		answer:   2,
		die:      'You lose a day to indigestion.'
	},
	{
		message: 'The mountains are now behind you and the Great Plains stretch toward the horizon.\n ',
		prompt:  'cardinalDirections',
		answer:  3,
		die:     'You are going the wrong way. Refer to a map.'
	},
	{
		message: 'Welcome to your new life in the Rockies. \nMake wise decisions. \n"Live long and prosper"'
	}
	]
});