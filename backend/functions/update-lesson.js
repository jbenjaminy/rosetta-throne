const User = require('../models').User;

let updateLesson = (id, level, lesson, completed) => {
	return new Promise((resolve, reject) => {
		if (completed) {
			User.findOneAndUpdate({
				socketId: id
			}, {
				currentLevel: level,
				currentLesson: lesson,
				completedLessons: completed
			}, { new: true }, (err, user) => {
		    	if (err) {
		      		reject(err);
		    	}
		    	resolve(user);
		  	});
		} else {
			User.findOneAndUpdate({
				socketId: id
			}, {
				currentLevel: level,
				currentLesson: lesson
			}, { new: true }, (err, user) => {
		    	if (err) {
		      		reject(err);
		    	}
		    	resolve(user);
		  	});
		}
	});
};

module.exports = updateLesson;