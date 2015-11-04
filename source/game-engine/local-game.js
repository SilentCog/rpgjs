var STRINGS = require('../statics/strings');

var GameEngine = {};
var div = STRINGS.DIVIDER;

GameEngine.NewConsoleGame = function (options) {
  var helpText = STRINGS.CONTENT.HELP.CONSOLE.START;

  var game = new Game(options, function (text) {
    console.log(text);
  });

  console.log(helpText);

  return function (command) {
    game.play(command);
    // Have to return something to squelch console's "undefined" text
    return div;
  };
};

GameEngine.NewGame = function (gameData, textCallback) {
  var game = new Game(gameData, textCallback);

  return game.play;
};

function Game(gameData, textCallback) {
  var g = this;

  var gameActive = true;

  var currentFrame = null;
  var cFrameName   = "";

  var endGameMessage = "..." ;

  var inventory  = {} ;
  var gameVars   = {} ;
  var frameVars  = {} ;
  var frameItems = {} ;

  function init() {
    if (!gameData.frames.entry)
      throw "Game requires that exactly one frame be named \"entry\"";

    // Aliases
    basicActions.go   = basicActions.move   ;
    basicActions.take = basicActions.pickup ;

    if (typeof gameData.setup == "function")
      gameData.setup.apply(g);

    switch(typeof gameData.intro)
    {
      case "string":
        g.print(gameData.intro);
        break;
      case "function":
        g.print(gameData.intro.apply(g));
        break;
    }

    g.moveTo("entry");
  }

  function makeItemsOnFrame(frameName) {
    if (!frameName)
      frameName = cFrameName;

    if (!frameItems[frameName])
    {
      frameItems[frameName] = {};

      for(var i in gameData.frames[frameName].items)
        frameItems[frameName][i] = gameData.frames[frameName].items[i];
    }
  }

  this.addItemToFrame = function (itemName, item) {
    makeItemsOnFrame();

    if (frameItems[cFrameName][itemName])
      return false;

    frameItems[cFrameName][itemName] = item;
    return true;
  };

  this.addItemToInventory = function (itemName, item) {
    if (inventory[itemName])
      return false; // I already have that item

    inventory[itemName] = item;

    return true;
  };

  this.end = function (message) {
    gameActive = false;

    if (typeof message == "string")
      endGameMessage = message;
  };

  this.frameHasItem = function (itemName) {
    return typeof g.getItemFromFrame(itemName) != "undefined";
  };

  this.frameVars = function (key, value) {
    return g.frameVarsOnFrame(cFrameName, key, value);
  };

  this.frameVarsOnFrame = function (frameName, key, value) {
    if (!frameVars[frameName])
      frameVars[frameName] = {};

    if (typeof value !== "undefined")
      frameVars[frameName][key] = value;

    return frameVars[frameName][key];
  };

  this.gameVars = function (key, value) {
    if (typeof value !== "undefined")
      gameVars[key] = value;

    return gameVars[key];
  };

  this.getCurrentFrame = function () {
    return currentFrame;
  };

  this.getCurrentFrameName = function () {
    return cFrameName;
  };

  this.getItemFromFrame = function (itemName) {
    makeItemsOnFrame();

    return frameItems[cFrameName][itemName];
  };

  this.getItemFromInventory = function (itemName) {
    return inventory[itemName];
  };

  // TODO: return a copy of inventory so it can't be modified directly
  this.getInventory = function () {
    return inventory;
  };

  this.initFrameVar = function (key, value) {
    if (typeof g.frameVars(key) === "undefined")
      g.frameVars(key, value);
  };

  this.initGameVar = function (key, value) {
    if (typeof g.gameVars(key) === "undefined")
      g.gameVars(key, value);
  };

  this.inventoryHasItem = function (itemName) {
    return typeof g.getItemFromInventory(itemName) != "undefined";
  };

  this.itemAvailableInFrame = function (itemName) {
    var item = g.getItemFromFrame(itemName);

    return item && (!item.availability || item.availability.apply(g));
  };


  this.moveTo = function (frameName) {
    if (!gameData.frames[frameName])
      throw "Could not find frame \"" + frameName + "\"";

    currentFrame = gameData.frames[frameName] ;
    cFrameName   = frameName                  ;

    if (currentFrame.onEnter)
      currentFrame.onEnter.apply(g);

    switch(typeof currentFrame.intro)
    {
      case "string":
        g.print(currentFrame.intro);
        break;
      case "function":
        g.print(currentFrame.intro.apply(g));
        break;
    }
  };

  this.play = function (input) {
    if (typeof input === 'undefined') {
      input = 'help';
    }

    if (!gameActive) {
      g.print(endGameMessage);
      return;
    }

    var splitIndex = input.indexOf(" ");
    var com, arg;

    if (splitIndex >= 0) {
      com = input.slice(0, splitIndex).toLowerCase();
      arg = input.substring(splitIndex + 1).trim();
    }
    else {
      com = input ;
      arg = ""    ;
    }

    var result;

    if (currentFrame.frameActions && currentFrame.frameActions[com])
      result = currentFrame.frameActions[com].apply(g, [arg]);
    else if (basicActions[com])
      result = basicActions[com](arg);
    else
      result = STRINGS.CONTENT.PLAY.COMMAND_NOT_FOUND(com);

    if (result)
      g.print(result);
  };

  this.print = function (text) {
    // we could set print directly to textCallback, but this provides a buffer
    // preventing any tamporing with the actual textCallback function
    if (typeof text === "string") // ehhhhh, maybe we should let users pass whatever?  Maybe not, I'm not really sure...
      textCallback(text);
  };

  this.removeItemFromFrame = function (itemName) {
    makeItemsOnFrame();

    if (!frameItems[cFrameName][itemName])
      return false;

    delete frameItems[cFrameName][itemName];
    return true;
  };

  this.removeItemFromInventory = function (itemName) {
    if (!inventory[itemName])
      return false;

    delete inventory[itemName];
    return true;
  };

  var basicActions = {
    move   : function (input) {
      if (!currentFrame.movement)
        return STRINGS.CONTENT.MOVE.CANNOT_MOVE();

      var func = currentFrame.movement[input];

      if (typeof func === "string")
        return func;
      else if (func)
        return func.apply(g);
      else
        return STRINGS.CONTENT.MOVE.CANNOT_MOVE(input);
    },
    // TODO: add the ability to inspect items
    inspect : function (input) {
      var func = currentFrame.inspect;

      if (typeof func === "string")
        return func;
      else if (func)
        return func.apply(g);
      else
        return "I already told you everything I know!";
    },
    pickup : function (itemName) {
      makeItemsOnFrame();

      var item = frameItems[cFrameName][itemName];

      if (!item || !g.itemAvailableInFrame(itemName))
        return STRINGS.CONTENT.PICKUP.CANNOT_PICKUP;

      var ps = (item.pronounString ? item.pronounString : " a " + itemName);

      if (g.addItemToInventory(itemName, item)) {
        g.removeItemFromFrame(itemName);
        return STRINGS.CONTENT.PICKUP.PICKUP(ps);
      }
      else
        return STRINGS.CONTENT.PICKUP.ALREADY_HAVE(PS);
    },
    use : function (useStr) {
      var split = useStr.split(" on ");

      if (split.length != 2)
        return STRINGS.CONTENT.USE.DO_NOT_UNDERSTAND;

      var itemName = split[0];
      var obj      = split[1];

      if (!inventory[itemName])
        return STRINGS.CONTENT.USE.DO_NOT_HAVE;

      var item = inventory[itemName];

      if (!item.use)
        return STRINGS.CONTENT.USE.CANNOT_USE_TOGETHER;

      var result = item.use.apply(g, [obj]);

      if (!result)
        return STRINGS.CONTENT.USE.CANNOT_USE_TOGETHER;

      return result;
    },
    inventory : function () {
      var inv = "";

      for(var i in inventory)
        inv += "\r\n" + i;

      if (inv)
        return STRINGS.CONTENT.INVENTORY.CONTENTS + inv;
      else
        return STRINGS.CONTENT.INVENTORY.EMPTY;
    },
    help : function (command) {
      var commandMapping = {
        move: 'movement',
        inspect: 'inspect',
        pickup: 'items',
        use: 'use',
        inventory: 'inventory'
      };

      var options;
      var commands = Object.keys(this);

      if (typeof currentFrame.frameActions !== 'undefined') {
        commands.push(Object.keys(currentFrame.frameActions));
      }

      var getOptions = function (key) {
        var keys;
        var action = currentFrame[key];

        if (typeof action !== 'undefined') {
          keys = Object.keys(action);
          return keys.join(', ');
        } else {
          return '';
        }
      };

      if (command) {
        options = getOptions(commandMapping[command]);

        if (options !== '') {
          return STRINGS.CONTENT.HELP.OPTIONS(command, options);
        } else {
          return STRINGS.CONTENT.HELP.NO_OPTIONS(command);
        }
      } else {
        return STRINGS.CONTENT.HELP.AVAILABLE(commands);
      }
    }
  };

  init();
}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameEngine;
}
