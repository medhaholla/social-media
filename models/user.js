const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 3,
      require: true,
      unique: true,
      max: 20,
    },

    email: {
      type: String,
      require: true,
      unique: true,
      max: 50,
    },

    password: {
      type: String,
      min: 6,
      required: true,
    },

    profilePicture: {
      type: String,
      default: " ",
    },

    coverPicture: {
      type: String,
      default: " ",
    },

    followers: {
      type: Array,
      default: [],
    },

    following: {
      type: Array,
      default: [],
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
