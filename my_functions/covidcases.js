const fetch = require('node-fetch')

const API_ENDPOINT = "https://data.bs.ch/api/records/1.0/search/?dataset=100077&q=BS+or+BL&rows=100&sort=update";
let ausgabe = ""

const allBS = []
const allBL = []

exports.handler = async (event, context) => {
  return fetch(API_ENDPOINT, { headers: { "Accept": "application/json" } })
    .then(response => response.json())
    .then(function(data){
        // Displaying it to the DOM
         data.records.forEach(post => { 
            if(post.fields.abbreviation_canton_and_fl == "BS") {
                allBS.push(parseInt(post.fields.ncumul_conf));
              }
              else if(post.fields.abbreviation_canton_and_fl == "BL") {
                allBL.push(parseInt(post.fields.ncumul_conf));
              }
                });
                allBS.reverse()
                allBL.reverse()
                        let newCasesCumBS = []
                let newCasesCumBL = []
                allBS.forEach((e, index) => {
                    // @Todo addition of last 7 or 14 days from current date e into the past
                    // push only if the difference between previous day and current day is positive, if not add zero
                    newCasesCumBS.push(index > 0 ? e - allBS[index - 1] > 0 ? e - allBS[index - 1] : 0 : 0);
                    
                })
            
                allBL.forEach((e, index) => {
                    newCasesCumBL.push(index > 0 ? e - allBL[index - 1] > 0 ? e - allBL[index - 1] : 0 : 0)
                })

      })
      .then(data => ({
        statusCode: 200,
        body: newCasesCumBL
      }))
    .catch(error => ({ statusCode: 422, body: String(error) }));
};