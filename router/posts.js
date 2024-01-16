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

module.exports = router;
