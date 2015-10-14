var simpleGame = {
  name           : "Simple Game",
  version        : "0.1",
  intro          : "You're in the forest",
  frames         : {
    "entry" : {
      intro        : "Which way would you like to go?",
      inspect      : function() {
        return "It's a forest.  There are trees.";
      },
      movement     : {
        "north" : function() {
          this.end("You already escaped!");
          return "You escaped!";
        },
        "south" : function() {
          this.end("Already dead.  Cause of death: forest-shark");
          return "Nope, shark, you died.";
        },
        "east"  : function() {
          this.end("Already dead.  Cause of death: eagle");
          this.end("Nope, giant eagle, you died.");
        },
        "west"  : function() {
          this.end("Already dead.  Cause of death: bear");
          this.end("Nope, bear, you died.");
        }
      }
    }
  }
};



if(typeof module !== 'undefined' && module.exports)
{
  module.exports = simpleGame;
}