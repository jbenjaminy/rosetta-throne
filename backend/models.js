var mongoose = require('mongoose');

/*---------- QUESTION SCHEMA ----------*/
var QuestionSchema = new mongoose.Schema({
	prompt: {
		type: String,
		required: true,
		unique: true
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


/*----------- USER SCHEMA -----------*/
var UserSchema = new mongoose.Schema({
  //  token: {
  //      type: String,
  //      required: true,
  //      unique: true
  //  },
	 username: {
		 type: String,
		 required: true,
		 unique: true
	 },
	 questionHistory: {
		 type: Array,
		 required: true
	 }
});
var User = mongoose.model('User', UserSchema);

exports.Question = Question;
exports.User = User;
