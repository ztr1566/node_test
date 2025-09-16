let moment = require("moment");
const { getNames } = require("country-list");
const customUser = require("../models/mydataSchema");
const router = require("express").Router();

router.get("/", (req, res) => {
  const status = "index";
  customUser
    .find()
    .then((users) => {
      res.render("index.ejs", { users, moment, status, title: "Homepage" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/search", (req, res) => {
  const status = "search";
  customUser
    .find()
    .then((users) => {
      res.render("user/search.ejs", { users, moment, status, title: "Search" });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/user/add.html", (req, res) => {
  const countryNames = getNames();
  const status = "add";
  res.render("user/add.ejs", { countryNames, status, title: "Add User" });
});

router.get("/edit/:id", (req, res) => {
  const countryNames = getNames();
  const status = "edit";
  customUser
    .findById(req.params.id)
    .then((user) => {
      res.render("user/edit.ejs", {
        user,
        moment,
        countryNames,
        status,
        title: "Edit User",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/view/:id", (req, res) => {
  const status = "view";
  customUser
    .findById(req.params.id)
    .then((user) => {
      res.render("user/view.ejs", { user, moment, status, title: "View User" });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete Routes

router.delete("/edit/:id", (req, res) => {
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

router.put("/edit/:id", (req, res) => {
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

router.post("/user/add.html", (req, res) => {
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

router.post("/search", (req, res) => {
  const searchTerm = req.body.search.trim();
  const status = "search";

  const queryConditions = [
    { firstname: { $regex: searchTerm, $options: "i" } },
    { lastname: { $regex: searchTerm, $options: "i" } },
    { country: { $regex: searchTerm, $options: "i" } },
    { gender: { $regex: searchTerm, $options: "i" } },
  ];

  const searchNumber = parseInt(searchTerm, 10);
  if (!isNaN(searchNumber)) {
    queryConditions.push(
      { age: { $eq: searchNumber } },
      { phone: { $eq: searchNumber } }
    );
  }
  customUser
    .find({
      $or: queryConditions,
    })
    .then((users) => {
      res.render("user/search.ejs", { users, moment, status, title: "Search" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
