const router = require("express").Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
//Register user

router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new user({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    // save new user
    const u = await newUser.save();
    res.status(200).send(u);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
