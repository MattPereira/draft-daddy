"use strict";

const { google } = require("googleapis");
require("dotenv").config();

const sheets = google.sheets("v4");

/***** All the endpoints here for now *****/

const express = require("express");
const router = new express.Router();

// brads exposures
router.get("/", async function (req, res, next) {
  const sheets = google.sheets("v4");

  const sheetsApiResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: "1sLENermMlKCZI79GOnil-X0rr_62FPoxlXjs7azNGDU",
    range: "Exposure For Ext",
    key: process.env.API_KEY,
  });

  // slicing first row because brad made some useless headers in google sheets
  const rawData = sheetsApiResponse.data.values.slice(1);

  // the keys are the first item in raw data aray
  const keys = rawData[0];
  // the values are everything after the first item in raw data array
  const values = rawData.slice(1);

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

// temp bandaid for matt's exposures
router.get("/exposures/matt", async function (req, res, next) {
  const sheets = google.sheets("v4");

  const sheetsApiResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: "1sLENermMlKCZI79GOnil-X0rr_62FPoxlXjs7azNGDU",
    range: "Matt Exposures",
    key: process.env.API_KEY,
  });

  // slicing first row because brad made some useless headers in google sheets
  const rawData = sheetsApiResponse.data.values.slice(1);

  // the keys are the first item in raw data aray
  const keys = rawData[0];
  // the values are everything after the first item in raw data array
  const values = rawData.slice(1);

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
