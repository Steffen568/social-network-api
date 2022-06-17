const { Schema, model } = require('mongoose');

// User Model
const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
        validatate: {
            validator: validator.isEmail,
            message: `{VALUE} is not a valid eamil`,
            isAsync: false
        }
    },
    thoughts: [],
    friends: []
})


// create User model using userSchema
const User = model('User', UserSchema)

// create virtual to get total count of comments and replies 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total, friends) => total + friends.length +1, 0)
})

// export User model
module.exports = User;