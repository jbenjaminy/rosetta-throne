var fetch = require('isomorphic-fetch');

var PAGE_LOAD = 'PAGE_LOAD';
var pageLoad = function() {
  return {
    type: PAGE_LOAD
  };
};


var SUBMIT_ANSWER = 'SUBMIT_ANSWER';
var submitAnswer = function(answer) {
  return {
    type: SUBMIT_ANSWER,
    answer: answer
  };
};


exports.submitAnswer = submitAnswer;
exports.SUBMIT_ANSWER = SUBMIT_ANSWER;
exports.pageLoad = pageLoad;
exports.PAGE_LOAD = PAGE_LOAD;
