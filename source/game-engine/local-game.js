var GameEngine = {};

(function() {
  var div = "--------------------------------------------";
  
  GameEngine.NewConsoleGame = function(name, options) {
    var game = new Game(name, options, function(text) {
      console.log(text);
    });
    
    return function(command) {
      game.play(command);
      // Have to return something to squelch console's "undefined" text
      return div;
    };
  };

  GameEngine.NewGame = function(name, options, textCallback) {
    var game = new Game(name, options, textCallback);
    
    return game.play;
  };

  var Game = function(name, gameData, textCallback) {
    var g = this;
    
    var gameActive = true;
    
    var currentFrame = null ;
    var cFrameName   = ""   ;
    
    
    var endGameMessage = "..." ;
    
    var inventory  = {} ;
    var gameVars   = {} ;
    var frameVars  = {} ;
    var frameItems = {} ;
    
    function init() {
      if(!gameData.frames.entry)
        throw "Game requires that exactly one frame be named \"entry\"";
      
      // Aliases
      basicActions.go   = basicActions.move   ;
      basicActions.take = basicActions.pickup ;
      
      gameData.setup.apply(g);
      
      this.moveTo("entry");
    }
    
    function makeItemsOnFrame(frameName) {
      if(!frameName)
        frameName = cFrameName;
      
      if(!frameItems[frameName])
      {
        frameItems[frameName] = {};
        
        for(var i in gameData.frames[frameName].items)
          frameItems[frameName][i] = gameData.frames[frameName].items[i];
      }
    }
    
    this.addItemToFrame = function(itemName, item) {
      makeItemsOnFrame();
      
      if(frameItems[cFrameName][itemName])
        return false;
      
      frameItems[cFrameName][itemName] = item;
      return true;
    };
    
    this.addItemToInventory = function(itemName, item) {
      if(inventory[itemName])
        return false; // I already have that item
      
      inventory[itemName] = item;
      
      return true;
    };
    
    this.end = function(message) {
      gameActive = false;
      
      if(typeof message == "string")
        endGameMessage = message;
    };
    
    this.frameHasItem = function(itemName) {
      return typeof g.getItemFromFrame(itemName) != "undefined";
    };
    
    this.frameVars = function(key, value) {
      return g.frameVarsOnFrame(cFrameName, key, value);
    };
    
    this.frameVarsOnFrame = function(frameName, key, value) {
      if(!frameVars[frameName])
        frameVars[frameName] = {};
      
      if(typeof value !== "undefined")
        frameVars[frameName][key] = value;
      
      return frameVars[frameName][key];
    };
    
    this.gameVars = function(key, value) {
      if(typeof value !== "undefined")
        gameVars[key] = value;
      
      return gameVars[key];
    };
    
    this.getCurrentFrame = function() {
      return currentFrame;
    };
    
    this.getCurrentFrameName = function() {
      return cFrameName;
    };
    
    this.getItemFromFrame = function(itemName) {
      makeItemsOnFrame();
      
      return frameItems[cFrameName][itemName];
    };
    
    this.getItemFromInventory = function(itemName) {
      return inventory[itemName];
    };
    
    // TODO: return a copy of inventory so it can't be modified directly
    this.getInventory = function() {
      return inventory;
    };
    
    this.initFrameVar = function(key, value) {
      if(typeof g.frameVars(key) === "undefined")
        g.frameVars(key, value);
    };
    
    this.initGameVar = function(key, value) {
      if(typeof g.gameVars(key) === "undefined")
        g.gameVars(key, value);
    };
    
    this.inventoryHasItem = function(itemName) {
      return typeof g.getItemFromInventory(itemName) != "undefined";
    };
    
    this.itemAvailableInFrame = function(itemName) {
      var item = g.getItemFromFrame(itemName);
      
      return item && (!item.availability || item.availability.apply(g));
    };

    
    this.moveTo = function(frameName) {
      if(!gameData.frames[frameName])
        throw "Could not find frame \"" + frameName + "\"";
      
      currentFrame = gameData.frames[frameName] ;
      cFrameName   = frameName                  ;
      
      if(currentFrame.onEnter)
        currentFrame.onEnter.apply(g);
      
      var intro = (typeof currentFrame.intro === "string" ? currentFrame.intro : currentFrame.intro());
      
      g.print(intro);
    };
    
    this.play = function(input) {
      if(!gameActive)
      {
        g.print(endGameMessage);
        return;
      }
      
      var splitIndex = input.indexOf(" ");
      var com, arg;
      
      if(splitIndex >= 0) {
        com = input.slice(0, splitIndex).toLowerCase();
        arg = input.substring(splitIndex + 1).trim();
      }
      else {
        com = input ;
        arg = ""    ;
      }
      
      var result;
      
      if(currentFrame.frameActions && currentFrame.frameActions[com])
        result = currentFrame.frameActions[com].apply(g, [arg]);
      else if(basicActions[com])
        result = basicActions[com](arg);
      else
        result = "I don't understand \"" + com + "\"";
      
      if(result)
        g.print(result);
    };
    
    this.print = function(text) {
      // we could set print directly to textCallback, but this provides a buffer preventing any tamporing with the actual textCallback function
      textCallback(text);
    };
    
    this.removeItemFromFrame = function(itemName) {
      makeItemsOnFrame();
      
      if(!frameItems[cFrameName][itemName])
        return false;
      
      delete frameItems[cFrameName][itemName];
      return true;
    };
    
    this.removeItemFromInventory = function(itemName) {
      if(!inventory[itemName])
        return false;
      
      delete inventory[itemName];
      return true;
    };
    
    var basicActions = {
      move   : function(input) {
        if(!currentFrame.movement)
          return "I can't move!";
        
        var func = currentFrame.movement[input];
        
        if(typeof func === "string")
          return func;
        else if(func)
          return func.apply(g);
        else
          return "I can't move " + input;
      },// TODO: add the ability to inspect items
      inspect : function(input) {
        var func = currentFrame.inspect;
        
        if(typeof func === "string")
          return func;
        else if(func)
          return func.apply(g);
        else
          return "I already told you everything I know!";
      },
      pickup : function(itemName) {
        makeItemsOnFrame();
        
        var item = frameItems[cFrameName][itemName];
        
        if(!item || !g.itemAvailableInFrame(itemName))
          return "I can't pick that up.";
        
        var ps = (item.pronounString ? item.pronounString : " a " + itemName);
        
        if(g.addItemToInventory(itemName, item)) {
          g.removeItemFromFrame(itemName);
          return "Picked up " + ps;
        }
        else
          return "I already have " + ps; // I already have that item
      },
      use : function(useStr) {
        var split = useStr.split(" on ");
        
        if(split.length != 2)
          return "I don't understand.  You have to tell me to use an ITEM on an OBJECT.";
        
        var itemName = split[0];
        var obj      = split[1];
        
        if(!inventory[itemName])
          return "I don't have that item";
        
        var item = inventory[itemName];
        
        if(!item.use)
          return "I can't use those things together";
        
        var result = item.use.apply(g, [obj]);
        
        if(!result)
          return "I can't use those things together";
        
        return result;
      },
      inventory : function() {
        var inv = "";
        
        for(var i in inventory)
          inv += "\r\n" + i;
        
        if(inv)
          return "I have the following items in my inventory:" + inv;
        else
          return "I don't have anything.";
      }
    };
    
    init();
  };
})();

if(typeof module !== 'undefined' && module.exports) {
  module.exports = GameEngine;
}
