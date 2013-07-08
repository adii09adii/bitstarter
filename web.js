 var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
/*
var con=fs.readFileSync('index.html', function (err, data) {
  if (err) throw err;
  return data;
});*/

var con=fs.readFileSync('index.html','utf8');
var data =con.toString('utf8', 0, con.length);





//buf = new Buffer(indexcontent.length);
//console.log('length'+buf);
/*
for (var i = 0; i < indexcontent.length ; i++) {
  buf[i] = indexcontent.charCodeAt(i);
}*/
  response.send(data);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
