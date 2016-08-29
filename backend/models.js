// Build schema here

// USER SCHEMA:
	// GOOGLE DISPLAY NAME
	// STATISTICS (AVERAGE % CORRECT, ETC)
	// VALUE TO SET WHAT POINT THEY'RE AT IN THE TRAINING

// QUESTIONS SCHEMA:
	// REF TO USER
	// PROMPT
	// CORRECT ANSWER
	// LAST TIME THEY WERE REVIEW
	// VALUE TO RANK USER'S PROFICIENCY ON PARTICULAR QUESTION (E.G., 1-4 (1=review multiple times daily; 2=once daily, 3=every other, 4=once weekly) -- USE TIME IN SECONDS (UNIX TIME), OTHERWISE IT IS RELATIVE, FROM MOMENT THE QUESTION IS ANSWERED TO THE MOMENT IT WILL BE ASKED AGAIN)
	// NEED TO REVIEW (Boolean)

// QUESTION HISTORY:
	// REF TO QUESTIONS & USERS
	// STORES EACH SESSION, THE QUESTIONS THAT WERE ANSWERED AND WHETHER OR NOT THEY WERE ANSWERED CORRECTLY.
	// AFFECTS RANKING ON FREQUENCY OF REVIEW
	// CALCULATE STATS FOR USER STATS

// EXAMPLES:
/*---------- DEPENDENCIES ---------*/
// var mongoose = require('mongoose');
// var bcrypt = require('bcrypt');

/*---------- UserSchema -----------*/
// var UserSchema = new mongoose.Schema({
//    username: {
//        type: String,
//        required: true,
//        unique: true
//    },
//    password: {
//        type: String,
//        required: true
//    }
// });

// UserSchema.methods.validatePassword = function(password, callback) {
//     bcrypt.compare(password, this.password, function(error, isValid) {
//         if (error) {
//             callback(error);
//             return;
//         }
//         callback(null, isValid);
//     });
// };

// var mongoose = require('mongoose');

/*--------- Message Schema ----------*/
// var MessageSchema = new mongoose.Schema({
//     from: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     to: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     text: {
//         type: String,
//         required: true
//     }
// });

// var User = mongoose.model('User', UserSchema);
// var Message = mongoose.model('Message', MessageSchema);

// exports.User = User;
// exports.Message = Message;
