const router = require("express").Router();
const userController = require("../controllers/user_controller");

// Get Routes

router.get("", userController.add);

// Post Routes

router.post("", userController.postAdd);

module.exports = router;
