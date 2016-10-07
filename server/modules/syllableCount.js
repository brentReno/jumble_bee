var retext = require('retext');
var inspect = require('unist-util-inspect');
var syllable = require('retext-syllable');

var count;
var syllableCount = function(word){
  console.log("in the module");
  retext().use(syllable).use(function () {
    return function (cst) {
        //store cst in a variable
        var testData = cst;
        //make sure i'm getting what I want
        console.log("syllable count is:", testData.children[0].data.syllableCount);
        //saving num syllables to count
        count = testData.children[0].data.syllableCount;
    };
}).process(word);
  //rertun num syllables
  return count;
};
module.exports  = syllableCount;
