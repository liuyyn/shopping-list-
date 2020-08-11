const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create Schema (for shopping list item)
// a Schema maps to a MongoDB collection and defines the SHAPE of the documents within that collection
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: date.now,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
