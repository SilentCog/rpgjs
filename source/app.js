var $ = require('jquery');
var Game = require('./game/game');
var mansionGame = require('./the-mansion/game');

var g;

$(function() {
  var gameArea  = $("#GameArea")  ;
  var gameInput = $("#GameInput") ;
  
  var game = Game.NewGame("The Mansion", mansionGame, function(text)
  {
    appendText(text);
  });
  
  g = Game.NewConsoleGame("The Mansion", mansionGame);
  
  function appendText(text)
  {
    gameArea.append("<div><span class='lineIndicator'>&gt;</span><span class='gameText'>" + text + "</span></div>");
  }
  
  $(document).keypress(function(e) {
    var text = gameInput.val();
    if(e.which == 13 && text) {
      appendText(text);
      game(text);
      gameInput.val("");
      
      gameArea.animate({ scrollTop : gameArea[0].scrollHeight - gameArea.height() });
    }
  });
});
