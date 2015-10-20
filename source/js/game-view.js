/*
 * jQuery view controller
 */

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
    gameArea   = $("#GameArea");
    gameInput  = $("#GameInput");
    this.clearGameArea();
  },
  displayPreloadLines: function () {
    for(var i = 0; i < preLoadLines.length; i++) {
      this.appendText(preLoadLines[i]);
    }
  },
  handleKeyUp: function (e) {
    var text = escapeHtml(e.target.value);
    if(e.which == 13 && text) {
      this.appendText(text);
      this.sendCommandToReceivers(text);
      this.clearInput();
    }
  },
  reinitialize: function () {
    this.clearGameArea();
    this.displayPreloadLines();

    return this;
  },
  initialize: function () {
    loaded = true;

    this.setDomElements();
    this.displayPreloadLines();

    window.onkeyup = this.handleKeyUp.bind(this);

    return this;
  }
};

module.exports = GameView;
