// where are the api routes will go
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken"); // for crypt <--> decrypt passwords

// User Model
const User = require("../../models/User");

// create routes
// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post("/", (req, res) => {
  // getting the data to POST from req.body
  const { name, email, password } = req.body;

  // simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" }); // sending back a response status of 400 along with a message in json
  }

  // check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    // create the new user if no user with same email found in database
    const newUser = new User({
      name: name,
      email: email,
      password: password, // password not crypted yet
    });

    // create salt (used to create a hash) and hash(what we want to put in the database for the password)
    bcrypt.genSalt(10, (err, salt) => {
      // generate hash
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;

        // set user's password to hash
        newUser.password = hash;

        // save user to the db (returns a promise) --- mongoose will automatically add an id to the data we saved to db
        newUser.save().then((user) => {
          // sign the token; when sending token from react/postman/etc., the user.id is in there so that it knows which user it is otherwise, any token can access anything
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            // sign callback
            (err, token) => {
              if (err) throw err;
              // send data as js object with user object which has newly added user's info (id, name and email --- not returning the password)
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
  });
});

module.exports = router;
