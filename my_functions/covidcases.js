const fetch = require('node-fetch')

const API_ENDPOINT = "https://data.bs.ch/api/records/1.0/search/?dataset=100073&q=&sort=timestamp&facet=timestamp";
let ausgabe = ""

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(function(data){
        // Displaying it to the DOM
         data.records.forEach(post => { ausgabe+= post.fields.current_quarantined_total+=" - ";});
      })
      .then(data => ({
        statusCode: 200,
        body: ausgabe
      }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};