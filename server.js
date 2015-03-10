var http = require('http');
var path = require('path');
var url = require('url');
var fs = require('fs');
var port = 4020;

var extensions = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".png": "image/png",
  ".gif": "image/gif",
  ".jpg": "image/jpeg"
};

http.createServer(function (request, response) {
  var my_path = url.parse(request.url).pathname || 'index.html'; // set path to index.html if nothing is specified
  var full_path = path.join(process.cwd(), my_path);
  var ext = path.extname(my_path);
  var mime;

  if (extensions[ext]) {
    mime = extensions[ext];
  }

  fs.exists(full_path, function (exists) {
    if (!exists) {
      response.writeHeader(404, {'Content-Type': 'text/plain'});
      response.write('404 Not Found\n');
      response.end();
    } else {
      fs.readFile(full_path, 'binary', function (err, file) {
        if (err) {
          response.writeHeader(500, {'Content-Type': 'text/plain'});
          response.write(err + '\n');
          response.end();
        } else {
          var ip = request.connection.remoteAddress;
          var ts = new Date().toLocaleString();
          console.log(ts, '  ', ip, '  ', '200', '  ', my_path, mime);
          response.writeHeader(200, {'Content-Type': mime});
          response.write(file, 'binary');
          response.end();
        }
      });
    }
  });

}).listen(port);

console.log('node server running on port: ' + port);