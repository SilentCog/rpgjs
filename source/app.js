var $           = require('jquery')             ;
//var io          = require('socket.io')          ;
var mansionGame = require('./the-mansion/game') ;
var gameMaker   = require('./game/game')        ;

var g;
//var socket = io.connect('http://localhost');
//socket.on('textCallback', function (data)
//{
//  console.log(data);
//});

$(function() {
  var gameArea  = $("#GameArea")  ;
  var gameInput = $("#GameInput") ;
  
  var game = gameMaker.NewGame("The Mansion", mansionGame, function(text)
  {
    appendText(text);
  });
  
  g = gameMaker.NewConsoleGame("The Mansion", mansionGame);
  
  function appendText(text)
  {
    gameArea.append("<div><span class='lineIndicator'>&gt;</span><span class='gameText'>" + text + "</span></div>");
  }
  
  $(document).keypress(function(e) {
    var text = gameInput.val();
    if(e.which == 13 && text) {
      appendText(text);
      game(text);
      gameInput.val("");
      
      gameArea.animate({ scrollTop : gameArea[0].scrollHeight - gameArea.height() });
    }
  });
  
  console.log($("#Emit").text());
  $("#Emit").click(function()
  {
    console.log("emitting");
//    socket.emit('gameCommand', { command : 'inpsect' });
  });
});
