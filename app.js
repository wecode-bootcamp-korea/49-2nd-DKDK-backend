const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
require("./src/config/passport");

const { routes } = require("./src/routes");


const createApp = () => {
  const app = express();
  
  app.use(cors());
  app.use(express.json()); // for parsing application/json
  app.use(morgan("combined"));
  app.use(passport.initialize());

  app.use(routes);

  return app;
};

module.exports = { createApp };
