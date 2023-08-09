const { google } = require("googleapis");

const sheets = google.sheets("v4");

export async function GET(request) {
  console.log(process.env.GOOGLE_SHEETS_API_KEY);

  const sheetsResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: "1qXX_OziGRULreow3w2YhvvJR__lYSyothvptO1MdZ3c",
    range: "Combined Exposure!A3",
    key: process.env.GOOGLE_SHEETS_API_KEY,
  });

  const rawData = sheetsResponse.data.values;

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
  const data = objectArray.reduce((obj, item) => {
    return {
      ...obj,
      [item["Player Name"]]: item,
    };
  }, initialValue);

  return Response.json({ data: data });
}
