myApp.service('quizService',function(){
  //establish words var to contain quiz words
 var words;

  //function to add quiz to words var
  var addWords = function(quiz){
     words = quiz;
     return words;
  };
//get the words for manipulation
var getQuiz = function(){
  return words;
};
  return{
    addWords: addWords,
    getQuiz: getQuiz
  };

});
