const { getNames } = require("country-list");
const customUser = require("../models/mydataSchema");
const router = require("express").Router();

// Get Routes

router.get("", (req, res) => {
  const countryNames = getNames();
  const status = "add";
  res.render("user/add.ejs", { countryNames, status, title: "Add User" });
});

// Post Routes

router.post("", (req, res) => {
  customUser
    .create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
