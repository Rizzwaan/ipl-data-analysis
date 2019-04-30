const fs = require('fs');

//---------------------converting csv to json-------------------------------//

const convertCsvToJson = require('./csvToJson');
const matchData = convertCsvToJson('./data/matches.csv');
const deliveryData = convertCsvToJson('./data/deliveries.csv');

//---------------- function form ipl.js file------------------------------//

const functions = require('./ipl');
const getNoOfMatchesPlayed = functions.getNoOfMatchesPlayed;
const getNoOfMatchesWonPerTeamPerYear = functions.getNoOfMatchesWonPerTeamPerYear;
const getExtraRunsPerTeamPerYear = functions.getExtraRunsPerTeamPerYear;
const getTopTenEconomicalBowlerForYear = functions.getTopTenEconomicalBowlerForYear;
const getNoOfMatchesPlayedinDifferentCites= functions.getNoOfMatchesPlayedinDifferentCites;

let jsonData = {};

jsonData["MatchesPlayed"] = getNoOfMatchesPlayed(matchData);
jsonData["MatchesWonPerTeamPerYear"] = getNoOfMatchesWonPerTeamPerYear(matchData);
jsonData["ExtraRunsPerTeam"] = getExtraRunsPerTeamPerYear(matchData,deliveryData);
jsonData["TopTenEconomicalBowler"] = getTopTenEconomicalBowlerForYear(matchData,deliveryData);
jsonData["MatchesPlayedInCities"] = getNoOfMatchesPlayedinDifferentCites(matchData);
;

fs.writeFile('./public/data.json',JSON.stringify(jsonData,null,4),
  (err) => {
    if( err){
      console.log(err);
    }else{
      console.log('Success');
    }
  }
)
