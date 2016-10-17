const User = require('../models').User;

let updateCompleted = (id, level, lesson, funct, completed) => {
	return new Promise((resolve, reject) => {
		if (funct === 'add') {
			completed.push({ level: level, lesson: lesson });
			User.update({
				socketId: id
			}, {
				completedLessons: completed
			}, (err, user) => {
		    	if (err) {
		      		reject(err);
		    	}
		    	resolve(user);
		  	});
		} else if (funct === 'remove') {
			for (let i = 0; i < completed.length; i++) {
				if ((completed[i].level === level) && (completed[i].lesson === lesson)) {
					completed.splice(i, 1);
				}
			}
			User.update({
				socketId: id
			}, {
				completedLessons: completed
			}, (err, user) => {
		    	if (err) {
		      		reject(err);
		    	}
		    	resolve(user);
		  	});
		}
	});
};

module.exports = updateCompleted;