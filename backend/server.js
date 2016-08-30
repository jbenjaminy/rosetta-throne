/*---------------------------DEPENDENCIES -----------------------------*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models').User;
var Question = require('./models').Question;

var app = express();
var jsonParser = bodyParser.json();


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

  Question.find(request.query).populate('prompt correctAnswer').exec(function(error, question) {
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
// app.post('/messages', passport.authenticate('basic', {session: false}), function(request, response) {
//     // After authentication, checks that the 'from' field matches the requesting user's id
//     if (request.body.from !== request.user._id.toString()) {
//         return response.status(401).json({
//              message: 'Unauthorized'
//         });
//     }
//     // No text for the message
//     if (!request.body.text) {
//         return response.status(422).json({
//             message: 'Missing field: text'
//         });
//     }
//     // Message text is non-string
//     if (typeof request.body.text !== 'string') {
//         return response.status(422).json({
//             message: 'Incorrect field type: text'
//         });
//     }
//     // to field is non-string
//     if (typeof request.body.to !== 'string') {
//         return response.status(422).json({
//             message: 'Incorrect field type: to'
//         });
//     }
//     // from field is non-string
//     if (typeof request.body.from !== 'string') {
//         return response.status(422).json({
//             message: 'Incorrect field type: from'
//         });
//     }

//     // Test if from field contains an id for a non-existent user
//     User.findOne({
//         _id: request.body.from
//     }, function(error, users) {
//         // if it is a non-existent user return appropriate error
//         if (!users) {
//             return response.status(422).json({
//                 message: 'Incorrect field value: from'
//             });
//         }
//         // else test if to field contains an id for a non-existent user
//         else {
//             User.findOne({
//                 _id: request.body.to
//             }, function(error, users) {
//                 // if it is a non-existent user return appropriate error
//                 if (!users) {
//                     return response.status(422).json({
//                         message: 'Incorrect field value: to'
//                     });
//                 }
//                 // else we know both fields are valid users with appropriate input type and message text is supplied. Will proceed and create the message document.
//                 else {
//                     Message.create(request.body, function(error, message) {
//                         if (error) {
//                             return response.sendStatus(500);
//                         }
//                         // if successfully created message, send CREATED status and path of message
//                         response.status(201).header('Location', '/messages/' + message._id).json({});
//                     });
//                 }
//             });
//         }
//     });
// });


/*----------------------------- RUN SERVER -----------------------------*/

var runServer = function(callback) {
    var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/quiz';
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
