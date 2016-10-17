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
      type: 'updateUser',
      data: user
    });
  });

  socket.on('action', (action) => {
    console.log(action.type, '<-----ACTION.TYPE');
    if (action.type === 'server/getPreviewQuestions') {
      var level = action.data.currentLevel;
      var lesson = action.data.currentLesson;
      findQuestions(socket.id).then((questions) => {
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
        socket.emit('action', {
          type: 'updateQuiz',
          data: {
            questions: questionArr,
            questionNumber: 0,
            startQuiz: false
          }
        });
      });
    }
    if (action.type === 'server/getQuizQuestions') {
      var level = action.data.currentLevel;
      var lesson = action.data.currentLesson;
    }
    if (action.type === 'server/incrementQuestion') {
      var questionNumber = action.data.questionNumber + 1;
      var startQuiz = false;
      var questions = action.data.questions
      if (questionNumber === questions.length - 1) {
        startQuiz = true;
        questionNumber = null;
        questions = [];
      }
      socket.emit('action', {
        type: 'updateQuiz',
        data: {
          questions: questions,
          questionNumber: questionNumber,
          startQuiz: startQuiz
        }
      });
    }
    if (action.type === 'server/incrementLesson') {
      var level = action.data.currentLevel;
      var lesson = action.data.currentLesson + 1;
      if (lesson === 6) {
        level = level + 1;
        lesson = 1;
        if (level === 6) {
          level = 1;
        }
      }
      updateLesson(level, lesson).then(function(user) {
        socket.emit('action', {
          type: 'updateUser',
          data: user
        });
      }); 
    }
    if (action.type === 'server/updateLesson') {
      var level = action.data.currentLevel;
      var lesson = action.data.currentLesson;
      updateLesson(level, lesson).then(function(user) {
        socket.emit('action', {
          type: 'updateUser',
          data: user
        });
      });     
    }
    if (action.type === 'server/updateMvalue') {
      var mValue = action.data.mValue;
      var id = action.data.id;
    }
    if (action.type === 'server/updateCompleted') {
      var level = action.data.currentLevel;
      var lesson = action.data.currentLesson;
      var funct = action.data.funct;
      updateCompleted(level, lesson, funct).then(function(user) {
        socket.emit('action', {
          type: 'updateUser',
          data: user
        });
      });   
    }
    if (action.type === 'server/restartQuiz') {
      var level = action.data.currentLevel;
      var lesson = action.data.currentLesson; 
      // remove from completed
    }
  });

  socket.on('disconnect', function() {
    deleteUser(socket.id);
    console.log('Socket disconnected: ', socket.id);
  });
});

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