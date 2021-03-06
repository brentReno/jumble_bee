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
var spellCheck = require('./modules/spellCheck');

//set mongoose connection
var databaseURI = '';
// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if(process.env.MONGODB_URI !== undefined) {
    // use the string value of the environment variable
    databaseURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    databaseURI = 'mongodb://localhost:27017/soloproject';
}

 var MongoDB = mongoose.connect(databaseURI).connection;
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
  // console.log("hit the saved route");
  // console.log("params:", req.params.username);
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
  // console.log("hit the post route with:", req.body);
   var checkedResults= spellCheck(req.body.quiz);
  //  console.log("after spellCheck", checkedResults);
   //check to see if all words are correct, test can be saved, if not return suggestions to client side
   if(checkedResults.spelling === true){
    //  console.log("All words are correct");
       var newQuiz = new Quiz({
         name:req.body.quiz_name,
         words:checkedResults.quiz,
         username:req.body.username
       });//end create newQuiz
      //  console.log("new quiz:", newQuiz);
       //save to DB
       newQuiz.save(function(err, Quiz){
         if(err){
          //  console.log("an error has occured:", err);
           res.sendStatus(500);
         }
         else{
          //  console.log("newQuiz saved!");
          //  console.log(Quiz);
           res.send(Quiz);
         }//end if else
       }); //end save
   }
   else if(checkedResults.spelling === false){
    //  console.log("some words are incorrect");
     res.send(checkedResults);
   }
});//end of post create

//create new quiz based off random
app.post("/createRandom", function(req,res){
  // console.log("this is username", req.body.username);
  //globals and maxes
  var quizWords=[];
  const MAX_SYLLABLES = 1;
  const MAX_CHARS = 7;
  const MAX_WORDS=12;
  //this should get the syllable count, and filter out words that have too many syllables or charachters
  for (var i = 0; i < req.body.quiz.length; i++) {
    var word = req.body.quiz[i];
    // console.log(word);
    // console.log(syllableCount(word));
    if(syllableCount(word)== MAX_SYLLABLES && word.length < MAX_CHARS){
      quizWords.push(word);
    }
    if(quizWords.length>MAX_WORDS){
      quizWords.splice(MAX_WORDS, quizWords.length-MAX_WORDS);
    }
    // console.log(quizWords);
  }
  // if there isn't a user logged in
  if(req.body.username == "none"){
    // console.log("no user, not being saved");
      var quizToSend={
        words:quizWords
      };
      res.send(quizToSend);
  }
  else{
    // if there is a user logged in
    //make new quiz
    var newRandomQuiz = new Quiz({
      name:req.body.quiz_name,
      words:quizWords,
      username:req.body.username
    });//end create newQuiz
    // console.log("new quiz:", newRandomQuiz);
    //save new quiz to the db
      newRandomQuiz.save(function(err, Quiz){
        if(err){
          // console.log("an error has occured:", err);
          res.sendStatus(500);
        }
        else{
          // console.log("newQuiz saved!");
          // console.log(Quiz);
          res.send(Quiz);
        }//end if else
      }); //end save
    }//end else
}); //end post create random

//Serve index/etc. ****put at bottom****
app.get("/*", function(req, res){
  // console.log("Here is the property:", req.params[0]);
  var file = req.params[0] || "/views/index.html";
  res.sendFile(path.join(__dirname, "/public/", file));
});//end serve
