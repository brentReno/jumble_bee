var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var quizSchema= new Schema({
  name: {type: String, required: true},
  words: {type: Array, required: true},
  user_id:{type:String, required:true}
});//end quizSchema

var QuizModel = mongoose.model('quizwords', quizSchema);

module.exports = QuizModel;
