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

//login user
router.post("/login", async (req, res) => {
  try {
    const u = await user.findOne({ email: req.body.email });

    if (!u && res.status(400)) {
      res.send("user not found !!");
    }

    const validpassword = await bcrypt.compare(req.body.password, u.password);
    if (!validpassword && res.status(400)) {
      res.send("password is wrong");
    }

    res.status(200).json(u);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
