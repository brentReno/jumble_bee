myApp.service('quizService', function(){
  //establish words var to contain quiz words
  var words = [];
  //function to add quiz to words var
  var addWords = function(quiz){
     words = quiz;
    //  console.log("add words words:", words);
     return words;
  };
  //get the words for manipulation
  var getQuiz = function(){
    // console.log("get words words:", words);
  return words;
};

var emptyWords=function(){
  words = [];
  // console.log("empty words:", words);
  return words;
};

  //jumble the quiz words
  var jumble = function(quiz){
    //loop through quiz data
    for (var i = 0; i < quiz.length; i++) {
      // get single word returned in an array
      var wordToJumble= quiz.slice(i,i+1);
      var arrayOfLetters= wordToJumble[0].split("");
      //shuffle the letters
      shuffle(arrayOfLetters);
      //join letters in a word
      var jumbledWord = arrayOfLetters.join("");
      //check for same word
      // console.log("word:", wordToJumble);
      // console.log("changed word:", jumbledWord);
      if(wordToJumble == jumbledWord){
        shuffle(arrayOfLetters);
      }
      else{
      //push words to an array
      jumbledWords.push(jumbledWord);
      }
    }
    return jumbledWords;
  };//end jumble

  //shuffle code from here http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
  var shuffle = function(array){
    var j,x,i;
    for (i = array.length; i; i--) {
      j= Math.floor(Math.random()*i);
      x = array[i-1];
      array[i-1] = array[j];
      array[j]=x;
    }
    return array;
  };//end shuffle

  //login function
  var logIn = function(){
    // console.log("inside login");
    lock.show(function(err,profile,token){
      if(err){
        // console.error("Log In error:", err);
      }//end error
      else{
        //save token
        localStorage.setItem('userToken', token);
        // save profile
        localStorage.setItem('userProfile', JSON.stringify(profile));
        //reload for protection
        location.reload();
      }//end else
    });//end show
  };//end login function


  return{
    addWords: addWords,
    getQuiz: getQuiz,
    jumble: jumble,
    shuffle: shuffle,
    emptyWords: emptyWords,
    logIn: logIn
  };
});
