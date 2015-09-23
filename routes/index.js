var GameEngine = require('../source/game-engine/local-game') ;
var gameData   = require('../source/games/the-mansion')      ;
var socket     = require('socket.io')                      ;
var express    = require('express')                        ;
var router     = express.Router()                          ;

var server     = require('http').Server(express())         ;
var io         = require('socket.io')(server)              ;


server.listen(80);

io.on('connection', function (socket)
{
  var game;
  game = GameEngine.NewGame("The Mansion", gameData, function(text)
  {
    socket.emit('textCallback', { text : text });
  });

  socket.on('gameCommand', function (data)
  {
    game(data.command);
  });
});

module.exports = function(passport)
{
  return router;
};
