var $ = require('jquery');
var React = require('react');
var ReactDom = require('react-dom');

var GameEngine = require('./game-engine/local-game');
var GameSelector = require('../views/components/selector');

var GameView = require('./js/game-view');
var Game = {};
var receiver;

var games = {
  "the-mansion" : require('./games/the-mansion'),
  "simple-game" : require('./games/simple-game')
};

// jQuery version

Game.ReLoadGame = function (gameName) {
  GameView.reinitialize();
  Game.LoadGame(gameName);
};

Game.LoadjQueryGame = function (gameName) {
  window.g = GameEngine.NewConsoleGame(games[gameName]);
  receiver = GameEngine.NewGame(games[gameName], GameView.appendText);
  GameView.setCommandReceiver(receiver);
};

document.addEventListener("DOMContentLoaded", function (e) {
  GameView.initialize();
  Game.LoadjQueryGame("the-mansion");

  ReactDom.render(
    <GameSelector changeGame={Game.ReLoadGame} />,
    document.getElementById('selector')
  );
});
