const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        imgA: { type: String, required: true }, 
        imgB: { type: String, required: true }, 
    },
    votes: {
        voteA: { type: [String], default: [] },
        voteB: { type: [String], default: [] }, 
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model("Post", PostSchema);