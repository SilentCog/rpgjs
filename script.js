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
    ]},
    status: {
      prompt: 'What should you do? ',
      options: [
      'Sleep',
      'Coffee',
      'Drive'
    ]}
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

  var start = function () {
    console.log('You have to drive a truck with a trailer across the country from New York to Colorado in the winter.\nThere is a blizzard to the West.');
    utils.prompt(options.cardinalDirections);
    answer = 'South';
    die = 'White out conditions. Snow piles up beyond the tail pipe. You die sleepily in your vehicle awaiting rescue.';
    next = step2;
  };

  var step2 = function () {
    console.log('You get to Washington DC and the roads are fairly dry.');
    utils.prompt(options.cardinalDirections);
    answer = 'West';
    die = 'You die in a horrific accident. Too bad about your life.';
    next = step3;
  };

  var step3 = function () {
    console.log('You get to the foothills of the Appalachians after a long day. ');
    utils.prompt(options.status);
    answer = 'Sleep';
    die = 'You tumble off the highway and are never seen again.';
    next = step3;
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
(window.console) ? game.init() : 'Gotta use a different browser.';
