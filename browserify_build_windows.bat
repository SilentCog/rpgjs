@ECHO off
ECHO creating local-game.js
CALL browserify source\app.local.js > public\js\local-game.js
ECHO local-game.js created
ECHO creating remote-game.js
CALL browserify source\app.remote.js > public\js\remote-game.js
ECHO remote-game.js created
PAUSE