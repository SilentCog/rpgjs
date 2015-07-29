var g = NewGame("Complex Game", {
	version        : "0.1",
	intro          : "Oh look!  A house!  Let's go in it!",
	frames         : {
		"entry" : {
			intro        : "You're in the entry way to the building.  To the north is a hallway.",
			onEnter      : function()
			{
				this.initFrameVar("doorOpen", true);
			},
			items        : [
				"shovel" ,
				"fan"    ,
				"key"
			],
			movement     : {
				"north" : function()
				{
					this.moveTo("hallway");
				},
				"south" : function()
				{
					if(this.frameVars("doorOpen"))
						return "I can't leave now, I've come too far";
					else
						return "The door is shut";
				}
			},
			frameActions : {
				"shut" : function(val)
				{
					switch(val)
					{
						default:
						case "door":
							if(this.frameVars("doorOpen"))
							{
								this.frameVars("doorOpen", false);
								return "I've shut the door";
							}
							else
								return "The door is already shut";
							
							break;
					}
				},
				"open" : function(val)
				{
					switch(val)
					{
						default:
						case "door":
							if(!this.frameVars("doorOpen"))
							{
								this.frameVars("doorOpen", true);
								return "I've opened the door";
							}
							else
								return "The door is already open";
							
							break;
					}
				}
			}
		},
		"hallway" : {
			intro        : "You're in a long hallway, looks like a dead end.  To the south is the entrance to the mansion.",
			movement     : {
				"south" : function()
				{
					this.moveTo("entry");
				}
			}
		}
	}
})