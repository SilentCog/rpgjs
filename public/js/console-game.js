function NewGame(name, options)
{
	var game = new Game(name, options);
	
	return game.play;
}

var Game;

(function()
{
	var div = "--------------------------------------------";
	
	Game = function(name, options)
	{
		var g = this;
		
		if(!options.frames.entry)
			throw "Game requires that exactly one frame be named \"entry\"";
		
		console.log(name + " v" + options.version + "\r\n\r\n" + div + "\r\n\r\n" + options.intro);
		
		var inventory = {};
		var gameVars  = {};
		
		
		this.initGameVar = function(key, value)
		{
			if(typeof g.gameVars(key) == "undefined")
				g.gameVars(key, value);
		}
		
		this.gameVariable = function(key, value)
		{
			if(typeof value !== "undefined")
				gameVars[key] = value;
			
			return gameVars[key];
		}
		
		this.initFrameVar = function(key, value)
		{
			if(typeof g.frameVars(key) == "undefined")
				g.frameVars(key, value);
		}
		
		this.frameVars = function(key, value)
		{
			if(!currentFrame.frameVars)
				currentFrame.frameVars = {};
			
			if(typeof value !== "undefined")
				currentFrame.frameVars[key] = value;
			
			return currentFrame.frameVars[key];
		}
		
		this.play = function(input)
		{
			var splitIndex = input.indexOf(" ");
			var com = input.slice(0, splitIndex).toLowerCase();
			var arg = input.substring(splitIndex + 1);
			
			var result;
			
			if(currentFrame.frameActions && currentFrame.frameActions[com])
				result = currentFrame.frameActions[com].apply(g, [arg]);
			else if(basicActions[com])
				result = basicActions[com](arg);
			else
				result = "I don't understand \"" + com + "\"";
			
			if(result)
				console.log(result);
			
			return div; // suppresses "undefined" text, replaces it with line highlighting boundary between commands
		}
		
		this.moveTo = function(frameName)
		{
			if(!options.frames[frameName])
				throw "Could not find frame \"" + frameName + "\"";
			
			currentFrame = options.frames[frameName];
			
			var intro = (typeof currentFrame.intro == "string" ? currentFrame.intro : currentFrame.intro());
			console.log(intro);
			
			if(currentFrame.onEnter)
				currentFrame.onEnter.apply(g);
		}
		
		var basicActions = {
			move   : function(input)
			{
				var func = currentFrame.movement[input];
				
				if(func)
					return func.apply(g);
				else
					return "I can't move " + input;
			}/*,
			pickup : function(item)
			{
				if(invetory[item.name])
					return false; // I already have that item
				
				inventory[item.name] = item.use;
				
				return true;
			}*/
		}
		
		this.moveTo("entry");
	}
})();