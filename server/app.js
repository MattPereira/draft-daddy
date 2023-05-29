"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { NotFoundError } = require("./expressError");

const app = express();

app.use(cors());

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  return res.json({ message: "Hello world!" });
});

/** Handle 404 errors -- if an endpoint that doesnt exist gets requested */
app.use(function (req, res, next) {
  console.log("THIS ENDPOINT DOES NOT EXIST");
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
