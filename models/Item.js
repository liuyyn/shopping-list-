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
    default: Date.now,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema); // an instance of a model is called document
// models are responsible for creating and reading documents from the underlying MongoDB database
// when calling mongoose.model() on a schema, Mongoose compiles a model for you
// makes a copy of ItemSchema
