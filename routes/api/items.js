// where are the api routes will go
const express = require("express");
const router = express.Router();

// Item Model
const Item = require("../../models/Item");

// create routes
// @route   GET api/items (GET request to api/items)
// @desc    Get all Items
// @access  Public
router.get("/", (req, res) => {
  Item.find() // returns a Promise ; get all items in DB
    .sort({ date: -1 }) // sort by the date descending (so we put -1; if want ascending put 1)
    .then((items) => res.json(items));
});

// export router to be able to use it in other files
module.exports = router;
