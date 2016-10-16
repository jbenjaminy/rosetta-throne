var mongoose = require('mongoose');

/*----------- USER SCHEMA -----------*/
var UserSchema = new mongoose.Schema({
	 socketId: {
		 type: String,
		 required: true
	 },
	 completedLessons: {
		 type: Array,
		 required: true
	 }
});

/*---------- QUESTION SCHEMA ----------*/
var QuestionSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	prompt: {
		type: String,
		required: true
	},
	correctAnswer: {
		type: String,
		required: true
	},
	m: {
		type: Number,
		required: true
	},
	level: {
		type: Number,
		required: true
	},
	levelTitle: {
		type: String,
		required: true
	},
	lesson: {
		type: Number,
		required: true
	},
	lessonTitle: {
		type: String,
		required: true
	}
});
var Question = mongoose.model('Question', QuestionSchema);

var User = mongoose.model('User', UserSchema);

exports.Question = Question;
exports.User = User;
