var express      = require('express')                         ;
var logger       = require('morgan')                          ;
var cookieParser = require('cookie-parser')                   ;
var bodyParser   = require('body-parser')                     ;
var path         = require('path')                            ;
var session      = require('express-session')                 ;
var server       = require('http').Server(express())          ;
var io           = require('socket.io')(server)               ;
var GameEngine   = require('./source/game-engine/local-game') ;

var app = express();

// Jade, we're not really using it, but it keeps Node quiet
app.set('view engine', 'jade');

// set up sessions
// TODO: bring back redis! We need better session storing to avoid memory leaks! 
//var redis = require('redis');
//var client = redis.createClient(6379, 'localhost');
var sessionMiddleware = session({
  secret            : "d41d8cd98f00b204e9800998ecf8427e" ,
  resave            : true                               ,
  saveUninitialized : true
});

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

server.listen(80);
io.on('connection', function (socket)
{
  var ioSess = socket.request.session;
  
  socket.on('createGame', function(data)
  {
    var gameName = data.gameName;
    var gameData;
    
    console.log("creating new game \"" + gameName + "\" for user");
    
    try
    {
      gameData = require('./source/games/' + gameName);
    }
    catch(e)
    {
      console.error("Could not find game \"" + gameName + "\"");
      return;
    }
    
    ioSess.game = GameEngine.NewGame(gameData, function(text)
    {
      socket.emit('textCallback', { text : text });
    });
  });

  socket.on('gameCommand', function (data)
  {
    ioSess.game(data.command);
  });
});

app.get('/', function(req, res)
{
  res.redirect("/local-game");
});

app.get('/local-game', function(req, res)
{
  res.sendFile(path.join(__dirname, "public/local-game.html"));
});

app.get('/remote-game', function(req, res)
{
  res.sendFile(path.join(__dirname, "public/remote-game.html"));
});

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//var routes = require('./routes/index')();
//app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development')
{
	app.use(function(err, req, res, next)
	{
		res.status(err.status || 500);
		
		res.render('error', {
			message : err.message,
			error   : err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next)
{
	res.status(err.status || 500);
	
	res.render('error', {
		message : err.message,
		error   : {}
	});
});


module.exports = app;
