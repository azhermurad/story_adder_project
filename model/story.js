const mongoose = require('mongoose');

const { Schema } = mongoose;

const storySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    allowedcomment: {
        type: Boolean,
        default: true
    },
    comments: [
        {
            commentbody: {
                type: String,
                required: true
            },
            userid: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'

            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true,
})

const Story = mongoose.model('Story', storySchema)

module.exports = Story;
