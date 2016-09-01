var actions = require('./actions');

var reducer = function(state, action) {
  state = state || {};

  if (action.type === actions.PAGE_LOAD) {
    return Object.assign({}, {
    });
  } else if (action.type === actions.INCREMENT_QUESTION) {
      var questionNumber = state.questionNumber + 1;
      // var startQuiz = false;
      // var previewQuestions = state.previewQuestions
      // if (questionNumber === state.previewQuestions.length - 1) {
      //   startQuiz = true;
      //   previewQuestions = false;
      // }
    return Object.assign({}, state, {
      questionNumber: questionNumber
      // startQuiz: startQuiz,
      // previewQuestions: previewQuestions
    });
  } else if (action.type === actions.FETCH_PREVIEW_SUCCESS) {
    console.log(action.questions, "action.questions")
    return Object.assign({}, state, {
      previewQuestions: action.questions,
      questionNumber: 0,
      startQuiz: false
    });
  } else if (action.type === actions.FETCH_PREVIEW_ERROR) {
    return state;
  } else if (action.type === actions.FETCH_QUESTIONS_SUCCESS) {
    return Object.assign({}, state, {
      questions: action.questions,
      refreshQuestions: false
    });
  } else if (action.type === actions.FETCH_QUESTIONS_ERROR) {
    return state;
  } else if (action.type === actions.UPDATE_MVALUE_SUCCESS) {
    return Object.assign({}, state, {
      refreshQuestions: true
    });
  } else if (action.type === actions.UPDATE_MVALUE_ERROR) {
    return state;
  } else {
    return state;
  }
};

module.exports = reducer;
