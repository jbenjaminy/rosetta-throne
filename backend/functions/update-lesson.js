const User = require('../models').User;

let updateLesson = (id, level, lesson, completed) => {
	return new Promise((resolve, reject) => {
		User.findOneAndUpdate({
			socketId: id
		}, {
			currentLevel: level,
			currentLesson: lesson,
			completedLessons: completed
		}, { new: true }, (err, user) => {
			console.log(user);
	    	if (err) {
	      		reject(err);
	    	}
	    	resolve(user);
	  	});
	});
};

module.exports = updateLesson;