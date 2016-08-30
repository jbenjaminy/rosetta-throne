/*---------------------------DEPENDENCIES -----------------------------*/

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models').User;
var Question = require('./models').Question;
var History = require('./models').History;

var app = express();
var jsonParser = bodyParser.json();


/*----- GET request for specific user -----*/
app.get('/users/:userID', function(request, response) {
  User.find({
      _id: request.params.userID
  }, function(error, user) {
      // check if user[0] in returned array is falsey
      if (!user[0]) {
          // return 404 error message if specified user does not exist
          return response.status(404).json({
              message: "User not found"
          });
      }
      var returnUser = {
          _id: user[0]._id,
          username: user[0].username
      };
      // returns OK status and user that was queried in response
      response.json(returnUser);
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
     response.status(201).header('Location', '/users/' + user._id).json({});
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
app.get('/questions/:user', function(request, response) {
  var username = request.params.user;
  var query = {
    username: username
  }
  User.findOne(query, function(err, user) {
    if (!user || err) {
      console.error("User does not exist", username);
      return;
    }
    id = user._id;
    }
  })

  Message.find(request.query).populate('from to').exec(function(error, messages) {
      for (var i = 0; i < messages.length; i++) {
          var returnMessagesArr = [];
          var returnMessageObj = {
          _id: messages[i].id,
              from: {
                      _id: messages[i].from._id,
                      username: messages[i].from.username
              },
              to: {
                      _id: messages[i].to._id,
                      username: messages[i].to.username
              },
              text: messages[i].text
          }

          returnMessagesArr.push(returnMessageObj);
      }
      if (error) {
          return response.sendStatus(500);
      }
      response.json(returnMessagesArr);
    });
  }
});



/*----- GET request for a single question ------*/
app.get('/messages/:messageId', passport.authenticate('basic', {session: false}), function(request, response) {
  Message.findOne({_id: request.params.messageId}).populate('to from').exec(function(error, message) {
    var returnMessage = {
        _id: message.id,
        from: {
                _id: message.from._id,
                username: message.from.username
        },
        to: {
                _id: message.to._id,
                username: message.to.username
        },
        text: message.text
    }
    // checks that the user requesting user's id matches either the 'to' field or the 'from' field
    if (message.to._id.toString() !== request.user._id.toString() && message.from._id.toString() !== request.user._id.toString()) {
      return response.status(401).json({
          message: 'Unauthorized'
      });
    }
    if (!message) {
        return response.status(404).json({message: 'Message not found'});
    }
    // return message that was fetched
    response.json(returnMessage);
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
        // var port = process.env.PORT || 8081;
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
