var actions = require('./actions');

var reducer = function(state, action) {
  state = state || {};

  if (action.type === actions.PAGE_LOAD) {
    return Object.assign({}, state, {
      questionNumber: 0
    });
  } else if (action.type === actions.FETCH_QUESTIONS_SUCCESS) {
    return Object.assign({}, state, {
      userAnswer: '',
      questions: action.questions
    });
  } else if (action.type === actions.FETCH_QUESTIONS_ERROR) {
    return state;
  } else if (action.type === actions.SUBMIT_ANSWER) {
    return Object.assign({}, state, {
      userAnswer: action.answer,
      questionNumber: state.questionNumber + 1
    });
  } else {
    return state;
  }
};

module.exports = reducer;
