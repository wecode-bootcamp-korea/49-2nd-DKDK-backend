const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { routes } = require("./src/routes");
const { errorHandler } = require("./src/middlewares");

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json()); // for parsing application/json
  app.use(morgan("combined"));

  app.use(routes);
  app.use(errorHandler);
  return app;
};

module.exports = { createApp };
