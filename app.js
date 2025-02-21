const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index.js");
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.json({ message: "haloooo" });
});

app.listen(config.PORT, () => {
  console.log("Happy hacking 🍰");
  console.log(`app running on localhost:${config.PORT} 😎`);
});
