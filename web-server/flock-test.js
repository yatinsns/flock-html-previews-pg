var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = "localhost";
var port = 3000;

var server = http.createServer(function(req, res) {
  console.log("Request for" + req.url + " by method " + req.method);
  if (req.method == "GET") {
    var min = 0;
    var max = 2;
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    var fileUrl;
    if (num == 0) {
      fileUrl = "/index.html";
    } else {
      fileUrl = "/aboutus.html";
    }

    var filePath = path.resolve('./public' + fileUrl);
    var fileExt = path.extname(filePath);
    fs.exists(filePath, function(exists) {
        if (exists) {
	  res.writeHead(200, {'Content-Type': 'text/html'});
	  fs.createReadStream(filePath).pipe(res);
	} else {
	  res.writeHead(404, {'Content-Type': 'text/html'});
	  res.end('<h1>Error 404: File not found</h1>')
	}
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>Error 404: Only Get Requests please</h1>')
  }
});

server.listen(port, hostname, function() {
  console.log("Server running at http://${hostname}:${port}/")
});




