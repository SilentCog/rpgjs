var $      = require('./js/jquery.js')      ;
var io     = require('./js/socket.io.js')   ;
var socket = io.connect('http://localhost') ;

$(function()
{
  var gameArea  = $("#GameArea")  ;
  var gameInput = $("#GameInput") ;
  
  socket.on('textCallback', function (data)
  {
    appendText(data.text);
  });
  
  function appendText(text)
  {
    gameArea.append("<div><span class='lineIndicator'>&gt;</span><span class='gameText'>" + text + "</span></div>");
    
    gameArea.animate({ scrollTop : gameArea[0].scrollHeight - gameArea.height() });
  }
  
  $(document).keypress(function(e) {
    var text = gameInput.val();
    if(e.which == 13 && text) {
      appendText(text);
      socket.emit('gameCommand', { command : text });
      gameInput.val("");
    }
  });
});