"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();
require("colors");

const PORT = +process.env.PORT || 3001;

console.log("ENV VARS".green);
console.log("-----");
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("-----");
console.log("PORT:".yellow, PORT.toString());
console.log("-----");

module.exports = {
  PORT,
};
