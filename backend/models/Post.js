const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },

    images: {
        img1: { type: String, required: true }, // URL or path for the first image
        img2: { type: String, required: true }, // URL or path for the second image
    },
    votes: {
        voteA: { type: [String], default: [] }, // Count for vote1
        voteB: { type: [String], default: [] }, // Count for vote2
    },
    userId: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model("Post", PostSchema);