// importing modules needed
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); // allows us to take request and get data from the body
const path = require("path"); // nodejs module so we don't have to do npm install path

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

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build")); // load index.html in client/build (compiled version of index.html)

  // any request that is not 'api/items' should load the index.html in client/build
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html")); // sending html file
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
