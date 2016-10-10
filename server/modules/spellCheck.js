var Typo = require('typo-js');
var dictionary = new Typo("en_US");
var falseResults=[];
var trueQuiz=[];

var spellCheck = function(quiz){
  for (var i = 0; i < quiz.length; i++) {
    if(dictionary.check(quiz[i])===false){
      var falseWord= quiz[i];
      falseResults.push(falseWord);
    }
    else{
      var trueWord = quiz[i];
      trueQuiz.push(trueWord);
    }

  }
  if(falseResults!= []){
  return trueQuiz;
}
else{
  return falseReults;
}
};

module.exports = spellCheck;
