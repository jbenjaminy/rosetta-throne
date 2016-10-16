const Question = require('../models').Question;

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

module.exports = findQuestions;