var React = require('react');
var ReactDom = require('react-dom');

var GameEngine = require('./game-engine/local-game');
var GameSelector = require('../views/components/selector');

var GameView;
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

  ReactDom.render(
    <GameSelector/>,
    document.getElementById('selector')
  );
});
