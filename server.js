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
var findQuestions = require('./backend/functions/find-questions');
var updateCompleted = require('./backend/functions/update-completed');
var updateLesson = require('./backend/functions/update-lesson');
var updateMvalue = require('./backend/functions/update-mvalue');

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
      findQuestions(socket.id).then(function(questions) {
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
      var level = parseInt(action.data.currentLevel);
      var lesson = parseInt(action.data.currentLesson);
      findQuestions(socket.id).then(function(questions) {
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
        assemblePracticeSet(questionArr).then(function(user) {
          socket.emit('action', {
            type: 'updateQuiz',
            data: {
              questions: questionArr,
            }
          });          
        });
      });
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
      var level = parseInt(action.data.currentLevel);
      var lesson = parseInt(action.data.currentLesson) + 1;
      if (lesson === 6) {
        level = level + 1;
        lesson = 1;
        if (level === 6) {
          level = 1;
        }
      }
      updateLesson(socket.id, level, lesson).then(function(user) {
        socket.emit('action', {
          type: 'updateUser',
          data: user
        });
      }); 
    }
    if (action.type === 'server/updateLesson') {
      var level = parseInt(action.data.currentLevel);
      var lesson = parseInt(action.data.currentLesson);
      updateLesson(socket.id, level, lesson).then(function(user) {
        socket.emit('action', {
          type: 'updateUser',
          data: user
        });
      });     
    }
    if (action.type === 'server/updateMvalue') {
      var mValue = action.data.mValue;
      var id = action.data.id;
      var level = action.data.level;
      var lesson = action.data.lesson;
      updateMvalue(mValue, id).then(function() {
        findQuestions(socket.id).then(function(questions) {
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
          assemblePracticeSet(questionArr).then(function(user) {
            socket.emit('action', {
              type: 'updateQuiz',
              data: {
                questions: questionArr
              }
            });          
          });
        });
      });
    }
    if (action.type === 'server/updateCompleted') {
      var level = action.data.currentLevel;
      var lesson = action.data.currentLesson;
      var funct = action.data.funct;
      var completed = action.data.completed;
      updateCompleted(socket.id, level, lesson, funct, completed).then(function(user) {
        socket.emit('action', {
          type: 'updateUser',
          data: user
        });
      });   
    }
    if (action.type === 'server/restartQuiz') {
      var level = action.data.currentLevel;
      var lesson = action.data.currentLesson;
      var funct = 'remove';
      var completed = action.data.completed;
      updateCompleted(socket.id, level, lesson, funct, completed).then(function(user) {
        findQuestions(socket.id).then(function(questions) {
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
          assemblePracticeSet(questionArr).then(function(user) {
            socket.emit('action', {
              type: 'updateQuiz',
              data: {
                questions: questionArr
              }
            });
            socket.emit('action', {
              type: 'updateUser',
              data: {
                user: user
              }
            });
          });
        }); 
      });
    }
  });
  socket.on('disconnect', function() {
    deleteUser(socket.id);
    console.log('Socket disconnected: ', socket.id);
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