var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
   token: {
       type: String,
       required: true,
       unique: true
   },
	 questionHistory:[]
});
var User = mongoose.model('User', UserSchema);

var QuestionSchema = new mongoose.Schema({
	prompt: {
		type: String,
		required: true
	},
	correctAnswer: {
		type: String,
		required: true
	}
});
var Question = mongoose.model('Question', QuestionSchema)

exports.User = User;
exports.Question = Question;





// Build schema here

// USER SCHEMA:
	// GOOGLE DISPLAY NAME
	// STATISTICS (AVERAGE % CORRECT, ETC)
	// VALUE TO SET WHAT POINT THEY'RE AT IN THE TRAINING

// QUESTIONS SCHEMA:
	// REF TO USER
	// PROMPT
	// CORRECT ANSWER
	// LAST TIME THEY WERE REVIEWED
	// VALUE TO RANK USER'S PROFICIENCY ON PARTICULAR QUESTION (E.G., 1-4 (1=review multiple times daily; 2=once daily, 3=every other, 4=once weekly) -- USE TIME IN SECONDS (UNIX TIME), OTHERWISE IT IS RELATIVE, FROM MOMENT THE QUESTION IS ANSWERED TO THE MOMENT IT WILL BE ASKED AGAIN)
	// NEED TO REVIEWED (Boolean)
	// % correct from last 5 times this question was answered

// QUESTION HISTORY:
	// REF TO QUESTIONS & USERS
	// STORES EACH SESSION, THE QUESTIONS THAT WERE ANSWERED AND WHETHER OR NOT THEY WERE ANSWERED CORRECTLY.
	// AFFECTS RANKING ON FREQUENCY OF REVIEWED
	// CALCULATE STATS FOR USER STATS
