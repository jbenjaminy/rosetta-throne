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

var fetchQuestions = function() {

  // Sends fetch to retrieve questions from the server connected to DB
  return function(dispatch) {
    var url = 'http://localhost:8081/questions/';
    var request = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    return fetch(url, request)
    // Checks response for error messages outside of normal success range
    .then(function(response) {
      if (response.status < 200 || response.status >= 300) {
          var error = new Error(response.statusText);
          error.response = response;
          throw error;
      }
      return response;
    })
    // returns normal response
    .then(function(response) {
      return response.json();
    })
    // returns requested questions to reducers
    .then(function(questions) {
      return dispatch(fetchQuestionsSuccess(questions));
    })
    .catch(function(error) {
      return dispatch(fetchQuestionsError(error));
    });
  }
};

var FETCH_QUESTIONS_SUCCESS = 'FETCH_QUESTIONS_SUCCESS';
var fetchQuestionsSuccess = function(questions) {
  return {
    type: FETCH_QUESTIONS_SUCCESS,
    questions: questions
  };
};

var FETCH_QUESTIONS_ERROR = 'FETCH_QUESTIONS_ERROR';
var fetchQuestionsError = function(error) {
  return {
    type: FETCH_QUESTIONS_ERROR,
    error: error
  };
};

exports.submitAnswer = submitAnswer;
exports.SUBMIT_ANSWER = SUBMIT_ANSWER;
exports.pageLoad = pageLoad;
exports.PAGE_LOAD = PAGE_LOAD;
exports.fetchQuestionsSuccess = fetchQuestionsSuccess;
exports.FETCH_QUESTIONS_SUCCESS = FETCH_QUESTIONS_SUCCESS;
exports.fetchQuestionsError = fetchQuestionsError;
exports.FETCH_QUESTIONS_ERROR = FETCH_QUESTIONS_ERROR;
exports.fetchQuestions = fetchQuestions;
