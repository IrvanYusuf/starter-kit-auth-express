const UserController = require("../controllers/UserController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = require("express").Router();

router.get("/", authMiddleware, UserController.getUsers);
router.post("/", UserController.createNewUser);
router.post("/bulk", UserController.createManyUsers);

module.exports = router;
