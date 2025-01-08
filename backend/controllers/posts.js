const Post = require('../models/Post')
const createpost = async(req,res)=> {
    try {
        const newpost = Post(req.body);
        const savepost = await newpost.save();
        res.status(201).json(savepost);
    } catch (error) {
        console.error(error);
    }
}
module.exports = {createpost};