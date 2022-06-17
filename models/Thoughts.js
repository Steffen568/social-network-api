const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    writenBy: {
        type: String,
        required: true
    },
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    reactions: [reactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
  }
)

const ReactionSchema = new Schema(
    {
        userName: {
            type: String,
            required: true
        },
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)

const Thoughts = model('Thoughts', ThoughtSchema);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

module.exports = Thoughts