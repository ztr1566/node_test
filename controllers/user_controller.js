let moment = require("moment");
const { getNames } = require("country-list");
const customUser = require("../models/mydataSchema");

const index = (req, res) => {
  const status = "index";
  customUser
    .find()
    .then((users) => {
      res.render("index", {
        users,
        moment,
        status,
        title: "Homepage",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const search = (req, res) => {
  const status = "search";
  customUser
    .find()
    .then((users) => {
      res.render("user/search.ejs", {
        users,
        moment,
        status,
        title: "Search",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const add = (req, res) => {
  const countryNames = getNames();
  const status = "add";
  res.render("user/add.ejs", {
    countryNames,
    status,
    title: "Add User",
  });
};

const edit = (req, res) => {
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
};

const view = (req, res) => {
  const status = "view";
  customUser
    .findById(req.params.id)
    .then((user) => {
      res.render("user/view.ejs", { user, moment, status, title: "View User" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteItem = (req, res) => {
  customUser
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateItem = (req, res) => {
  customUser
    .updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postAdd = (req, res) => {
  customUser
    .create(req.body)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postSearch = (req, res) => {
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
};

module.exports = {
  index,
  search,
  add,
  edit,
  view,
  deleteItem,
  updateItem,
  postAdd,
  postSearch,
};
