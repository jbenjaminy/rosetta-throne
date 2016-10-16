const User = require('../models').User;
const Question = require('../models').Question;

let deleteUser = (id) => {
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