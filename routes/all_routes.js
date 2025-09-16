const router = require("express").Router();
const userController = require("../controllers/user_controller");

// Get Routes
router.get("/", userController.index);
router.get("/search", userController.search);
router.get("/user/add.html", userController.add);
router.get("/edit/:id", userController.edit);
router.get("/view/:id", userController.view);

// Delete Routes
router.delete("/edit/:id", userController.deleteItem);

// Update Routes
router.put("/edit/:id", userController.updateItem);

// Post Routes
router.post("/user/add.html", userController.postAdd);

// Search Routes
router.post("/search", userController.postSearch);

module.exports = router;
