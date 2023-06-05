"use strict";

const { google } = require("googleapis");
require("dotenv").config();

const sheets = google.sheets("v4");

/***** All the endpoints here for now *****/

const express = require("express");
const router = new express.Router();

// brads exposures
router.get("/", async function (req, res, next) {
  // range grabbing 300 rows of data from spreadsheet
  // skipping over the first row because not needed for data -> "A2"
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: "1qXX_OziGRULreow3w2YhvvJR__lYSyothvptO1MdZ3c",
    range: "Combined Exposure!A2:Z300",
    key: process.env.API_KEY,
  });

  const data = response.data.values;

  // the keys are the first item in raw data aray
  const keys = data[0];
  // the values are everything after the first item in raw data array
  const values = data.slice(1);

  // map over values array and create an object for each row instead of having a bunch of nested arrays
  const objectArray = values.map((row) => {
    let obj = {};

    row.forEach((value, idx) => {
      obj[keys[idx]] = value;
    });

    return obj;
  });

  const initialValue = {};

  // reduce the array of objects into a single object with child objects that have key of id
  const objectsOnly = objectArray.reduce((obj, item) => {
    return {
      ...obj,
      [item["id"]]: item,
    };
  }, initialValue);

  // returning hashmap instead of array for faster lookup speeds
  return res.json({ data: objectsOnly });
});

module.exports = router;
