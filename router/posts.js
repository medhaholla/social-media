const Post = require("../models/Post");

const router = require("express").Router();

//create a post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    await newPost.save(newPost);
    res.status(200).send({
      status: "sucess",
      message: "post has been created",
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message,
    });
  }
});
//update a post

router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).send({
        status: "success",
        message: "article has been updated",
      });
    } else {
      res.status(401).send({
        status: "failure",
        message: "you are not authorized",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post

router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  try {
    if (post.userId == req.body.userId) {
      await post.deleteOne();
      res.status(200).send({
        status: "Sucessfull",
        message: "You sucessfully deleted the post",
      });
    } else {
      res.status(401).send({
        status: "failure",
        message: "you are not authorized",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// like a post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).send({
        status: "Sucessfull",
        message: "You liked the post",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).send({
        status: "Sucess",
        message: "Your post has been disliked",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.send(500).json(err);
  }
});

module.exports = router;
