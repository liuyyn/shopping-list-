// importing modules needed
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // allows us to take request and get data from the body

const items = require("./routes/api/items");

const app = express();

// bodyParser Middleware
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI; // gives us the value on mongoURI from file keys.js

// connect to MongoDB using mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/items", items); // every time we get a path /api/items, it will go to the items variable i.e. the file from ./routes/api/items

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
