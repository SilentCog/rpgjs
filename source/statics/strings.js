module.exports = {
  DIVIDER: "--------------------------------------------",
  CONTENT: {
    HELP: {
      CONSOLE: {
        START: "Use g() to play"
      },
      AVAILABLE: function (commands) {
        return 'Available commands are: ' + commands.join(', ');
      },
      OPTIONS: function (command, options) {
        return 'Options for ' + command + ' are: ' + options;
      },
      NO_OPTIONS: function (command) {
        return command + ' currently has no options';
      }
    },
    PLAY: {
      COMMAND_NOT_FOUND: function (command) {
        return "I don't understand \"" + command + "\"";
      }
    },
    MOVE: {
      CANNOT_MOVE: function (command) {
        command = command || "";

        return "I can't move " + command + "!";
      }
    },
    INSPECT: {
      EVERYTHING: "I already told you everything I know!"
    },
    PICKUP: {
      CANNOT_PICKUP: "I can't pick that up.",
      PICKUP: function (command) {
        return "Picked up " + command;
      },
      ALREADY_HAVE: function (command) {
        return "I already have " + command;
      }
    },
    USE: {
      DO_NOT_UNDERSTAND: "I don't understand.  You have to tell me to use an ITEM on an OBJECT.",
      DO_NOT_HAVE: "I don't have that item",
      CANNOT_USE_TOGETHER: "I can't use those things together"
    },
    INVENTORY: {
      CONTENTS: "I have the following items in my inventory: ",
      EMPTY: "I don't have anything."
    }
  }
};
