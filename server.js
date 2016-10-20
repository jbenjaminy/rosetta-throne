/*---------------------------DEPENDENCIES -----------------------------*/
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const config = require('./config');

const server = require('http').Server(app);
const io = require('socket.io')(server);

const createQuestions = require('./backend/functions/create-questions');
const createUser = require('./backend/functions/create-user');
const assemblePracticeSet = require('./backend/functions/assemble-practice-set');
const deleteUser = require('./backend/functions/delete-user');
const findQuestions = require('./backend/functions/find-questions');
const updateCompleted = require('./backend/functions/update-completed');
const updateLesson = require('./backend/functions/update-lesson');
const updateMvalue = require('./backend/functions/update-mvalue');
const updateMs = require('./backend/functions/update-ms');

/*----- Serve Frontend -----*/
app.use(express.static('./build'));

/*--------------------------- SOCKET MANAGEMENT -----------------------------*/
io.on('connection', (socket) => {
  console.log('Socket connected: ', socket.id);
  createQuestions(socket.id);
  createUser(socket.id).then((user) => {
    socket.emit('action', {
      type: 'updateUser',
      data: user
    });
  });

  socket.on('action', (action) => {
    if (action.type === 'server/getPreviewQuestions') {
      let level = action.data.currentLevel;
      let lesson = action.data.currentLesson;
      findQuestions(socket.id).then((questions) => {
        let questionArr = [];
        for (let i = 0; i < questions.length; i++) {
          let questionObj = {
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
      let level = parseInt(action.data.currentLevel);
      let lesson = parseInt(action.data.currentLesson);
      findQuestions(socket.id).then((questions) => {
        let questionArr = [];
        for (let i = 0; i < questions.length; i++) {
          let questionObj = {
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
        // console.log('questionArr---->', questionArr);
        assemblePracticeSet(questionArr).then((practiceSet) => {
          socket.emit('action', {
            type: 'updateQuiz',
            data: {
              questions: practiceSet,
              questionNumber: null,
              startQuiz: true
            }
          });          
        });
      });
    }
    if (action.type === 'server/incrementQuestion') {
      let questionNumber = action.data.questionNumber + 1;
      let startQuiz = false;
      let questions = action.data.questions
      if (questionNumber === questions.length) {
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
      let level = parseInt(action.data.currentLevel);
      let lesson = parseInt(action.data.currentLesson) + 1;
      console.log('level --->', level);
      console.log('lesson ----> ', lesson);
      if (lesson === 6) {
        level = level + 1;
        lesson = 1;
        if (level === 6) {
          level = 1;
        }
      }
      updateLesson(socket.id, level, lesson).then((user) => {
        socket.emit('action', {
          type: 'updateUser',
          data: user
        });
      }); 
    }
    if (action.type === 'server/updateLesson') {
      let level = parseInt(action.data.currentLevel);
      let lesson = parseInt(action.data.currentLesson);
      updateLesson(socket.id, level, lesson).then((user) => {
        findQuestions(socket.id).then((questions) => {
          let questionArr = [];
          for (let i = 0; i < questions.length; i++) {
            let questionObj = {
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
          socket.emit('action', {
            type: 'updateUser',
            data: user
          });
        });
      });     
    }
    if (action.type === 'server/updateMvalue') {
      let mValue = action.data.mValue;
      let id = action.data.id;
      let level = action.data.level;
      let lesson = action.data.lesson;
      updateMvalue(mValue, id).then(() => {
        findQuestions(socket.id).then((questions) => {
          let questionArr = [];
          for (let i = 0; i < questions.length; i++) {
            let questionObj = {
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
          assemblePracticeSet(questionArr).then((practiceSet) => {
            socket.emit('action', {
              type: 'updateQuiz',
              data: {
                questions: practiceSet,
                questionNumber: null,
                startQuiz: true
              }
            });          
          });
        });
      });
    }
    if (action.type === 'server/updateCompleted') {
      let level = action.data.currentLevel;
      let lesson = action.data.currentLesson;
      let funct = action.data.funct;
      let completed = action.data.completed;
      updateCompleted(socket.id, level, lesson, funct, completed).then((user) => {
        socket.emit('action', {
          type: 'updateUser',
          data: user
        });
      });   
    }
    if (action.type === 'server/restartQuiz') {
      let level = action.data.currentLevel;
      let lesson = action.data.currentLesson;
      resetMs(socket.id, level, lesson).then(() => {
        findQuestions(socket.id).then((questions) => {
          let questionArr = [];
          for (let i = 0; i < questions.length; i++) {
            let questionObj = {
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
      });
    }
  });
  socket.on('disconnect', () => {
    deleteUser(socket.id);
  });
});

/*----------------------------- RUN SERVER -----------------------------*/

let runServer = (callback) => {
  mongoose.connect(config.DATABASE_URL, (err) => {
    if (err && callback) {
      return callback(err);
    }

    server.listen(config.PORT, () => {
      console.log(`Listening on localhost: ${config.PORT}`);
      if (callback) {
        callback();
      }
    });
  });
};

if (require.main === module) {
  runServer((err) => {
    if (err) {
      throw new Error(err);
    }
  });
}