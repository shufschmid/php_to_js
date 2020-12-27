const fetch = require('node-fetch')

const API_ENDPOINT = "https://data.bs.ch/api/records/1.0/search/?dataset=100073&q=&sort=timestamp&facet=timestamp";

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(data => ({
      statusCode: 200,
      body: data.records
    }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};