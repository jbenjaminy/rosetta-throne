const User = require('../models').User;

let createUser = (id) => {
	return new Promise((resolve, reject) => {
		User.create({
      		socketId: socket.id,
      		completedLessons: []
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