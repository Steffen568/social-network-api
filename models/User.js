const { Schema, model, trusted } = require('mongoose');

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
        match: [/.+\@.+\..+/]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thoughts"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);


// create User model using userSchema
const User = model('User', UserSchema)

// create virtual to get total count of comments and replies 
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

// export User model
module.exports = User;