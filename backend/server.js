/*---------------------------DEPENDENCIES -----------------------------*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models').User;
var Question = require('./models').Question;

var app = express();
var jsonParser = bodyParser.json();

Question.create({"prompt": "havzi", "correctAnswer": "cat" })
Question.create({"prompt": "vilajero","correctAnswer": "battle" })
Question.create({"prompt": "vorsa", "correctAnswer": "fire" })
Question.create({"prompt": "zhavorsa", "correctAnswer": "dragon"})
Question.create({"prompt": "vov", "correctAnswer": "weapon"})

/*----- GET request for specific user -----*/
app.get('/users/:username', function(request, response) {
  var query = {
    username: {$eq: request.params.username}
  };
  User.find(query).populate('questionHistory').exec(function(error, user) {
      // check if user[0] in returned array is falsey
      if (!user[0]) {
          // return 404 error message if specified user does not exist
          return response.status(404).json({
              message: "User not found"
          });
      }
      var userDocument = {
          _id: user[0]._id,
          username: user[0].username,
          questionHistory: user[0].questionHistory
      };
      // returns OK status and user that was queried in response
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

//creates new user from the constructor
  var user = new User({
      username: username,
      questionHistory: []
  });
  // saves new user to database
  user.save(function(error) {
     if (error) {
         return response.status(500).json({
             message: 'Internal server error'
         });
     }
     response.status(201).json({});
  });
});
// PUT FOR USERS:
  // UPDATE QUESTION HISTORY AFTER EACH QUESTION IS ANSWERED
  // PUSH OBJECT LIKE THIS ONTO USER DOCUMENT
  // {
  //   question: Question._id,
  //   timeStamp: new Date(),
  //   correct: Boolean
  // }


// /*--------------------------- QUESTION ENDPOINTS ----------------------------*/

/*----- GET request for questions array -----*/
app.get('/questions', function(request, response) {

  Question.find({}, function(error, question) {
    var questionArray = [];
    for (var i = 0; i < question.length; i++) {
      var questionObject = {
        _id: question[i].id,
        prompt: question[i].prompt,
        correctAnswer: question[i].correctAnswer
      }
      questionArray.push(questionObject);
    }
    if (error) {
        return response.sendStatus(500);
    }
    // CALL FUNCTION CONTAINING ALGORITHM HERE
    response.json(questionArray);
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
        console.log("Post question error for: ", question)
      } else {
        console.log("Post question success")
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
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/test';
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
