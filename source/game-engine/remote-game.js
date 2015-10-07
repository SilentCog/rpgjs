var io     = require('socket.io-client')    ;
var socket = io.connect('http://localhost') ;

var GameEngine = {};

(function() {
  var div = "--------------------------------------------";
  var linkedCallbacks = [];
  
  GameEngine.NewGame = function(gameName, textCallback) {
    linkedCallbacks.push(textCallback);
    
    socket.emit("createGame", { gameName : gameName });
    
    return function(command) {
      socket.emit("gameCommand", { command : command });
    };
  };
  
  GameEngine.LinkToGame = function(textCallback) {
    linkedCallbacks.push(textCallback);
    
    return function(command) {
      socket.emit("gameCommand", { command : command });
    };
  };
  
  GameEngine.LinkToGameInConsole = function() {
    linkedCallbacks.push(function(text) {
      console.log(text);
    });
    
    return function(command) {
      socket.emit("gameCommand", { command : command });
      return div;
    };
  };
  
  socket.on('textCallback', function (data) {
    for(var i = 0; i < linkedCallbacks.length; i++)
      linkedCallbacks[i](data.text);
  });
})();

if(typeof module !== 'undefined' && module.exports) {
  module.exports = GameEngine;
}
