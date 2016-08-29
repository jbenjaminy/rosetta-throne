// EXAMPLES:

// /*----------------------------- DEPENDENCIES -----------------------------*/

// var express = require('express');
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var User = require('./models/user');
// var Message = require('./models/message');
// var bcrypt = require('bcrypt');
// var passport = require('passport');
// var BasicStrategy = require('passport-http').BasicStrategy;

// var app = express();
// var jsonParser = bodyParser.json();



// /*------------------------- AUTHENTICATION STRATEGY -------------------------*/

// // uses HTTP basic authentication for user credentials, protecting endpoint
// var strategy = new BasicStrategy(function(username, password, callback) {
//     // looks up user in database and returns user document
//     User.findOne({
//         username: username
//     }, function (error, user) {
//         if (error) {
//             return callback(error);
//         }
//         // for non-existent usernames
//         if (!user) {
//             return callback(null, false, {
//                 message: 'Incorrect username/password.'
//             });
//         }
//         // validates password for returned user document
//         user.validatePassword(password, function(error, isValid) {
//             if (error) {
//                 return callback(error);
//             }
//             // for incorrect passwords
//             if (!isValid) {
//                 return callback(null, false, {
//                     message: 'Incorrect username/password.'
//                 });
//             }
//             return callback(null, user);
//         });
//     });
// });
// // calls authentication strategy
// passport.use(strategy);
// // tells app to integrate with passport
// app.use(passport.initialize());
// // use jsonParser middleware on ALL routes
// app.use(jsonParser);
// // Or use this as parameter for API requests
// // [jsonParser, passport.authenticate('basic', {session: false})]



// /*------------------------- AUTHENTICATION ENDPOINT -------------------------*/

// /*----- Authentication GET request -----*/
// app.get('/hidden', passport.authenticate('basic', {session: false}), function(request, response) {
//     response.json({
//         message: 'Authentication Successful'
//     });
// });
// // This endpoint is protected by authentication strategy, granting access if supplied username and password are valid. Uses passport.authenticate middleware, saying that you will use the basic strategy. Also indicates that you don't want to star a session cookie -- they'll need to reauthenticate with each new API request.



// /*----------------------------- USER ENDPOINTS -----------------------------*/
// // TODO - NEED TO CHANGE OUTPUTS ON THESE GET REQUESTS TO TAKE OUT PASSWORD, OR ALLOW THEM TO DO A GET REQUEST ON THEMSELVES AND GET EVERYTHING, BUT NOT ON OTHERS.

// /*----- GET request for array of users -----*/
// app.get('/users', passport.authenticate('basic', {session: false}), function(req, res) {
//         var returnUsersArr = [];

//     User.find(function(error, users) {
//         if (error) {
//             //internal server error
//             return res.sendStatus(500);
//         }
//         for (var i = 0; i < users.length; i++) {
//             var returnUserObj = {
//                 _id: users[i]._id,
//                 username: users[i].username
//             };
//             returnUsersArr.push(returnUserObj);
//         }
//         //if no error, response will return the users array in json
//         res.json(returnUsersArr);
//     });
// });


// /*----- GET request for specific user -----*/
// app.get('/users/:userID', passport.authenticate('basic', {session: false}), function(request, response) {
//         User.find({
//             _id: request.params.userID
//         }, function(error, user) {
//             // check if user[0] in returned array is falsey 
//             if (!user[0]) {
//                 // return 404 error message if specified user does not exist
//                 return response.status(404).json({
//                     message: "User not found"
//                 });
//             }
//             var returnUser = {
//                 _id: user[0]._id,
//                 username: user[0].username
//             }; 

//             // returns OK status and user that was queried in response
//             response.json(returnUser);
//         });
// });


// /*----- POST request for a user -----*/
// app.post('/users', jsonParser, function(request, response) {
//     // Checks that there is a request body
//     if (!request.body || request.body === []) {
//         return response.status(400).json({
//             message: 'No request body'
//         });
//     }
//     addNewUser(request, response);
// });

// /*----- PUT request to edit a username or add user if ID is open -----*/
// app.put('/users/:userID', passport.authenticate('basic', {session: false}), function(request, response) {
//     // Checks that there is a request body
//     if (!request.body || request.body === []) {
//         return response.status(400).json({
//             message: 'No request body'
//         });
//     }

//     User.find({_id: request.params.userID}, function(error, user) {
//         if (error) {
//             return response.sendStatus(500);
//         }
//         // if no user document at userID, calls addNewUser() and creates one
//         if (!user) {
//             addNewUser(request, response);
//         } 
//         // if there is a user document at userID, authenticates that the user is authorized to make changes and edits user document if so
//         else {
//             // After authentication, checks that the requesting user's ID matches the supplied userID
//             if (request.params.userID !== request.user._id.toString()) {
//                 return response.status(401).json({
//                      message: 'Unauthorized'
//                 });
//             }
            
//             // variables
//             var updatedUser = {
//                                 _id: request.params.userID,
//                                 username: user.username,
//                                 password: user.password
//                             };
//             var username = request.body.username;
//             var password = request.body.password;
            
//             // checks if they provided a username to update
//             if ('username' in request.body) {
//                 // checks if supplied username is valid
//                 if (typeof username !== 'string') {
//                     return response.status(422).json({
//                         message: 'Incorrect field type: username'
//                     });
//                 }
//                 username = username.trim();
//                 if (username === '') {
//                     return response.status(422).json({
//                         message: 'Incorrect field length: username'
//                     });
//                 }
//                 // update username
//                 updatedUser.username = username;
//             }
            
//             // checks if they provided a password to update
//             if ('password' in request.body) {
//             // checks if supplied password is valid
//                 if (typeof password !== 'string') {
//                     return response.status(422).json({
//                         message: 'Incorrect field type: password'
//                     });
//                 }
                
//                 password = password.trim();

//                 if (password === '') {
//                     return response.status(422).json({
//                         message: 'Incorrect field length: password'
//                     });
//                 }
//                 // create new hash password if supplied password is valid
//                 bcrypt.genSalt(10, function(error, salt) {
//                     if (error) {
//                         return response.status(500).json({
//                             message: 'Internal server error'
//                         });
//                     }

//                     bcrypt.hash(password, salt, function(error, hash) {
//                         if (error) {
//                             return response.status(500).json({
//                                 message: 'Internal server error'
//                             });
//                         }
                        
//                     });    
//                 });
//                 updatedUser.password = password;
//             }
//             // update user document
//             User.update(user, updatedUser, function(error) {
//                if (error) {
//                    return response.status(500).json({
//                        message: 'Internal server error'
//                    });
//                } 
//                response.json({});
//             });
//         }
//     });
// });



// /*----- DELETE request to remove user by user ID -----*/
// app.delete('/users/:userID', passport.authenticate('basic', {session: false}), function(request, response) {
//     // After authentication, checks that the requesting user's id matches the supplied userID
//       if (request.params.userID !== request.user._id.toString()) {
//         return response.status(401).json({
//              message: 'Unauthorized'
//         });
//     }
    
//     // find user document by user ID and remove document
//     User.findByIdAndRemove({_id: request.params.userID}, function(error, user) {
//         // if user doc does not exist, return 404 error
//         if (!user) {
//             return response.status(404).json({
//                 message: 'User not found'
//             });
//         }
//         // if user successfully removed, return status OK with empty object
//         response.json({});
//     });
// });



// /*--------------------------- MESSAGE ENDPOINTS ----------------------------*/

// /*----- GET request for messages array -----*/
// app.get('/messages', passport.authenticate('basic', {session: false}), function(request, response) {
//         if ((request.body.to !== request.user._id.toString()) && (request.body.from !== request.user._id.toString())) {
//             return response.status(401).json({
//                 message: 'Unauthorized'
//             });
//         } else {
//         // depending on specified fields in request.query, will return array of messages matching the fields from request. Request.query will contain the values in query string in an object. May include no values, or 'to', 'from', or both. These fields have only the userId, we use populate to access the information stored only in the user document.
//         Message.find(request.query).populate('from to').exec(function(error, messages) {
//             for (var i = 0; i < messages.length; i++) {
//                 var returnMessagesArr = [];
//                 var returnMessageObj = {
//                 _id: messages[i].id,
//                     from: {
//                             _id: messages[i].from._id,
//                             username: messages[i].from.username
//                     },
//                     to: {
//                             _id: messages[i].to._id,
//                             username: messages[i].to.username
//                     },
//                     text: messages[i].text
//                 }
                
//                 returnMessagesArr.push(returnMessageObj);
//             }
//             if (error) {
//                 return response.sendStatus(500);
//             }
//             response.json(returnMessagesArr);
//         });
//     }
// });



// /*----- GET request for a single message ------*/
// app.get('/messages/:messageId', passport.authenticate('basic', {session: false}), function(request, response) {
//     Message.findOne({_id: request.params.messageId}).populate('to from').exec(function(error, message) {
//         var returnMessage = {
//             _id: message.id,
//             from: {
//                     _id: message.from._id,
//                     username: message.from.username
//             },
//             to: {
//                     _id: message.to._id,
//                     username: message.to.username
//             },
//             text: message.text
//         }
//         // checks that the user requesting user's id matches either the 'to' field or the 'from' field
//         if (message.to._id.toString() !== request.user._id.toString() && message.from._id.toString() !== request.user._id.toString()) {
//             return response.status(401).json({
//                 message: 'Unauthorized'
//             });
//         }
//         if (!message) {
//             return response.status(404).json({message: 'Message not found'});
//         }
//         // return message that was fetched
//         response.json(returnMessage);
//     });
// });


// /*----- POST request for messages -----*/
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



// /*------------------------- ADD NEW USER FUNCTION -----------------------*/

// function addNewUser(request, response) {
//     // sets username variable
//     var username = request.body.username;
//     // sets password variable
//     var password = request.body.password;
//     // if username string is empty or undefined, return 422 error
//     if (!('username' in request.body)) {
//         return response.status(422).json({
//             message: 'Missing field: username'
//         });
//     }
//     // if username is not a string then return incorrect type error
//     if (typeof username !== 'string') {
//         return response.status(422).json({
//             message: 'Incorrect field type: username'
//         });
//     }
//     // removes whitespace from either side of username string
//     username = username.trim();
//     // checks that username is not an empty string
//     if (username === '') {
//         return response.status(422).json({
//             message: 'Incorrect field length: username'
//         });
//     }
//     // checks that the password is a string
//     if (typeof password !== 'string') {
//         return response.status(422).json({
//             message: 'Incorrect field type: password'
//         });
//     }
//     // removes whitespace from either side of the password string
//     password = password.trim();
//     // checks that password is not an empty string
//     if (password === '') {
//         return response.status(422).json({
//             message: 'Incorrect field length: password'
//         });
//     }
//     // generates salt for hash (the '10' indicates how many rounds of the salting algorithm should be used -- the higher the number, the more computationally difficult it is to compare two passwords. 10-12 provides a nice balance between taking long enough so brute-force cracking is difficult, and being quick enough that your app is responsive to your users). 
//     bcrypt.genSalt(10, function(error, salt) {
//         if (error) {
//             return response.status(500).json({
//                 message: 'Internal server error'
//             });
//         }
//         // generates a salted SHA-1 hash
//         bcrypt.hash(password, salt, function(error, hash) {
//             if (error) {
//                 return response.status(500).json({
//                     message: 'Internal server error'
//                 });
//             }
//             // creates new user from the constructor
//             var user = new User({
//                 username: username,
//                 password: hash
//             });
//             // saves new user to database
//             user.save(function(error) {
//                if (error) {
//                    return response.status(500).json({
//                        message: 'Internal server error'
//                    });
//                } 
//                response.status(201).header('Location', '/users/' + user._id).json({});
//             });
//         });
//     });
// }



/*----------------------------- RUN SERVER -----------------------------*/

// var runServer = function(callback) {
//     var databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/sup';
//     mongoose.connect(databaseUri).then(function() {
//         var port = process.env.PORT || 8080;
//         var server = app.listen(port, function() {
//             console.log('Listening on port ' + port);
//             if (callback) {
//                 callback(server);
//             }
//         });
//     });
// };

// if (require.main === module) {
//     runServer();
// }


/*------------------------------- EXPORTS -------------------------------*/
// exports.app = app;
// exports.runServer = runServer;
