var GameView;
var GameEngine = require('./game-engine/local-game');

var Game = {};
var receiver;

var games = {
  "the-mansion" : require('./games/the-mansion'),
  "simple-game" : require('./games/simple-game')
};

Game.LoadGame = function (gameName) {
  window.g = GameEngine.NewConsoleGame(games[gameName]);
  receiver = GameEngine.NewGame(games[gameName], GameView.appendText);
  GameView.setCommandReceiver(receiver);
};

document.addEventListener("DOMContentLoaded", function (e) {
  GameView = require('./js/game-view')(Game.LoadGame);
  Game.LoadGame("the-mansion");
});
