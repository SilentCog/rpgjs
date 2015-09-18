var gameMaker = require('../source/game/game')        ;
var gameData  = require('../source/the-mansion/game') ;
var socket    = require('socket.io')                  ;
var express   = require('express')                    ;
var router    = express.Router()                      ;

var server    = require('http').Server(express())     ;
var io        = require('socket.io')(server)          ;

server.listen(80);

// ---------------------- SUPPORT FUNCTIONS ---------------------- //


// ---------------------- ROUTING FUNCTIONS ---------------------- //


// ---------------------- IO HANDLERS ---------------------- //

io.on('connection', function (socket)
{
  var game = gameMaker.NewGame("The Mansion", gameData, function(text)
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
  /*
  // ---------------------- GET HANDLERS ---------------------- //
  router.get('/play', function(req, res)
  {
    var com = req.query.command;
    
    if(typeof com == "string")
      game(com);
    
    res.end();
  });
  // ---------------------- POST HANDLERS ---------------------- //
  
  // Get Game Parameters - data that does not change
  router.post('/play', function(req, res)
  {
    var com = req.body.command;
    
    if(typeof com == "string")
      game(com);
    
    res.end();
  });
  */

  return router;
};








