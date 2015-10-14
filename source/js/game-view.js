var $ = require('jquery') ;

// TODO: not a huge fan of this method
// of passing LoadGame, it doesn't
// really match up with any other
// workflow we use up to this point
module.exports = function(LoadGame) {
  // catch any lines that come in before document.ready
  var loaded          = false ;
  var preLoadLines    = []    ;
  var commandReceiver         ;
  
  var GameView = {};
  
  var gameArea, gameInput, gameSelect;
  
  GameView.appendText = function(text) {
    if(loaded)
    {
      gameArea.append("<div><span class='lineIndicator'>&gt;</span><span class='gameText'>" + text + "</span></div>");
      gameArea.animate({ scrollTop : gameArea[0].scrollHeight - gameArea.height() });
    }
    else
      preLoadLines.push(text);
  };
  
  GameView.setCommandReceiver = function(receiver) {
    commandReceiver = receiver;
  };
  
  GameView.clearCommandReceiver = function(receiver) {
    commandReceiver = null;
  };
  
  GameView.clearInput = function() {
    gameInput.val("");
  };
  
  GameView.clearGameArea = function(clearInput) {
    gameArea.text("");
    
    if(clearInput)
      GameView.clearInput();
  };
  
  function sendCommandToReceivers(command) {
    if(commandReceiver)
      commandReceiver(command);
  }
  
  $(function() {
    gameArea   = $("#GameArea")                          ;
    gameInput  = $("#GameInput")                         ;
    gameSelect = $("#GameSelectBox input[type='radio']") ;
    
    
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
    
    gameSelect.change(function()
    {
      GameView.clearGameArea(true);
      LoadGame($(this).val());
    });
    
    init();
  });
  
  return GameView;
};
