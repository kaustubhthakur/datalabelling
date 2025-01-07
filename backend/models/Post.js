const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    imageA: {

    },
    imageB: {

    },
    vote: {
        type: [String],
        default: [],
    }, 
    userId: {
        type: String,
        required: true,
    }
},{
    timestamps:true,
})
module.exports = mongoose.model("Post",PostSchema);