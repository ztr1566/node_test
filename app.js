// Dependencies

const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Mydataa = require("./models/mydataSchema");

// Express.js Configuration

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));



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
  Mydataa.find()
    .then((data) => {
      res.render("home.ejs", { arr: data });
    })
    .catch((err) => console.log(err));
});

// Post Routes

app.post("/", (req, res) => {
  console.log(req.body);
  const mydataa = new Mydataa(req.body);
  mydataa
    .save()
    .then(() => res.redirect("/status.html"))
    .catch((err) => console.log(err));
});

// Server Connection

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// MongoDB Connection

main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect(
      "mongodb+srv://zizoo1566_db:5kvP6ZDwfYv050Dj@cluster0.k8vqb7s.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected to MongoDB"));
}
