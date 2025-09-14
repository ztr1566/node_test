const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const Mydataa = require("./models/mydataSchema");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

app.get("/", (req, res) => {
  Mydataa.find()
    .then((data) => {
      res.render("home.ejs", { arr: data });
    })
    .catch((err) => console.log(err));
});

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
