const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Mydataa = require("./models/mydataSchema");
const path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

app.get("/", (req, res) => {
  res.sendFile("home.html", { root: path.join(__dirname, "views") });
});

// app.get("/status.html", (req, res) => {
//     res.sendFile("status.html", { root: path.join(__dirname, "views") });
//   });

app.post("/", (req, res) => {
  console.log(req.body);
  const mydataa = new Mydataa(req.body);
  mydataa
    .save()
    .then(() => res.redirect("/status.html"))
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

main().catch((err) => console.log(err));
async function main() {
  await mongoose
    .connect(
      "mongodb+srv://zizoo1566_db:5kvP6ZDwfYv050Dj@cluster0.k8vqb7s.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected to MongoDB"));
}
