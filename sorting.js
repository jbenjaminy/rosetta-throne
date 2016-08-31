// Write an algorith to sort the questions
//          x  o  x  o  o
// array = [A, B, C, D, E]
// var nextQuestion = nextQuestion
//
//
var sort = function(questionBank) {
  var que = [];
  questionBank.forEach(function(question) {
    if (question.m === 1) {
      que.push(question)
    }
  });
  for (var i = 0; i < questionBank.length; i++) {
    console.log(i, questionBank.length - 1, questionBank[i])
    if (questionBank[i].m === 1) {
      for (var j = i+1; j < questionBank.length; j++) {
        if(questionBank[j].m === 1) {
          que.push(questionBank[i])
          que.push(questionBank[j])
          que.push(questionBank[i])
          que.push(questionBank[j])
          i = j;
          break;
        } else {
          que.push(questionBank[i])
          que.push(questionBank[i])
        }
      }
    }
    if (i === questionBank.length - 1 && questionBank[i].m === 1) {
      que.push(questionBank[i])
      que.push(questionBank[i])
    }
    for (var i = 0; i < questionBank.length; i++) {

    }
  };
  return que
}

var array = [{q: 1, m: 1}, {q: 2, m: 1}, {q: 3, m: 1}, {q: 4, m: 1}, {q: 5, m: 1}];
console.log(sort(array));
