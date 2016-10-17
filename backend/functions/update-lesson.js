const User = require('../models').User;

let updateLesson = (id, level, lesson) => {
	return new Promise((resolve, reject) => {
		User.update({
			socketId: id
		}, {
			currentLevel: level,
			currentLesson: lesson
		}, (err, user) => {
	    	if (err) {
	      		reject(err);
	    	}
	    	resolve(user);
	  	});
	});
};

module.exports = updateLesson;