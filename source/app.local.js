var React = require('react');
var ReactDom = require('react-dom');

var GameEngine = require('./game-engine/local-game');
var GameInterface = require('../views/components/game');
var GameSelector = require('../views/components/selector');

var Game = {};
var receiver;

var games = {
  "the-mansion" : require('./games/the-mansion'),
  "simple-game" : require('./games/simple-game')
};

function initializeGame(gameName) {
  // start up the console version
  window.g = GameEngine.NewConsoleGame(games[gameName]);

  // start up the UI version
  ReactDom.render(
    <GameInterface game={games[gameName]} />,
    document.getElementById('game')
  );
}

document.addEventListener("DOMContentLoaded", function (e) {
  var gameName = 'the-mansion';

  initializeGame.call(this, gameName);

  ReactDom.render(
    <GameSelector changeGame={initializeGame} />,
    document.getElementById('selector')
  );
});
