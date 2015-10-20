# console-game

API for creating easter-egg text-adventure game in your browser's console, or visibly on your site.


## Playing Games

Playing games created with console-game is easy!

Send commands to the function created with either `NewGame` or `NewConsoleGame`.  For example, if you created a game and saved it to a variable `g`, you could move east by using `g("move east")` (either in your code, or in your browser's console).  If the game was created using `NewConsoleGame`, the resulting text will automatically be printed to the console.  It's that simple!  For more info on what can be done, see "Basic Actions" and "Frame Actions".

## Using the API

### Creating a New Game

To create a new game assign the results of either the `NewGame` or `NewConsoleGame` function to a variable.  For the rest of this guide we'll use `g` -

```javascript
var g = NewGame("My New Game", {...});
```

`NewConsoleGame` takes only two arguments:  The game name, and the "options" object (more on that later).  The game name can be anything and is only used when the console is first opened as an introduction.

`NewGame` takes three arguments:  The same two as `NewConsoleGame` plus an additional `textCallback`.  `textCallback` should be a function which is called every time the game needs to print text - it's only parameter is the new text that needs to be displayed.

### The Options Object

The second parameter passed to the `NewGame` function is a series of options and specifications that define your entire game.  At it's base level, options has three properties -

 - version
 - intro
 - frames
 
`version` specifies the version of the game, `intro` is the text displayed on start up (in addition to the intro text from the first room).  Frames is an object which defines the bulk of your game.

### Frames

Frames are the backbone of your game.  Each one represents a room, or position.  Frames have several properties -

 - **intro** (*required - function, string*): A string, or function which returns a string, of introductory text displayed every time the player enters this frame.
 - **inspect** (*optional - function, string*): A string, or function which returns a string, of text to display when the player "inspects" this frame.
 - **onEnter** (*optional - function*): A function which is called every time the player enters this frame.
 - **items** (*optional - object*): An object containing the items available when using the "pickup" action in this frame.  See "Items", "Basic Actions".
 - **movement** (*optional - object*): An object containing possible directions to listen for when using the "move" action.  See "Basic Actions".
 - **frameActions** (*optional - object*): An object containing additional actions to listen to on this frame.  See "Frame Actions".

### Functions

Any time a function is used for a property in the options object, several game functions are made available to you.  These are all accessible via "this".  For example, in movement, if you wanted the command "move east" to move to a new frame, you would use the following code -

```javascript
movement : {
  "east" : function()
  {
    this.moveTo("frameName");
  }
}
```

For a full list of functions, see the reference at the end of this guide.

### Basic Actions

Every frame has the following actions available to it -

**move** (ex - *move east*)
The argument of this action is matched against the keys of the `movement` property of the current frame; the value of which should be a function which is then called.  Typically these are "north", "east", "south", "west" but there are no limitations (spaces included) on what you can use for an argument with move.  Doesn't even strictly need to be used for movement.

**inspect** (ex - *inspect*)
Displays the "inspect" text of the current scene.

**pickup** (ex - *pickup key*)
Picks up the named item from the frame and adds it to the player's inventory.

**use** (ex - *use key on door*)
Uses the named item on the named object.  Calls the current item's "use" function.

**inventory** (ex - *inventory*)
Shows the player everything currently in their inventory.

### Frame Actions

In addition to basic actions, every frame has the ability to add actions that apply only to it.  Frame actions are written as functions which take as their only argument the string of the player's command after the action word.  For example, if we wanted to add the option to open and close a door in our game, we would add the following frame actions to our frame -


```javascript
frameActions : {
  "open" : function(val)
  {
    switch(val)
    {
      case "door":
        if(!this.frameVars("doorOpen"))
        {
          this.frameVars("doorOpen", true);
          return "I've opened the door";
        }
        else
          return "The door is already open";
        
      case "":
        return "What did you want me to open?";
        
      default:
        return "I can't open that.";
    }
  },
  "close" : function(val)
  {
    switch(val)
    {
      case "door":
        if(this.frameVars("doorOpen"))
        {
          this.frameVars("doorOpen", false);
          return "I've shut the door";
        }
        else
          return "The door is already shut";
        
      case "":
        return "What did you want me to shut?";
        
      default:
        return "I can't shut that.";
    }
  }
}
```

### Items

Items are an important part of almost any text-adventure.  To introduce items to a frame, use the `items` property.  Items can have the following properties:

 - **pronounString** (*optional - string*): A string that is used when referring to the item in a sentence, ie - "*a* key", "*an* orange", "*some* hummus".  If no pronoun string is specified, "a" is used with the item name.
 - **availability** (*optional - function*): A function which is called when the player tries to pick up this item.  If the function returns false, the item will not be accessible to the player.  This is useful for items that are only visible under certain circumstances.  ie - the item is in a drawer that needs to first be opened.
 - **use** (*optional - function*): A function which is called when the player tries to use an item on something.  The function should take a single argument, the string after the word "on" in the command; so if a user enters the command "use key on door" the use function of "key" will be called and be sent "door" as an argument.

### Reference

The following functions can be used inside of any function in your game options.  They are all accessible with the "this" keyword.

**addItemToFrame** (itemName : *required string*, item : *required object*) : *boolean*
Adds the item `item` to the current frame under the name `itemName`.  Returns true if successful, false if not (item already in frame).

**addItemToInventory** (itemName : *required string*, item : *required object*) : *boolean*
Adds the item `item` to the player's inventory under the name `itemName`.  Returns true if successful, false if not (item already in frame).

**end** (message : *optional string*) : *void*
Ends the game.  You can specify a message that will be displayed to the user if any further input is entered with the `message` argument.

**frameHasItem** (itemName : *required string*) : *boolean*
Returns true if the current frame has an item named `itemName` in it.

**frameVars** (key : *required string*, value : *optional any*) : *any*
Frame variables are variables that are accessible only on the current frame, and are persistent between visits to the frame.  The `frameVars` function sets frame variable `key` if `value` is specified, and returns the value of `key` always.

**gameVars** (key : *required string*, value : *optional any*) : *any*
Game variables are variables that are accessible from any frame.  The `gameVars` function sets game variable `key` if `value` is specified, and returns the value of `key` always.

**getCurrentFrame** () : *object*
Returns the object of the current frame as it is defined in the `options` object.

**getCurrentFrameName** () : *string*
Returns the name of the current frame.

**getItemFromFrame** (itemName : *required string*) : *object*
Gets the item object of item `itemName` from the current frame.

**getItemFromInventory** (itemName : *required string*) : *object*
Gets the item object of item `itemName` from the player's inventory.

**getInventory** () : *object*
Gets the current inventory in object form.

**initFrameVar** (key : *required string*, value : *required any*) : *any*
If frame variable `key` does not exist, it will be created and set to value `value`.  Otherwise does nothing.

**initGameVar** (key : *required string*, value : *required any*) : *any*
If game variable `key` does not exist, it will be created and set to value `value`.  Otherwise does nothing.

**inventoryHasItem** (itemName : *required string*) : *boolean*
Returns true if the player's inventory has an item named `itemName` in it.

**itemAvailableInFrame** (itemName : *required string*) : *boolean*
Similar to frameHasItem, only also checks if item is available.

**moveTo** (frameName : *required string*) : *void*
Changes the current frame to `frameName`.

**play** (input : *required string*) : *void*
Can be used to issue commands as the player would.  Simply pass a string as you would if you were a player.

**print** (text : *required string*) : *void*
Sends `text` to the text callback method specified in `NewGame`.  For `NewConsoleGame`, this writes to the browser console.

**removeItemFromFrame** (itemName : *required string*) : *boolean*
Removes the item `itemName` from the current frame.  Returns true if successful, false if not (item not found in frame).

**removeItemFromInventory** (itemName : *required string*) : *boolean*
Removes the item `itemName` from the player's inventory.  Returns true if successful, false if not (item not found in inventory).

## Development Server

Install node.js and run this to install dependencies:

```bash
npm install
```

Then this to start the server:

```bash
npm start
```

Open your browser to `http://localhost:1337`

## Isomorphic React Goodness

Isomorphic React components live in the `/views` directory. Directory structure as follows:

```
/views
    /components - individual components for use on the client side and server side
    /layouts - html page wrappers for server side rendering
    /pages - Full pages called by express routes for server side rendering
```

## License and Editing the API

Code is provided "as-is" and comes with no promises of **any kind**.  You may modify the API in anyway you see fit, but please provide a reference to this repository, as well as a copy of this read-me.

https://github.com/SilentCog/console-game
