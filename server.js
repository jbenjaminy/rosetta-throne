/*---------------------------DEPENDENCIES -----------------------------*/
var express = require('express');
var app = express();

var mongoose = require('mongoose');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var createQuestions = require('./backend/functions/create-questions');
var createUser = require('./backend/functions/create-user');
var assemblePracticeSet = require('./backend/functions/assemble-practice-set');
var deleteUser = require('./backend/functions/delete-user');

/*----- Serve Frontend -----*/
app.use(express.static('./build'));

/*--------------------------- SOCKET MANAGEMENT -----------------------------*/
io.on('connection', function(socket) {
  console.log('Socket connected: ', socket.id);
  createQuestions(socket.id);
  createUser(socket.id).then(function(user) {
    socket.emit('action', {
      type: 'userCreated',
      data: user
    });
  });

  socket.on('action', (action) => {
    console.log(action.type, '<-----ACTION.TYPE');
    if (action.type === 'server/getPreviewQuestions') {
      // data.currentLevel, data.currentLesson
    }
    if (action.type === 'server/incrementQuestion') {
    }
    if (action.type === 'server/getQuizQuestions') {
      // data.currentLevel, data.currentLesson
    }
    if (action.type === 'server/updateMvalue') {
      // data.mValue, data.id
    }
    if (action.type === 'server/incrementLesson') {
    }
    if (action.type === 'server/lessonComplete') {
      // data.currentLevel, data.currentLesson
    }
    if (action.type === 'server/restartQuiz') {
      // data.currentLevel, data.currentLesson
    }
    if (action.type === 'server/updateLevel') {
      // data.currentLevel, data.currentLesson
    }
  });

  socket.on('disconnect', function() {
    deleteUser(socket.id);
    console.log('Socket disconnected: ', socket.id);
  });
});
//   } else if (action.type === actions.INCREMENT_QUESTION) {
//     var questionNumber = state.questionNumber + 1;
//     var startQuiz = false;
//     var previewQuestions = state.previewQuestions
//     if (state.questionNumber === state.previewQuestions.length - 1) {
//       startQuiz = true;
//       previewQuestions = false;
//     }
//     return Object.assign({}, state, {
//       questionNumber: questionNumber,
//       startQuiz: startQuiz,
//       previewQuestions: previewQuestions
//     });
//   } else if (action.type === actions.INCREMENT_LESSON) {
//     var lesson = state.lesson + 1;
//     var level = state.level;
//     if (lesson === 6) {
//       level = state.level + 1;
//       if (level === 6) {
//         level = 1;
//       }
//       lesson = 1;
//     }
//     return Object.assign({}, state, {
//       level: level,
//       lesson: lesson
//     });
//   } else if (action.type === actions.INCREMENT_LEVEL) {
//     var level = state.level + 1;
//     return Object.assign({}, state, {
//       level: level,
//       lesson: 1
//     });
//   } else if (action.type === actions.UPDATE_LEVEL) {
//     return Object.assign({}, state, {
//       level: action.level,
//       lesson: action.lesson
//     });
//   } else if (action.type === actions.FETCH_PREVIEW_SUCCESS) {
//     return Object.assign({}, state, {
//       previewQuestions: action.questions,
//       questionNumber: 0,
//       startQuiz: false
//     });
//   } else if (action.type === actions.FETCH_PREVIEW_ERROR) {
//     return state;
//   } else if (action.type === actions.FETCH_QUESTIONS_SUCCESS) {
//     console.log(action.questions)
//     return Object.assign({}, state, {
//       questions: action.questions,
//       refreshQuestions: false,
//       questionNumber: false
//     });
//   } else if (action.type === actions.FETCH_QUESTIONS_ERROR) {
//     return state;
//   } else if (action.type === actions.UPDATE_MVALUE_SUCCESS) {
//     return Object.assign({}, state, {
//       refreshQuestions: true
//     });
//   } else if (action.type === actions.UPDATE_MVALUE_ERROR) {
//     return state;
//   } else {
//     return state;
//   }
// };
/*--------------------------- QUESTION ENDPOINTS ----------------------------*/

/*----- GET request for questions preview -----*/
app.get('/preview/:level/:lesson', function(request, response) {
  var level = parseInt(request.params.level);
  var lesson = parseInt(request.params.lesson);
  Question.find({}, function(error, questions) {
    var questionArr = [];
    for (var i = 0; i < questions.length; i++) {
      var questionObj = {
        prompt: questions[i].prompt,
        placeHolder: questions[i].correctAnswer,
        level: questions[i].level,
        levelTitle: questions[i].levelTitle,
        lesson: questions[i].lesson,
        lessonTitle: questions[i].lessonTitle
      }
      if (questions[i].level === level && questions[i].lesson === lesson) {
        questionArr.push(questionObj);
      }
    }
    if (error) {
      console.error(error);
      return response.sendStatus(500);
    }
    response.json(questionArr);
  });
});

/*----- GET request for quiz questions -----*/
app.get('/questions/:level/:lesson', function(request, response) {
  var level = parseInt(request.params.level);
  var lesson = parseInt(request.params.lesson);
  Question.find({}, function(error, questions) {
    var questionArr = [];
    for (var i = 0; i < questions.length; i++) {
      var questionObj = {
        _id: questions[i].id,
        prompt: questions[i].prompt,
        correctAnswer: questions[i].correctAnswer,
        m: questions[i].m,
        level: questions[i].level,
        levelTitle: questions[i].levelTitle,
        lesson: questions[i].lesson,
        lessonTitle: questions[i].lessonTitle
      }
      if (questions[i].level === level && questions[i].lesson === lesson) {
        questionArr.push(questionObj);
      }
    }
    if (error) {
      console.error(error);
      return response.sendStatus(500);
    }
    response.json(assemblePracticeSet(questionArr));
  });
});

/* ----- PUT request for Questions to update "m" value -----*/
app.put('/questions/:id/:m', function(request, response) {
  var id = request.params.id
  var m = request.params.m
  // console.log(m, "m")
  Question.update({_id: id}, {m: m}, function(error) {
    if (error) {
      console.error(error);
      return response.status(500).json({message: 'Internal server error'});
    } response.json({});
  });
});

// /*----- POST request for Questions -----*/
app.post('/questions', function(request, response) {
  console.log(request.body, "<-- request.body");
  var questionsArray = request.body;
  var completed = 0;
  questionsArray.forEach(function(question) {
    Question.create(question, function(error) {
      if (error) {
        console.error(error);
      } else {
        console.log("Post question success");
      }
    });
    completed++;
    if (completed === questionsArray.length) {
      return response.status(201).json();
    }
  });
});

/*----------------------------- RUN SERVER -----------------------------*/

var runServer = function(callback) {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/got2';
    mongoose.connect(databaseUri).then(function() {
        var port = process.env.PORT || 8081;
        server.listen(port, function() {
            console.log('Listening on port ' + port);
            if (callback) {
                callback(server);
            }
        });
    });
};

if (require.main === module) {
  runServer(function(err) {
    if (err) {
      throw new Error(err);
    }
  });
}