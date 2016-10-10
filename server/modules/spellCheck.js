var Typo = require('typo-js');
var dictionary = new Typo("en_US");


var spellCheck = function(quiz){
   var trueQuiz=[];
   var falseResults=[];
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
      var trueWord = quiz[i];
      trueQuiz.push(trueWord);
    }

  }//end for
  if(falseResults.length<1){
    console.log("in if ", trueQuiz, falseResults);
  return trueQuiz;
}
else{
  console.log("in else", trueQuiz, falseResults);
  return falseResults;
}
};

module.exports = spellCheck;
