function Game () {

  // private methods
  var options = {
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
    ]},
    restaurants: {
      prompt: 'Where shall you eat? ',
      options: [
        'IHOP',
        'Waffle House',
        'Hotel Restaurant',
        'Gas station snacks'
      ]
    }
  };

  var utils = {
    outputChoices: function (arr) {
      var output = '',
          length = arr.length - 1;
      arr.forEach(function (e, i, a) {
        output += (i !== length) ? e + ', ' : e;
      });
      return output;
    },
    readInput: function (input) {
      console.log(input);
      if (input !== answer) {
        console.log(die);
      } else {
        next();
      }
    },
    prompt: function (option) {
      console.log(option.prompt + '(' + utils.outputChoices(option.options) + ')');
    }
  }

  var directions = function () {
    console.log('To make a move use player.move(). Refresh to start again.\n---------------------------------------------------------\n');
  };

  var answer,
      next,
      die;

  // refactor
  var start = function () {
    console.log('You have to drive a truck with a trailer across the country from New York to Colorado in the winter.\nThere is a blizzard to the West.');
    utils.prompt(options.cardinalDirections);
    answer = options.cardinalDirections.options[1];
    die = 'White out conditions. Snow piles up beyond the tail pipe. You die sleepily in your vehicle awaiting rescue.';
    next = step2;
  };

  var step2 = function () {
    console.log('You get to Washington DC and the roads are fairly dry.');
    utils.prompt(options.cardinalDirections);
    answer = options.cardinalDirections.options[3];
    die = 'You die in a horrific accident. Too bad about your life.';
    next = step3;
  };

  var step3 = function () {
    console.log('You get to the foothills of the Appalachians after a long day. ');
    utils.prompt(options.driverStatus);
    answer = options.driverStatus.options[0];
    die = 'You tumble off the highway and are never seen again.';
    next = step4;
  };

  var step4 = function () {
    console.log('You awake. Well rested but hungry. ');
    utils.prompt(options.restaurants);
    answer = options.restaurants.options[2];
    die = 'You lose a day to indigestion.';
    next = step5;
  };

  var step5 = function () {
    console.log('The mountains are now behind you and the Great Plains stretch toward the horizon.\n ');
    utils.prompt(options.cardinalDirections);
    answer = options.cardinalDirections.options[3];
    die = 'You are going the wrong way.';
    next = finish;
  };

  var finish = function () {
    console.log('Welcome to your new life in the Rockies. \nMake wise decisions. \n"Live long and prosper"');
  };

  // public methods

  this.player = {
    move: function (input) {
      utils.readInput(input);
    },
    end: function () {
      console.log('quitter');
    }
  }

  this.init = function () {
    directions();
    start();
  };

};

var game = new Game();
var player = game.player;
(window.console) ? game.init() : document.getElementsByTagName('h1')[0].innerHTML = 'Gotta use a different browser.';
