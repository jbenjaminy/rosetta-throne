var fetch = require('isomorphic-fetch');

var PAGE_LOAD = 'PAGE_LOAD';
var pageLoad = function() {
  return {
    type: PAGE_LOAD
  };
};

var INCREMENT_QUESTION = 'INCREMENT_QUESTION';
var incrementQuestion = function() {
  return {
    type: INCREMENT_QUESTION
  };
};

var updateMvalue = function(m, id) {
  return function(dispatch) {
    var url = 'http://localhost:8081/questions/'+ id + '/' + m;
    var request = {
      method: 'put',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
    };
    return fetch(url, request)
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
    .then(function() {
      return dispatch(updateMvalueSuccess());
    })
    .catch(function(error) {
      return dispatch(updateMvalueError(error));
    });
  }
};

var UPDATE_MVALUE_SUCCESS = 'UPDATE_MVALUE_SUCCESS';
var updateMvalueSuccess = function() {
  return {
    type: UPDATE_MVALUE_SUCCESS
  };
};
var UPDATE_MVALUE_ERROR = 'UPDATE_MVALUE_ERROR';
var updateMvalueError = function(error) {
  return {
    type: UPDATE_MVALUE_ERROR,
    error: error
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

var fetchPreview = function() {

  // Sends fetch to retrieve questions from the server connected to DB
  return function(dispatch) {
    var url = 'http://localhost:8081/preview/';
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
      return dispatch(fetchPreviewSuccess(questions));
    })
    .catch(function(error) {
      return dispatch(fetchPreviewError(error));
    });
  }
};

var FETCH_PREVIEW_SUCCESS = 'FETCH_PREVIEW_SUCCESS';
var fetchPreviewSuccess = function(questions) {
  return {
    type: FETCH_PREVIEW_SUCCESS,
    questions: questions
  };
};

var FETCH_PREVIEW_ERROR = 'FETCH_PREVIEW_ERROR';
var fetchPreviewError = function(error) {
  return {
    type: FETCH_PREVIEW_ERROR,
    error: error
  };
};

exports.pageLoad = pageLoad;
exports.PAGE_LOAD = PAGE_LOAD;
exports.incrementQuestion = incrementQuestion;
exports.INCREMENT_QUESTION = INCREMENT_QUESTION;
exports.fetchPreviewSuccess = fetchPreviewSuccess;
exports.FETCH_PREVIEW_SUCCESS = FETCH_PREVIEW_SUCCESS;
exports.fetchPreviewError = fetchPreviewError;
exports.FETCH_PREVIEW_ERROR = FETCH_PREVIEW_ERROR;
exports.fetchPreview = fetchPreview;
exports.updateMvalueSuccess = updateMvalueSuccess;
exports.UPDATE_MVALUE_SUCCESS = UPDATE_MVALUE_SUCCESS;
exports.updateMvalueError = updateMvalueError;
exports.UPDATE_MVALUE_ERROR = UPDATE_MVALUE_ERROR;
exports.updateMvalue = updateMvalue;
exports.fetchQuestionsSuccess = fetchQuestionsSuccess;
exports.FETCH_QUESTIONS_SUCCESS = FETCH_QUESTIONS_SUCCESS;
exports.fetchQuestionsError = fetchQuestionsError;
exports.FETCH_QUESTIONS_ERROR = FETCH_QUESTIONS_ERROR;
exports.fetchQuestions = fetchQuestions;
