const UserModel = require("../models/UserModel.js");
const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config.js");
//======================================================================================

const register = async (req, res) => {
  try {
    const checkExistingUser = await UserModel.getUserByEmail(req.body.email);
    if (checkExistingUser.length > 0) {
      return res.status(409).json({
        message: "email already exists",
        statusCode: 409,
        errors: [
          {
            field: "email",
            message: "Email already exists",
          },
        ],
        data: [],
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const uuid = uuid4();
    const data = {
      user_id: uuid,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      no_hp: req.body.no_hp || null,
      alamat: req.body.alamat || null,
      role: req.body.role || "user",
    };
    const insertUser = await UserModel.createUser(data);

    const tokenPayload = {
      user_id: data.user_id,
      username: data.username,
      email: data.email,
      role: data.role,
    };
    const token = jwt.sign(tokenPayload, config.JWT_KEY, { expiresIn: "2d" });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: config.NODE_ENV === "production",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "success",
      statusCode: 201,
      errors: [],
      data: insertUser,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({
      message: "failed",
      statusCode: 500,
      errors: [{ server: "Internal server error" }],
      data: [],
      token,
    });
  }
};
const login = async (req, res) => {
  try {
    const checkExistingUser = await UserModel.getUserByEmail(req.body.email);
    if (checkExistingUser.length === 0) {
      return res.status(404).json({
        message: "user not found",
        statusCode: 404,
        errors: [
          {
            field: "email",
            message: "User not found",
          },
        ],
        data: [],
      });
    }

    const chekPassword = await bcrypt.compare(
      req.body.password,
      checkExistingUser[0].password
    );

    if (!chekPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
        statusCode: 401,
        errors: [
          {
            field: "password",
            message: "The password provided is incorrect",
          },
        ],
        data: [],
      });
    }

    const tokenPayload = {
      user_id: checkExistingUser[0].user_id,
      username: checkExistingUser[0].username,
      email: checkExistingUser[0].email,
      role: checkExistingUser[0].role,
    };

    const { password, ...othersData } = checkExistingUser[0];
    const token = jwt.sign(tokenPayload, config.JWT_KEY, { expiresIn: "2d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "success",
      statusCode: 201,
      errors: [],
      data: [othersData],
      token,
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(500).json({
      message: "failed",
      statusCode: 500,
      errors: [{ server: "Internal server error" }],
      data: [],
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "Strict",
    });
    return res.status(200).json({
      message: "success",
      statusCode: 200,
      errors: [],
      data: [],
    });
  } catch (error) {
    console.log("error: ", error);

    res.status(500).json({
      message: "failed",
      statusCode: 500,
      errors: [{ server: "Internal server error" }],
      data: [],
    });
  }
};

module.exports = { register, login, logout };
