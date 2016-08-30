var mongoose = require('mongoose');

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

var QuestionSchema = new mongoose.Schema({
	prompt: {
		type: String,
		required: true,
		unique: true
	},
	correctAnswer: {
		type: String,
		required: true
	}
});
var Question = mongoose.model('Question', QuestionSchema)

exports.User = User;
exports.Question = Question;
