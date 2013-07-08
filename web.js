 var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());

app.get('/', function(request, response) {

var indexcontent=fs.readFile('../index.html');
buf = new Buffer(indexcontent.length);

for (var i = 0; i < indexcontent.length ; i++) {
  buf[i] = indexcontent.charCodeAt(i);
}
  response.send(buf);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
