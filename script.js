function Game () {

  // private methods
  var options = {
    cardinalDirections :[
      'North',
      'South',
      'East',
      'West'
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
        console.log('You die in a horrific accident. Too bad about your life.');
      } else {
        next();
      }
    }
  }

  var directions = function () {
    console.log('To make a move use player.move()');
  };

  var answer = '';

  var start = function () {
    console.log('You have to drive a truck with a trailer across the country from New York to Colorado in the winter.\nA blizzard is to the West.\nWhat direction should do go? (' + utils.outputChoices(options.cardinalDirections) + ')');
    answer = 'South';
    next = step2;
  };

  var step2 = function () {
    console.log('You get to Washington DC and the roads are fairly dry.\nWhat direction should do go? (' + utils.outputChoices(options.cardinalDirections) + ')');
    answer = 'West';
    next = step3;
  };

  var step3 = function () {
    console.log('step 3');
  };

  // public methods

  this.player = {
    move: function (input) {
      utils.readInput(input);
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
