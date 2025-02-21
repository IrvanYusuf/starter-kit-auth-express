const jwt = require("jsonwebtoken");
const config = require("../config");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, config.JWT_KEY, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ status: 403, message: "Forbidden: Invalid token", data: {} }); // Token tidak valid
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: "Auth failed!",
      data: {},
    });
  }
};

module.exports = authMiddleware;
