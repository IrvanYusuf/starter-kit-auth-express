const mysql2 = require("mysql2/promise");
const config = require("../config");

const sql = mysql2.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  waitForConnections: config.db.waitForConnections,
  connectionLimit: config.db.connectionLimit,
  queueLimit: config.db.queueLimit,
});
sql
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully! 🚀");
    connection.release(); // Lepaskan koneksi kembali ke pool
  })
  .catch((err) => {
    console.error("Database connection failed 😭:", err);
  });
module.exports = sql;
