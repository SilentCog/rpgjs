

//GameView.addCommandReceiver(GameEngine.NewGame("the-mansion", GameView.appendText));
//window.g = GameEngine.LinkToGameInConsole();



var GameView;
var GameEngine = require('./game-engine/remote-game') ;

var Game = {};

(function()
{
  var receiver;
  Game.LoadGame = function(gameName)
  {
    receiver = GameEngine.NewGame(gameName, GameView.appendText);
    
    GameView.setCommandReceiver(receiver);
  };
})();

GameView = require('./js/game-view')(Game.LoadGame);
Game.LoadGame("the-mansion");