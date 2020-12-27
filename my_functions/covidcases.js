const fetch = require('node-fetch')

const API_ENDPOINT = "https://data.bs.ch/api/records/1.0/search/?dataset=100077&q=BS+or+BL&rows=100&sort=update";
let ausgabe = ""

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(function(data){
        // Displaying it to the DOM
         data.records.forEach(post => { 
             
                 ausgabe+= post.fields.ncumul_conf+=" - ";});
      })
      .then(data => ({
        statusCode: 200,
        body: ausgabe
      }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};