function Game(name, options) {

  var actions = options.actions;
  var steps = options.steps;
  var count = 0;
  var correctAnswer;
  var causeOfDeath;

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
    },
    setCorrectAnswer: function (step) {
      if (step.answer !== undefined) {
        var answer = actions[step.prompt].options[step.answer];
        correctAnswer = answer;
      }
    },
    setCauseOfDeath: function (step) {
      if (step.die) {
        var die = step.die;
        causeOfDeath = die;
      }
    },
    outputMessage: function (step) {
      console.log(step.message);
      if (step.prompt) {
        utils.showPrompt(actions[step.prompt]);
      }
    }
  };

  var play = function () {
    var step = steps[count];
    utils.setCorrectAnswer(step);
    utils.setCauseOfDeath(step);
    utils.outputMessage(step);
    count++;
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
