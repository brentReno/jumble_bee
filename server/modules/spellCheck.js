var Typo = require('typo-js');
var dictionary = new Typo("en_US");


var spellCheck = function(quiz){
   var trueQuiz=[];
   var falseResults=[];
   var trueObject;
   var falseObject;
  for (var i = 0; i < quiz.length; i++) {
    if(dictionary.check(quiz[i])===false){
      // empty false results array
      //capture misspeled word
      var falseWord= quiz[i];
      //get correct spelling suggestions
      var suggestedWords= dictionary.suggest(falseWord);
      //pacake misspelled word, and suggestions together
      var suggestedObject ={
        misspelled: falseWord,
        suggested: suggestedWords,
      };
      //push objects to return array
      console.log("this is false", falseResults);
      falseResults.push(suggestedObject);
    }
    else{
      console.log("this is true", trueQuiz);
      //capture correct word
      var trueWord = quiz[i];
      //push correct words to array
      trueQuiz.push(trueWord);
      //package quiz array with a boolean for use in other checks
      trueObject={
        spelling: true,
        quiz: trueQuiz
      };
    }
  }//end for
  if(falseResults.length<1){
    console.log("in if ", trueObject, falseResults);
  return trueObject;
}
else{
  console.log("in else", trueObject, falseResults);
  //create falseObject
  falseObject={
    spelling: false,
    results:falseResults
  };
  return falseObject;
}
};

module.exports = spellCheck;
