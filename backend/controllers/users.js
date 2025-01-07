const User = require('../models/User')
const getUser = async(req,res)=> {
    try {
        const user = await User.findById(req.params.id);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
    }
}
module.exports = {getUser}