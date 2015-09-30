ECHO creating local-game.js
browserify source\app.local.js > public\js\local-game.js
ECHO local-game.js created
ECHO creating remote-game.js
browserify source\app.remote.js > public\js\remote-game.js
ECHO remote-game.js created
read -p "Done, [ENTER] to close this window..."