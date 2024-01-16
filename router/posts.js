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

//delete a post

module.exports = router;
