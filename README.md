# console-game
Easter egg console.log game in the text based RPG fashion.

## Making a Game

To make a game call the NewGame function, passing it a game name (string) and options object.

Structure of the options object:

```
{
	actions : { // Actions available at various places in the game
		cardinalDirections : {
			prompt   : 'What direction should do go? ',  // This prompt is displayed immediately after the current step's message
			options  : [   // Possible actions to take with this action
				'North' ,
				'South' ,
				'East'  ,
				'West'
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
			message: '...',                // The message that greets the player when they reach this step of the game
			prompt:  'cardinalDirections', // Which of the actions (above) are available to the player at this step
			answer:  1,                    // The index of the correct answer in the current action's options
			die:     '...'                 // The message to display when an incorrect answer is picked at this step
		},
		{
			message: '...',
			prompt:  'restaurants',
			answer:  1,
			die:     '...'
		},
		{
			message: 'Welcome to your new life in the Rockies. \nMake wise decisions. \n"Live long and prosper"' // End game message
		}
	]
};
```

## License

Do with it what you will so long as you refer to this repo.
