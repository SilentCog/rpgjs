var React = require('react');
var ReactDom = require('react-dom');

var GameEngine = require('./game-engine/local-game');
var GameInterface = require('../views/components/game');
var GameSelector = require('../views/components/selector');

var Game = {};
var receiver;

var games = {
  'the-mansion' : require('./games/the-mansion'),
  'simple-game' : require('./games/simple-game')
};

document.addEventListener("DOMContentLoaded", function (e) {
  var gameName = 'the-mansion';

  // start up the console version
  window.g = GameEngine.NewConsoleGame(games[gameName]);

  // start up the UI version
  ReactDom.render(
    <GameInterface games={games} defaultGame={games[gameName]} />,
    document.getElementById('game')
  );
});
