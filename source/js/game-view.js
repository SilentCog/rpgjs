var $ = require('jquery');

var GameView = {};

(function() {
  // catch any lines that come in before document.ready
  var loaded           = false ;
  var preLoadLines     = []    ;
  var commandReceivers = []    ;
  
  var gameArea, gameInput;
  
  GameView.appendText = function(text) {
    if(loaded)
    {
      gameArea.append("<div><span class='lineIndicator'>&gt;</span><span class='gameText'>" + text + "</span></div>");
      gameArea.animate({ scrollTop : gameArea[0].scrollHeight - gameArea.height() });
    }
    else
      preLoadLines.push(text);
  };
  
  GameView.addCommandReceiver = function(receiver) {
    commandReceivers.push(receiver);
  };
  
  function sendCommandToReceivers(command) {
    for(var i = 0; i < commandReceivers.length; i++)
      commandReceivers[i](command);
  }
  
  $(function() {
    gameArea  = $("#GameArea")  ;
    gameInput = $("#GameInput") ;
    
    function init() {
      loaded = true;
      
      for(var i = 0; i < preLoadLines.length; i++)
        GameView.appendText(preLoadLines[i]);
    }
    
    
    $(document).keypress(function(e) {
      var text = gameInput.val();
      if(e.which == 13 && text) {
        GameView.appendText(text);
        
        sendCommandToReceivers(text);
        
        gameInput.val("");
      }
    });
    
    init();
  });
})();

module.exports = GameView;
