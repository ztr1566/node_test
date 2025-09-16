const router = require("express").Router();
const userController = require("../controllers/user_controller");

// Get Routes

router.get("", userController.user_get_add);

// Post Routes

router.post("", userController.user_post_add);

module.exports = router;
