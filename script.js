function Game(name, options) {

  var actions = options.actions;
  var steps = options.steps;
  var count = 0;
  var correctAnswer;
  var causeOfDeath;

  var play = function () {
    var step = steps[count];
    correctAnswer = actions[step.prompt].options[step.answer];
    causeOfDeath = step.die;
    console.log(step.message);
    utils.showPrompt(actions[step.prompt]);
    count++;
  };

  var utils = {
    outputChoices: function (arr) {
      var output = '';
      var length = arr.length - 1;
      arr.forEach(function (e, i) {
        output += (i !== length) ? e + ', ' : e;
      });
      return output;
    },
    readInput: function (input) {
      console.log(input);
      if (input !== correctAnswer) {
        console.log(causeOfDeath);
      } else {
        play(count);
      }
    },
    showPrompt: function (option) {
      console.log(option.prompt + '(' + utils.outputChoices(option.options) + ')');
    }
  };

  var directions = function () {
    console.log(name + '\n' + 'To make a move use player.move(). Refresh to start again.\n---------------------------------------------------------\n');
  };

  // public methods

  this.player = {
    move: function (input) {
      utils.readInput(input);
    },
    end: function () {
      console.log('quitter');
    }
  };

  this.init = function () {
    directions();
    play();
  };
}

var game = new Game('Westward Bound', {
  actions: {
    cardinalDirections: {
      prompt: 'What direction should do go? ',
      options: [
        'North',
        'South',
        'East',
        'West'
      ]
    },
    driverStatus: {
      prompt: 'What should you do? ',
      options: [
        'Sleep',
        'Coffee',
        'Drive'
      ]
    },
    restaurants: {
      prompt: 'Where shall you eat? ',
      options: [
        'IHOP',
        'Waffle House',
        'Hotel Restaurant',
        'Gas station snacks'
      ]
    }
  },
  steps: [
    {
      message: 'You have to drive a truck with a trailer across the country from New York to Colorado in the winter.\nThere is a blizzard to the West.',
      prompt: 'cardinalDirections',
      answer: 1,
      die: 'White out conditions. Snow piles up beyond the tail pipe. You die sleepily in your vehicle awaiting rescue.'
    }, {
      message: 'You get to Washington DC and the roads are fairly dry.',
      prompt: 'cardinalDirections',
      answer: 3,
      die: 'You die in a horrific accident. Too bad about your life.'
    }, {
      message: 'You get to the foothills of the Appalachians after a long day. ',
      prompt: 'driverStatus',
      answer: 0,
      die: 'You tumble off the highway and are never seen again.'
    }, {
      message: 'You awake. Well rested but hungry. ',
      prompt: 'restaurants',
      answer: 1,
      die: 'You lose a day to indigestion.'
    }, {
      message: 'The mountains are now behind you and the Great Plains stretch toward the horizon.\n ',
      prompt: 'cardinalDirections',
      answer: 1,
      die: 'You are going the wrong way. Refer to a map.'
    }, {
      message: 'Welcome to your new life in the Rockies. \nMake wise decisions. \n"Live long and prosper"'
    }
  ]
});

var player = game.player;

if (window.console) {
  game.init();
} else {
  document.getElementsByTagName('h1')[0].innerHTML = 'Gotta use a different browser.';
}
