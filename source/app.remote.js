var React = require('react');
var ReactDom = require('react-dom');

var GameEngine = require('./game-engine/remote-game');
var GameSelector = require('../views/components/selector');

var GameView = require('./js/game-view');
var Game = {};
var receiver;

Game.LoadGame = function (gameName) {
  receiver = GameEngine.NewGame(gameName, GameView.appendText);
  GameView.setCommandReceiver(receiver);
};

document.addEventListener("DOMContentLoaded", function (e) {
  GameView.initialize();
  Game.LoadGame("the-mansion");

  ReactDom.render(
    <GameSelector changeGame={Game.ReLoadGame} />,
    document.getElementById('selector')
  );
});
