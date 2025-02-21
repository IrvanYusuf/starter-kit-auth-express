const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(
  __dirname,
  `.env.${process.env.NODE_ENV || "development"}`
);

const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("❌ Error loading .env file:", result.error);
} else {
  console.log("✅ Loaded ENV:", process.env.NODE_ENV);
}

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3003,

  //   secret key
  JWT_KEY: process.env.JWT_KEY || "agrimas",
  //DB Configuration
  db: {
    host: process.env.DBHOST || "127.0.0.1",
    user: process.env.DBUSER || "root",
    password: process.env.DBPASSWORD || "",
    database: process.env.DATABASE || "agrimas",
    port: process.env.DBPORT || 3306,
    waitForConnections: true,
    connectionLimit: 99,
    queueLimit: 0,
    debug: false,
    timezone: "Z",
  },
};

module.exports = config;
