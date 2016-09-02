var User = require('./models').User;

var createUser = function() {
	User.create({"username": "User1", "questionHistory": "[{"question":"57c5e26cf1cb90dc83bcbe90, "timeStamp": "5", "correct": "true"}, {"question":"57c5e26cf1cb90dc83bcbe90, "timeStamp": "7", "correct": "true"}, {"question":"57c5e26cf1cb90dc83bcbe90, "timeStamp": "9", "correct": "true"}]});
}

module.exports = createUser;