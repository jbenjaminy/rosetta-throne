/*---------------------------DEPENDENCIES -----------------------------*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mongoose = require('mongoose');

var Question = require('./models').Question;
var createQuestions = require('./create-questions');
// var User = require('./models').User;
// var createUsers = require('./create-users');
var assemblePracticeSet = require('./sorting');

/*----- Create Question and User Documents in DB -----*/
createQuestions();
// createUsers();


/*----- Allow CORS-----*/
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.header("Access-Control-Allow-Methods", "PUT");
  next();
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


/*---------------- USER ENDPOINTS ------------------*/

/*----- GET request for specific user -----*/
app.get('/users/:username', function(request, response) {
  var query = {
    username: {$eq: request.params.username}
  };
  User.find(query).populate('questionHistory').exec(function(error, user) {
    if (!user[0]) {
      return response.status(404).json({
        message: "User not found"
      });
    }
    var userDocument = {
      _id: user[0]._id,
      username: user[0].username,
      questionHistory: user[0].questionHistory
    };
    response.json(userDocument);
  });
});

/*----- POST request for a user -----*/
app.post('/users/:username', jsonParser, function(request, response) {
  var username = request.params.username;
  if (!username) {
      return response.status(422).json({
          message: 'Missing field: username'
      });
  }
  var user = new User({
      username: username,
      questionHistory: []
  });

  User.save(function(error) {
    if (error) {
      console.error(error);
      return response.status(500).json({
        message: 'Internal server error'
      });
    }
    response.status(201).json({});
  });
});


/*----------------------------- RUN SERVER -----------------------------*/

var runServer = function(callback) {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/got2';
    mongoose.connect(databaseUri).then(function() {
        var port = process.env.PORT || 8081;
        var server = app.listen(port, function() {
            console.log('Listening on port ' + port);
            if (callback) {
                callback(server);
            }
        });
    });
};

if (require.main === module) {
  runServer();
}


/*------------------------------- EXPORTS -------------------------------*/
exports.app = app;
exports.runServer = runServer;
