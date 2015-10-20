var React = require('react');
var ReactDom = require('react-dom');

var GameEngine = require('./game-engine/local-game');
var GameInterface = require('../views/components/game');
var GameSelector = require('../views/components/selector');

var GameView = require('./js/game-view');
var Game = {};
var receiver;

var games = {
  "the-mansion" : require('./games/the-mansion'),
  "simple-game" : require('./games/simple-game')
};

// jQuery version
/*
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
*/

// comment out below to use jQuery version and uncommnent above
document.addEventListener("DOMContentLoaded", function (e) {
  var gameName = 'the-mansion';

  window.g = GameEngine.NewConsoleGame(games[gameName]);

  ReactDom.render(
    <GameInterface game={games[gameName]} />,
    document.getElementById('game')
  );

  ReactDom.render(
    <GameSelector changeGame={Game.ReLoadGame} />,
    document.getElementById('selector')
  );
});
