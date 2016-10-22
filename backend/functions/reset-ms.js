const Question = require('../models').Question;

let resetMs = (id, level, lesson) => {
	return new Promise((resolve, reject) => {
		const promise = findQs(id);
		promise.then((questions) => { 
			for (let question of questions) {
				if (question.level === parseInt(level) && question.lesson === parseInt(lesson)) {
					Question.findOneAndUpdate({
						_id: question.id
					}, {
						m: 1
					}, { new: true }, (err, question) => {
				    	if (err) {
				    		console.error(err);
				    	}
				  	});
				}
			}
			resolve();
		});
	});
};

let findQs = (id) => {
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
}
module.exports = resetMs;