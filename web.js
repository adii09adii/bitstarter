 var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
/*
var con=fs.readFile('/index.html', function (err, data) {
  if (err) throw err;
  return data;
});
*/
var indexcontent=fs.readFileSync('/index.html',[encoding]);
console.log('hello testing'+indexcontent);



//buf = new Buffer(indexcontent.length);
//console.log('length'+buf);
/*
for (var i = 0; i < indexcontent.length ; i++) {
  buf[i] = indexcontent.charCodeAt(i);
}*/
  response.send('hell0');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
