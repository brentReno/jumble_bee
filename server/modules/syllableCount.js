var retext = require('retext');
var inspect = require('unist-util-inspect');
var syllable = require('retext-syllable');

var count;
var syllableCount = function(word){
  console.log("in the module");
  retext().use(syllable).use(function () {
    return function (cst) {
        var testData = cst;
        console.log("syllable count is:", testData.children[0].data.syllableCount);
        count = testData.children[0].data.syllableCount;
    };
}).process(word);
  return count;
};
module.exports  = syllableCount;
