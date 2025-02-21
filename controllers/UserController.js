const UserModel = require("../models/UserModel.js");
const { v4: uuid4 } = require("uuid");
const bcrypt = require("bcryptjs");
//======================================================================================

const getUsers = async (req, res) => {
  try {
    const results = await UserModel.getUsers();
    return res.status(200).json({
      message: "success",
      statusCode: 200,
      errors: [],
      data: results,
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

const createManyUsers = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const uuid = uuid4();
    const data = [];
    for (let index = 1; index < 101; index++) {
      const hashPassword = await bcrypt.hash(`password${index}`, salt);
      data.push([
        uuid4(),
        `username ${index}`,
        `username${index}@gmail.com`,
        hashPassword,
        "08729890902",
        `jl tes username ${index}`,
        "user",
      ]);
    }
    const bulkInserts = await UserModel.createManyUsers(data);
    console.log(bulkInserts);

    console.log("successfully inserts data");

    return res
      .status(201)
      .json({ message: "success", statusCode: 201, errors: [], data });
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
const createNewUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const uuid = uuid4();
    const data = {
      user_id: uuid,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      no_hp: req.body.no_hp,
      alamat: req.body.alamat,
      role: req.body.role || "user",
    };
    const insertUser = await UserModel.createUser(data);

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
    });
  }
};

module.exports = { createNewUser, createManyUsers, getUsers };
