var theMansion = {
  version        : "0.2",
  intro          : "Oh look!  A house!  Let's go in it!",
  setup          : function()
  {
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
            return this.frameVars("drawerOpen");
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
      frameActions : {
        "shut" : function(val) {
          switch(val) {
            case "door":
              if(this.frameVars("doorOpen")) {
                this.frameVars("doorOpen", false);
                return "I've shut the door";
              }
              else
                return "The door is already shut";
              break;
              
            case "drawer":
              if(this.frameVars("drawerOpen")) {
                this.frameVars("drawerOpen", false);
                return "I've shut the drawer";
              }
              else
                return "The drawer is already shut";
              break;  
              
            case "":
              return "What did you want me to shut?";
              
            default:
              return "I can't shut that.";
          }
        },
        "open" : function(val) {
          switch(val) {
            case "door":
              if(!this.frameVars("doorOpen")) {
                this.frameVars("doorOpen", true);
                return "I've opened the door";
              }
              else
                return "The door is already open";
              break;
              
            case "drawer":
              if(!this.frameVars("drawerOpen")) {
                this.frameVars("drawerOpen", true);
                return "I've opened the door" + (this.frameHasItem("key") ? ", there is a key inside." : ".");
              }
              else
                return "The drawer is already open";
              break;
              
            case "":
              return "What did you want me to open?";
              
            default:
              return "I can't open that.";
          }
        }
      }
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
      frameActions : {
        "shut" : function(val) {
          switch(val) {
            case "door":
              if(this.frameVars("doorOpen")) {
                this.frameVars("doorOpen", false);
                return "I've shut the door";
              }
              else
                return "The door is already shut";
              break;
              
            case "":
              return "What did you want me to shut?";
              
            default:
              return "I can't shut that.";
          }
        },
        "open" : function(val) {
          switch(val) {
            case "door":
              if(!this.frameVars("doorOpen")) {
                if(!this.frameVars("doorLocked")) {
                  this.frameVars("doorOpen", true);
                  return "I've opened the door";
                }
                else
                  return "It's locked.";
              }
              else
                return "The door is already open";
              break;
              
            case "":
              return "What did you want me to open?";
              
            default:
              return "I can't open that.";
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