const mongoose = require("mongoose");
// const Comment = require("Comment");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },

    desc: {
      type: String,
      max: 500,
    },

    img: {
      type: String,
    },

    likes: {
      type: Array,
      default: [],
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
