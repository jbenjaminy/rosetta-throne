// Build schema here

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
