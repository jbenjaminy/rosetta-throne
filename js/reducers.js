// ABABCDACDBECEDE
var actions = require('./actions');

var reducer = function(state, action) {
  state = state || {};

  if (action.type === actions.PAGE_LOAD) {
    return Object.assign({}, {
      level: 1,
      lesson: 1
    });
  } else if (action.type === actions.INCREMENT_QUESTION) {
    var questionNumber = state.questionNumber + 1;
    var startQuiz = false;
    var previewQuestions = state.previewQuestions
    if (state.questionNumber === state.previewQuestions.length - 1) {
      startQuiz = true;
      previewQuestions = false;
    }
    return Object.assign({}, state, {
      questionNumber: questionNumber,
      startQuiz: startQuiz,
      previewQuestions: previewQuestions
    });
  } else if (action.type === actions.INCREMENT_LESSON) {
    var lesson = state.lesson + 1;
    var level = state.level;
    if (lesson === 6) {
      level = state.level + 1;
      if (level === 6) {
        level = 1;
      }
      lesson = 1;
    }
    return Object.assign({}, state, {
      level: level,
      lesson: lesson
    });
  } else if (action.type === actions.INCREMENT_LEVEL) {
    var level = state.level + 1;
    return Object.assign({}, state, {
      level: level,
      lesson: 1
    });
  } else if (action.type === actions.FETCH_PREVIEW_SUCCESS) {
    return Object.assign({}, state, {
      previewQuestions: action.questions,
      questionNumber: 0,
      startQuiz: false
    });
  } else if (action.type === actions.FETCH_PREVIEW_ERROR) {
    return state;
  } else if (action.type === actions.FETCH_QUESTIONS_SUCCESS) {
    console.log(action.questions)
    return Object.assign({}, state, {
      questions: action.questions,
      refreshQuestions: false,
      questionNumber: false
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
