var GameView;
var GameEngine = require('./game-engine/remote-game');

var Game = {};
var receiver;

Game.LoadGame = function (gameName) {
  receiver = GameEngine.NewGame(gameName, GameView.appendText);
  GameView.setCommandReceiver(receiver);
};

document.addEventListener("DOMContentLoaded", function (e) {
  GameView = require('./js/game-view')(Game.LoadGame);
  Game.LoadGame("the-mansion");
});
