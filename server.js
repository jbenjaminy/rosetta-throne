/*---------------------------DEPENDENCIES -----------------------------*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var mongoose = require('mongoose');

var server = require('http').Server(app);
var io = require('socket.io')(server);

var User = require('./models').User;
var Question = require('./backend/models').Question;
var createQuestions = require('./backend/create-questions');
var assemblePracticeSet = require('./backend/sorting');

/*----- Create Question and User Documents in DB -----*/
createQuestions();

/*----- Serve Frontend -----*/
app.use(express.static('./build'));

/*----- Allow CORS-----*/
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "PUT");
  next();
});
/*--------------------------- SOCKET MANAGEMENT -----------------------------*/
io.on('connection', (socket) => {
  console.log(socket.id, 'SOCKET is connected');

  /*----- POST User for newly connected socket -----*/
  User.create({
      socketId: socket.id,
      completedLessons: []
  }, function(err, user) {
    if (err) {
      console.error(err);
    }
    createQuestions(user._id);
    socket.emit('action', {
      type: 'userCreated',
      data: user
    });
  });
});

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