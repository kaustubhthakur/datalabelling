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
        const { id: postId } = req.params; // Extract post ID from request params
        const { voteType } = req.body; // Expect "voteType" to be either "voteA" or "voteB"
        const userId = req.user._id; // Get user ID from the authenticated user

        if (!['voteA', 'voteB'].includes(voteType)) {
            return res.status(400).json({ error: "Invalid vote type. Use 'voteA' or 'voteB'." });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const oppositeVoteType = voteType === 'voteA' ? 'voteB' : 'voteA';

        // Check if the user has already voted for this or the opposite image
        const hasVotedCurrent = post.votes[voteType].includes(userId);
        const hasVotedOpposite = post.votes[oppositeVoteType].includes(userId);

        if (hasVotedCurrent) {
            // User unlikes the current vote type
            post.votes[voteType] = post.votes[voteType].filter(voter => voter !== userId);
        } else {
            // User votes for the current vote type
            post.votes[voteType].push(userId);

            // Remove the user from the opposite vote type if voted
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