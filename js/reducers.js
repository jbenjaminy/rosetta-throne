var actions = require('./actions');

var reducer = function(state, action) {
  state = state || {};

  if (action.type === actions.PAGE_LOAD) {
    return Object.assign({}, {
    });
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
