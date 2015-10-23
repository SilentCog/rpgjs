var theMansion = {
  name           : "The Mansion",
  version        : "0.5",
  intro          : "Oh look!  A house!  Let's go in it!",
  setup          : function()
  {
    var frames = theMansion.frames;
    for(var f in frames)
    {
      var frame = frames[f];
      if(frame.openables)
      {
        for(var o in frame.openables)
        {
          var openable = frame.openables[o];
          switch(typeof openable)
          {
            case "string":
              this.gameVars("IsOpen_" + f + "_" + openable, false);
              break;
            case "object":
              this.gameVars("IsOpen_" + f + "_" + openable.name, openable.initValue);
              break;
          }
        }
      }
    }
  },
  gameActions    : {
    open : function(arg) {
      if(!arg)
        return "What do you want me to open?";

      var frameName = this.getCurrentFrameName() ;
      var frame     = this.getCurrentFrame()     ;
      var openables = frame.openables            ;

      if(!openables || !openables[arg])
        return "I can't open " + arg;

      var openable = openables[arg];

      if(!this.gameVars("IsOpen_" + frameName + "_" + arg))
      {
        if(openable.onTryOpen)
          openables.onOpen.apply(this);

        if(openable.canOpen && !openable.canOpen.apply(this))
          return;

        this.gameVars("IsOpen_" + frameName + "_" + arg, true);

        if(openable.onOpen)
          return openables.onOpen.apply(this);
        else
          return "I've opened the " + arg;
      }
      else
      {
        switch(typeof openable.alreadyOpen)
        {
          case "string":
            return openable.alreadyOpen;
          case "function":
            return openable.alreadyOpen.apply(this);
          default:
            return arg + " is already open!";
        }
      }
    },
    close : {
      aliases : [ "shut" ],
      action  : function(arg, verb) {
        var pastTense = {
          "close" : "closed" ,
          "shut"  : "shut"
        }[verb]; // lol readability
        
        if(!arg)
          return "What do you want me to " + verb + "?";

        var frameName = this.getCurrentFrameName() ;
        var frame     = this.getCurrentFrame()     ;
        var openables = frame.openables            ;

        if(!openables || !openables[arg])
          return "I can't " + verb + " " + arg;

        var openable = openables[arg];

        if(this.gameVars("IsOpen_" + frameName + "_" + arg))
        {
          if(openable.onTryClose)
            openables.onTryClose.apply(this);

          if(openable.canClose && !openable.canClose.apply(this))
            return;

          this.gameVars("IsOpen_" + frameName + "_" + arg, false);

          if(openable.onClose)
            return openables.onClose.apply(this);
          else
            return "I've " + pastTense + " the " + arg;
        }
        else
        {
          switch(typeof openable.alreadyClosed)
          {
            case "string":
              return openable.alreadyClosed;
            case "function":
              return openable.alreadyClosed.apply(this);
            default:
              return arg + " is already " + pastTense + "!";
          }
        }
      }
    }
  },
  frames         : {
    "entry" : {
      intro        : "You're in the entry way to the building.  To the north is a hallway.",
      inspect      : function() {
        return "There's a drawer against the wall" + (this.itemAvailableInFrame("key") ? ", there's a key inside of it" : "") + ".";
      },
      onEnter      : function() {
        this.initFrameVar("doorOpen",   true  );
        this.initFrameVar("drawerOpen", false );
      },
      items        : {
        "key"    : {
          pronounString : "a key",
          availability  : function() {
            return this.gameVars("IsOpen_entry_drawer");
          },
          use           : function(obj) { // TODO: I don't like the way "use" works right now.  It should have to get a string to figure out which room it's in - Sandy
            if(this.getCurrentFrameName() === "doorRoom") {
              if(!this.frameVars("doorLocked"))
                return "The door is already unlocked";
              
              this.frameVars("doorLocked", false);
              
              if(obj === "door")
                return "The door is unlocked";
              else
                return "I can't use the key on that";
            }
            
            return "I can't use the key on that";
          }
        }
      },
      movement     : {
        "north" : function() {
          this.moveTo("hallway");
        },
        "south" : function() {
          if(this.frameVars("doorOpen"))
            return "I can't leave now, I've come too far";
          else
            return "The door is shut";
        }
      },
      openables : {
        "door"   : {} ,
        "drawer" : {}
      },
    },
    "hallway" : {
      intro    : "You're in a long hallway.  It splits off to the east and west.  To the south is the entrance to the mansion.",
      inspect  : "Something tells you this place isn't as big as it looked from the outside",
      movement : {
        "south" : function() {
          this.moveTo("entry");
        },
        "east"  : function() {
          this.moveTo("deadEnd");
        },
        "west"  : function() {
          this.moveTo("doorRoom");
        }
      }
    },
    "deadEnd" : {
      intro    : "You've arrived in a short hallway.  Looks like a dead end.  On the floor is a pile of junk.  To the west is a hallway.",
      inspect  : function() {
        if(this.frameHasItem("shovel"))
          return "Upon further inspection, you find a shovel in the pile.";
        else
          return "Just a dirty dead end.";
      },
      items    : {
        "shovel" : {
          pronounString : "a shovel",
          use           : function(obj) {
            if(this.getCurrentFrameName() === "garden") {
              if(this.frameVars("holeDug"))
                return "You already dug a hole";
              
              this.frameVars("holeDug", true);
              
              if(obj === "ground")
                return "You dug a hole.  There's a large chest inside!";
              else
                return "I can't use the shovel with that.";
            }
            
            return "I can't use the key on that";
          }
        }
      },
      movement : {
        "west" : function() {
          this.moveTo("hallway");
        }
      }
    },
    "doorRoom" : {
      intro        : "In the west of a small alcove is a shut door.  To the east is a hallway.",
      onEnter      : function() {
        this.initFrameVar( "doorOpen",   false );
        this.initFrameVar( "doorLocked", true  );
      },
      openables : {
        "door" : {
          canOpen : function()
          {
            var locked = this.frameVars("doorLocked");

            if(locked)
              this.print("It's locked");

            return !locked;
          }
        }
      },
      movement : {
        "east" : function() {
          this.moveTo("hallway");
        },
        "west" : function() {
          if(this.frameVars("doorOpen"))
            this.moveTo("garden");
          else
            return "The door is shut.";
        }
      }
    },
    "garden" : {
      intro        : "You're in a small garden.  To the east is a doorway leading back into the house.",
      onEnter      : function() {
        this.initFrameVar("holeDug", false);
      },
      inspect      : function() {
        if(this.frameVars("holeDug"))
          return "The hole you dug is still there.  There's a large chest sitting in it.";
        else
          return "The ground here is really soft.";
      },
      movement     : {
        "east" : function() {
          this.moveTo("doorRoom");
        }
      },
      frameActions : {
        "dig"  : function() {
          if(this.inventoryHasItem("shovel"))
            this.play("use shovel on ground");
        },
        "open" : function(input) {
          if(this.frameVars("holeDug") && input === "chest")
          {
            this.end("You already found the treasure!  Good job!");
            return "You found the treasure!  Congratulations!";
          }
        }
      }
    }
  }
};



if(typeof module !== 'undefined' && module.exports)
{
  module.exports = theMansion;
}