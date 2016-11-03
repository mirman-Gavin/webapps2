var express = require("express");
var port = 3000;
var app = express();

app.get("/", function(req, res){
  res.send("Hello from node!");
});

app.get("/greet/:name", function(req, res) {
  var name= req.params.name
  res.send("Hi, " + name + "!")
})

app.use('/static', express.static('public'));

app.listen(port, function() {
  console.log("Listening on port" + port.toString());
})
