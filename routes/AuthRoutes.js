const AuthController = require("../controllers/AuthController.js");
const router = require("express").Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

module.exports = router;
