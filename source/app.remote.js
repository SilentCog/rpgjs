var GameView   = require('./js/game-view')            ;
var GameEngine = require('./game-engine/remote-game') ;

GameView.addCommandReceiver(GameEngine.LinkToGame(GameView.appendText));
