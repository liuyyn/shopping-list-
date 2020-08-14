// importing modules needed
const express = require("express");
const mongoose = require("mongoose");
const path = require("path"); // nodejs module so we don't have to do npm install path
const config = require("config");

const app = express();

// allows us to take request and get and parse data from the body (replaces body-parser)
app.use(express.json());

// DB config
const db = config.get("mongoURI"); // gives us the value on mongoURI from ./config/default.json file

// connect to MongoDB using mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// import routes files
const items = require("./routes/api/items"); // items variable points to the items.js file in routes/api
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
// Use Routes
app.use("/api/items", items); // every time server gets a request path /api/items, it will go to the items variable i.e. the file from ./routes/api/items
app.use("/api/users", users);
app.use("/api/auth", auth);

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
