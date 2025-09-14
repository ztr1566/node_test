const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.sendFile("/views/index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    "mongodb+srv://zizoo1566_db:5kvP6ZDwfYv050Dj@cluster0.k8vqb7s.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  ).then(() => console.log("Connected to MongoDB"));
}
