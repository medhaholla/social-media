const router = require("express").Router();
const Comment = require("../models/Comment");

const Post = require("../models/Post");

//add comment
router.post("/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await Comment.create({ ...req.body, post: postId });
    post.comments.push(comment._id);
    await post.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
