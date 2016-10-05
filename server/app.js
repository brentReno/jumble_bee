//requires
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended:false});

//set port decision
app.set("port", (process.env.PORT || 3030));
app.use(urlEncodedParser);
app.use(bodyParser.json());

//spin up server
app.listen(app.get("port"), function(){
  console.log("I'm listening at:", app.get("port"));
});//end spin up server

app.post("/create", function(req,res){
  console.log("hit the post route with:", req.body);
  res.sendStatus(200);
});//end of post create
//Serve index/etc. ****put at bottom****
app.get("/*", function(req, res){
  console.log("Here is the property:", req.params[0]);
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname, "/public/", file));
});//end serve
