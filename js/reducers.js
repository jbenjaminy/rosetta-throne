var actions = require('./actions');

var reducer = function(state, action) {
  state = state || {};

  if (action.type === actions.PAGE_LOAD) {
    return Object.assign({}, {
      questions: {
	        1: {
            prompt: 'havzi',
            answer: 'cat' },
          2: {
            prompt: 'vilajero',
            answer: 'battle' },
	        3: {
            prompt: 'vorsa',
            answer: 'fire' },
          4: {
            prompt: 'zhavorsa',
            answer: 'dragon'},
          5: {
            prompt: 'vov',
            answer: 'weapon'}
      },
      questionNumber: 1,
      userAnswer: ''
    });
  }

  else if (action.type === actions.SUBMIT_ANSWER) {
    console.log("here")
    return Object.assign({}, state, {
      userAnswer: action.answer,
      questionNumber: state.questionNumber + 1

    });
  }
  else {
    return state
  }
};





module.exports = reducer;
