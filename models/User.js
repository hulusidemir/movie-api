const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema(
    {
        user_name: {
            type:String,
            required: true
        },
        password: {
            type: String,
            required: true,
            minlength: 5
        }
    }
)

module.exports = mongoose.model('user', UserSchema);