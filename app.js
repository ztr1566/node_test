// Dependencies

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
let moment = require("moment");
let methodOverride = require("method-override");
const { getNames } = require("country-list");
// Express.js Configuration

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// Auto-reload

const path = require("path");
const livereload = require("livereload");
const LiveReloadServer = livereload.createServer();
const connectLivereload = require("connect-livereload");

LiveReloadServer.watch(path.join(__dirname, "public"));
app.use(connectLivereload());
LiveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    LiveReloadServer.refresh("/");
  }, 100);
});

// Get Routes

app.get("/", (req, res) => {
  customUser
    .find()
    .then((users) => {
      res.render("index.ejs", { users, moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/user/add.html", (req, res) => {
  const countryNames = getNames();
  res.render("user/add.ejs", { countryNames });
});

app.get("/edit/:id", (req, res) => {
  const countryNames = getNames();
  customUser
    .findById(req.params.id)
    .then((user) => {
      res.render("user/edit.ejs", { user, moment, countryNames });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/view/:id", (req, res) => {
  customUser
    .findById(req.params.id)
    .then((user) => {
      res.render("user/view.ejs", { user, moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete Routes

app.delete("/edit/:id", (req, res) => {
  customUser
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update Routes

app.put("/edit/:id", (req, res) => {
  customUser
    .updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Post Routes

app.post("/user/add.html", (req, res) => {
  customUser
    .create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Search Routes

app.post("/search", (req, res) => {
  customUser
    .find({
      $or: [
        { firstname: { $regex: req.body.search, $options: "i" } },
        { lastname: { $regex: req.body.search, $options: "i" } },
        { country: { $regex: req.body.search, $options: "i" } },
        { gender: { $regex: req.body.search, $options: "i" } },
        { age: { $eq: parseInt(req.body.search) } },
      ],
    })
    .then((users) => {
      res.render("user/search.ejs", { users, moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Server Connection

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// MongoDB Connection
const customUser = require("./models/mydataSchema");

main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect(
      "mongodb+srv://zizoo1566_db:5kvP6ZDwfYv050Dj@cluster0.k8vqb7s.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected to database"));
}
