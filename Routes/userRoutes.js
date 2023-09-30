const router = require("express").Router();

const userController = require("../Controllers/userController");

router.route("/signup").post(userController.registerUser);
router.route("/login").post(userController.loginUser);

module.exports = router;
