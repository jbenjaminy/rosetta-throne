const Question = require('../models').Question;

let resetMs = (id, level, lesson) => {
	return new Promise((resolve, reject) => {
		const promise = findQs(id);
		promise.then((questions) => { 
			for (let question of questions) {
				if (parseInt(question.level) === level && parseInt(question.lesson) === lesson) {
					Question.findOneAndUpdate({
						_id: id
					}, {
						m: 1
					}, { new: true }, (err, question) => {
				    	if (err) {
				      		reject(err);
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