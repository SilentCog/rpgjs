var GameView;

var GameEngine = require('./game-engine/local-game') ;
var games      = {
  "the-mansion" : require('./games/the-mansion'),
  "simple-game" : require('./games/simple-game')
};

var Game = {};

(function()
{
  var receiver;
  Game.LoadGame = function(gameName)
  {
    window.g = GameEngine.NewConsoleGame(gameName, games[gameName]);
    
    receiver = GameEngine.NewGame(gameName, games[gameName], GameView.appendText);
    
    GameView.setCommandReceiver(receiver);
  };
})();

GameView = require('./js/game-view')(Game.LoadGame);
Game.LoadGame("the-mansion");