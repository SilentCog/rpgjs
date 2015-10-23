var $ = require('jquery');
var escapeHtml = require('escape-html');

var loaded = false;
var preLoadLines = [];
var gameArea, gameInput, gameSelect;

var GameView = {
  commandReceiver: null,
  appendText: function (text) {
    if (loaded) {
      gameArea.append("<div><span class='lineIndicator'>&gt;</span><span class='gameText'>" + text + "</span></div>");
      gameArea.animate({ scrollTop : gameArea[0].scrollHeight - gameArea.height() });
    }
    else
      preLoadLines.push(text);
  },
  sendCommandToReceivers: function (command) {
    if (this.commandReceiver)
      this.commandReceiver(command);
  },
  setCommandReceiver: function (receiver) {
    this.commandReceiver = receiver;
  },
  clearCommandReceiver: function (receiver) {
    this.commandReceiver = null;
  },
  clearInput: function() {
    gameInput.val("");
  },
  clearGameArea: function (clearInput) {
    gameArea.text("");

    if(clearInput)
      this.clearInput();
  },
  setDomElements: function (ga, gi, gs) {
    // this.gameArea   = document.getElementById("GameArea");
    // this.gameInput  = document.getElementById("GameInput");
    gameArea   = $("#GameArea");
    gameInput  = $("#GameInput");
    gameSelect = $("#GameSelectBox input[type='radio']");
  },
  initialize: function (LoadGame) {

    this.setDomElements();

    loaded = true;

    for(var i = 0; i < preLoadLines.length; i++)
      this.appendText(preLoadLines[i]);

    window.onkeyup = function (e) {
      var text = escapeHtml(gameInput.val());
      if(e.which == 13 && text) {
        this.appendText(text);
        this.sendCommandToReceivers(text);
        this.clearInput();
      }
    }.bind(this);

    gameSelect.change(function () {
      this.clearGameArea(true);
      LoadGame($(this).val());
    });

    return this;
  }
};

// TODO: not a huge fan of this method
// of passing LoadGame, it doesn't
// really match up with any other
// workflow we use up to this point
module.exports = function(LoadGame) {
  return GameView.initialize(LoadGame);
};
