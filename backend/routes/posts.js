const express = require('express')
const router =express.Router();
const {createpost,getposts,likeUnlikePost} = require('../controllers/posts')
const protectRoute = require('../utils/protectRoute')
router.post('/',protectRoute,createpost)
router.put('/:id/vote',protectRoute,likeUnlikePost)
router.get('/',getposts)
module.exports = router;