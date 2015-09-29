var GameView   = require('./js/game-view')           ;
var GameEngine = require('./game-engine/local-game') ;
var gameData   = require('./games/the-mansion')      ;

window.g = GameEngine.NewConsoleGame("The Mansion", gameData);
GameView.addCommandReceiver(GameEngine.NewGame("The Mansion", gameData, GameView.appendText));