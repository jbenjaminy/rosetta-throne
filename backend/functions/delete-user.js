const User = require('../models').User;
const Question = require('../models').Question;

let deleteUser = (id) => {
	User.findOneAndRemove({ 
		socketId: id
	}, (err, user) => {
	    if (err) {
	     	console.error(err);
	    }
  	});
  	const promise = findQuestions(id);
  	promise.then((questions) => {
  		for (let question of questions) {
  			Question.findOneAndRemove({
  				_id: question._id
  			}, (err, question) => {
  				if (err) {
  					console.error(err);
  				}
  			});
  		}
  	});
};

let findQuestions = (id) => {
	return new Promise((resolve, reject) => {
		Question.find({
			socketId: id
		}, (err, questions) => {
			if (err) {
				reject(err);
			}
			resolve(questions);
		});
	});
};

module.exports = deleteUser;