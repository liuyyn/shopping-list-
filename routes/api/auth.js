// where are the api routes will go
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken"); // for crypt <--> decrypt passwords
const auth = require("../../middleware/auth");

// User Model
const User = require("../../models/User");
const { route } = require("./users");

// create routes
// @route   POST api/auth (for login)
// @desc    authenticate the user
// @access  Public
router.post("/", (req, res) => {
  // getting the data to POST from req.body
  const { email, password } = req.body;

  // simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" }); // sending back a response status of 400 along with a message in json
  }

  // check if existing user to log in
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    // validate (input) password (with password in db)
    bcrypt.compare(password, user.password).then((isMatch) => {
      // if password does not match, send error message
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      // otherwise (password match), sign the token
      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        // sign callback
        (err, token) => {
          if (err) throw err;
          // send response with a token and a user
          res.json({
            // add token the response so we can authenticate with private routes
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

// create routes
// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req, res) => {
  // find the user with provided id and send data back as res.data
  User.findById(req.user.id) // from auth middleware function
    .select("-password") // disregard the password
    .then((user) => res.json(user));
});

module.exports = router;
