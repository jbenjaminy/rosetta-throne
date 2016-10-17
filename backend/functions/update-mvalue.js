const Question = require('../models').Question;

let updateMvalue = (mValue, id) => {
	return new Promise((resolve, reject) => {
		Question.update({
			_id: id
		}, {
			m: mValue
		}, (err, question) => {
	    	if (err) {
	      		reject(err);
	    	}
	    	resolve(question);
	  	});
	});
};

module.exports = updateMvalue;