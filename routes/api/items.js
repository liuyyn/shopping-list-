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
  // when at /api/items, get all data from DB and display it as json
  Item.find() // returns a Promise ; get all items in DB
    .sort({ date: -1 }) // sort by the date descending (so we put -1; if want ascending put 1)
    .then((items) => res.json(items));
});

// @route   POST api/items ; POST request
// @desc    Create Aan Item
// @access  Public
router.post("/", (req, res) => {
  // want to add an Item to the database
  const newItem = new Item({
    // an instance of the model is called a Document
    name: req.body.name, // date will be automatically inserted
  });

  // save newItem to the database MongoDB (promise based)
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err)); // display item saved in json on webpage
});

// @route   DELETE api/items/:id
// @desc    Delete An Item
// @access  Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ sucess: true })))
    .catch((err) => res.status(404).json({ sucess: false })); // sending a 404 response for failure of finding id
});

// export router to be able to use it in other files
module.exports = router;

//mvc architecture : model view controller
// controller: backend
// view: frontend
