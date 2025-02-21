const sql = require("../config/db_config.js");

const getUsers = async () => {
  try {
    const query = `SELECT user_id,username,email,no_hp,alamat,role,created_at FROM tbl_users`;
    const [row] = await sql.execute(query, []);
    return row;
  } catch (error) {
    throw error;
  }
};

const createManyUsers = async (payload) => {
  try {
    const query =
      "INSERT INTO tbl_users (user_id,username,email,password,no_hp,alamat,role) VALUES ?";
    const [row] = await sql.query(query, [payload]);
    console.log(row);

    return row;
  } catch (error) {
    throw error;
  }
};

const createUser = async (payload) => {
  try {
    const query = `INSERT INTO tbl_users (user_id, username, email, password, no_hp, alamat, role) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const params = [
      payload.user_id,
      payload.username,
      payload.email,
      payload.password,
      payload.no_hp,
      payload.alamat,
      payload.role,
    ];
    const [row] = await sql.execute(query, params);
    return row;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const query = `SELECT * FROM tbl_users WHERE email = ?`;
    const [row] = await sql.execute(query, [email]);
    return row;
  } catch (error) {
    throw error;
  }
};

module.exports = { createManyUsers, createUser, getUserByEmail, getUsers };
