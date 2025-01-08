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
const getposts = async(req,res)=> {
    try {
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        console.error(error);
    }
}
const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params; 
        const { voteType } = req.body; 
        const userId = req.user._id; 

        if (!['voteA', 'voteB'].includes(voteType)) {
            return res.status(400).json({ error: "Invalid vote type. Use 'voteA' or 'voteB'." });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const oppositeVoteType = voteType === 'voteA' ? 'voteB' : 'voteA';


        const hasVotedCurrent = post.votes[voteType].includes(userId);
        const hasVotedOpposite = post.votes[oppositeVoteType].includes(userId);

        if (hasVotedCurrent) {
            
            post.votes[voteType] = post.votes[voteType].filter(voter => voter !== userId);
        } else {
         
            post.votes[voteType].push(userId);


            if (hasVotedOpposite) {
                post.votes[oppositeVoteType] = post.votes[oppositeVoteType].filter(voter => voter !== userId);
            }
        }

        await post.save();

        res.status(200).json({
            message: hasVotedCurrent
                ? `You unvoted ${voteType === 'voteA' ? 'imgA' : 'imgB'}`
                : `You voted for ${voteType === 'voteA' ? 'imgA' : 'imgB'}`,
            post,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = {createpost,getposts,likeUnlikePost};