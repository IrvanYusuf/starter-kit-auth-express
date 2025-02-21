const UserRoutes = require("./UserRoutes.js");
const AuthRoutes = require("./AuthRoutes.js");
const router = require("express").Router();

router.use("/users", UserRoutes);
router.use("/auths", AuthRoutes);

module.exports = router;
