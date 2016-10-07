//requires
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var urlEncodedParser = bodyParser.urlencoded({extended:false});
var Quiz = require("./models/quiz");
var mongoose = require('mongoose');
var retext = require('retext');
var inspect = require('unist-util-inspect');
var syllable = require('retext-syllable');
var syllableCount = require('./modules/syllableCount');

//set mongoose connection
 var mongoURI = 'mongodb://localhost:27017/soloproject';
 var MongoDB = mongoose.connect(mongoURI).connection;
 // mongo db connection error handeling
MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});// end mongo error handeling

//set port decision
app.set("port", (process.env.PORT || 3030));
app.use(urlEncodedParser);
app.use(bodyParser.json());

//spin up server
app.listen(app.get("port"), function(){
  console.log("I'm listening at:", app.get("port"));
});//end spin up server

//get saved quizzes for user
app.get("/saved/:username", function(req,res){
  console.log("hit the saved route");
  console.log("params:", req.params.username);
  //find the users quizzes
  Quiz.find({username: req.params.username}, function(err, quizResults){
    if(err){
      console.log("An error occured:", err);
      res.sendStatus(500);
    }
    else{
      res.send(quizResults);
    }//end if else
  });// end find
});//end get saved

//create new quiz
app.post("/create", function(req,res){
  console.log("hit the post route with:", req.body);
  var newQuiz = new Quiz({
    name:req.body.quiz_name,
    words:req.body.quiz,
    username:req.body.username
  });//end create newQuiz
  console.log("new quiz:", newQuiz);
  //save to DB
  newQuiz.save(function(err, Quiz){
    if(err){
      console.log("an error has occured:", err);
      res.sendStatus(500);
    }
    else{
      console.log("newQuiz saved!");
      console.log(Quiz);
      res.send(Quiz);
    }//end if else
  }); //end save
});//end of post create

//create new quiz based off random
app.post("/createRandom", function(req,res){
  var quizWords=[];
  var maxSyllables = 1;
  var maxChars = 7;
  for (var i = 0; i < req.body.quiz.length; i++) {
    var word = req.body.quiz[i];
    console.log(word);
    console.log(syllableCount(word));
    if(syllableCount(word)== maxSyllables && word.length < maxChars){
      quizWords.push(word);
    }
    console.log(quizWords);
  }
    var newRandomQuiz = new Quiz({
      name:req.body.quiz_name,
      words:quizWords,
      username:req.body.username
    });//end create newQuiz
    console.log("new quiz:", newRandomQuiz);
      newRandomQuiz.save(function(err, Quiz){
        if(err){
          console.log("an error has occured:", err);
          res.sendStatus(500);
        }
        else{
          console.log("newQuiz saved!");
          console.log(Quiz);
          res.send(Quiz);
        }//end if else
      }); //end save
}); //end post create random

//Serve index/etc. ****put at bottom****
app.get("/*", function(req, res){
  console.log("Here is the property:", req.params[0]);
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname, "/public/", file));
});//end serve
