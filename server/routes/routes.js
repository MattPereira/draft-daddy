"use strict";

const { google } = require("googleapis");
require("dotenv").config();

const sheets = google.sheets("v4");

/***** All the endpoints here for now *****/

const express = require("express");
const router = new express.Router();

router.get("/", async function (req, res, next) {
  const sheets = google.sheets("v4");

  const sheetsApiResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: "1sLENermMlKCZI79GOnil-X0rr_62FPoxlXjs7azNGDU",
    range: "Exposure For Ext",
    key: process.env.API_KEY,
  });

  const rawData = sheetsApiResponse.data.values.slice(1);

  const keys = rawData[0];
  const values = rawData.slice(1);

  const prettyData = values.map((row) => {
    let obj = {};

    row.forEach((value, idx) => {
      obj[keys[idx]] = value;
    });

    return obj;
  });

  return res.json({ data: prettyData });
});

module.exports = router;
