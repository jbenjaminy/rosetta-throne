const User = require('../models').User;

let createUser = (id) => {
	return new Promise((resolve, reject) => {
		User.create({
      		socketId: socket.id,
      		completedLessons: [],
      		currentLevel: 1,
      		currentLesson: 1
  		}, (err, user) => {
    		if (err) {
	      		console.error(err);
	      		reject(err);
	      	}
	      	resolve(user);
    	});
	});
};

module.exports = createUser;