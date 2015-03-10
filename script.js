function Game () {

  // private methods
  var options = {
    cardinalDirections: [
      'North',
      'South',
      'East',
      'West'
    ],
    status: [
      'Sleep',
      'Coffee',
      'Drive'
    ]
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
    }
  }

  var directions = function () {
    console.log('To make a move use player.move()');
  };

  var answer = '',
      next,
      die = 'You die in a horrific accident. Too bad about your life.';

  var prompt = function (arr) {
    console.log('What direction should do go? (' + utils.outputChoices(arr) + ')');
  };

  var start = function () {
    console.log('You have to drive a truck with a trailer across the country from New York to Colorado in the winter.');
    prompt(options.cardinalDirections);
    answer = 'South';
    next = step2;
  };

  var step2 = function () {
    console.log('You get to Washington DC and the roads are fairly dry.');
    prompt(options.cardinalDirections);
    answer = 'West';
    next = step3;
  };

  var step3 = function () {
    console.log('You get to the foothills of the Appalachians after a long day. ');
    prompt(options.status);
    answer = 'Sleep';
    next = step3;
    die = 'You tumble off the highway and are never seen again.';
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
    start();
    directions();
  };

};

var game = new Game();
var player = game.player;
game.init();
