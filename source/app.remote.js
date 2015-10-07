var GameView   = require('./js/game-view')            ;
var GameEngine = require('./game-engine/remote-game') ;

GameView.addCommandReceiver(GameEngine.NewGame("the-mansion", GameView.appendText));
//window.g = GameEngine.LinkToGameInConsole();
