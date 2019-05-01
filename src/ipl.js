const convertCsvToJson = require('./csvToJson');
const matchData = convertCsvToJson('./data/matches.csv');
const deliveryData = convertCsvToJson('./data/deliveries.csv');


//-------------------------- Function 1 ------------------------------------------//
const getNoOfMatchesPlayed = (matchData) => {
   return matchData.reduce((acc, item) => {
     if(! acc[item.season] ){
       acc[item.season] = 1
     }else{
      acc[item.season] += 1
     }
     return acc;
   },{})
  }
 

// -------------------------Function 2-------------------------------------//
const getNoOfMatchesWonPerTeamPerYear = (matchData) => {
    return matchData.reduce((acc, item) => {
      if(  item.winner !== ""){
        if(! acc.hasOwnProperty(item.winner)){
          acc[item.winner] = {}
          acc[item.winner][item.season] = 1;
        }else{
          if( acc[item.winner].hasOwnProperty(item.season)){
            acc[item.winner][item.season] += 1;
          }else {
            acc[item.winner][item.season] = 1;
          }
        }
      }
      return acc;
    },{})
}

 

//--------------------Function 3 -------------------------------//
const getExtraRunsPerTeamPerYear = (matchData, deliveryData) => {
  let dictionary = matchData.reduce((acc, item) => {
       if( item.season === '2016') {
          acc.push(item.id);
       }
        
       return acc;
  },[]);
  
   let extraRuns = deliveryData.reduce((acc,item) => {
      
          if( dictionary.includes(item.match_id)){
             if(! acc[item.bowling_team]){
               acc[item.bowling_team] = Number(item.extra_runs);
             }else{
              acc[item.bowling_team] += Number(item.extra_runs)           
             }
          }
          return acc; 
   },{})
   return extraRuns
  } 
 


 
//------------------Function 4---------------------------//

const getTopTenEconomicalBowlerForYear = ( matchData, deliveryData) => {
     
  let iDs = matchData.reduce((acc, item) => {
    if(item.season === '2015'){
      acc.push(item.id);
    }
    return acc
  },[]);
  
  let totalRunsGivenByEachBowler = deliveryData.reduce((acc, item) => {
    if(iDs.includes(item.match_id)){
      if( ! acc[item.bowler]){
        acc[item.bowler] = Number(item.total_runs);
      }else{
        acc[item.bowler] += Number(item.total_runs);
      }
    } 
    return acc;
  },{});

  let totalOvers = deliveryData.reduce((acc, item) => {
    if( iDs.includes(item.match_id)){
      if( ! acc[item.bowler]){
        acc[item.bowler] = 1;
      }else{
        acc[item.bowler] += 1;  
      }
    }
    return acc;
  },{})
   
  let economy = Object.assign({},totalRunsGivenByEachBowler);
  for( let item in economy){
   if( item in totalOvers){
     economy[item] = economy[item]/(totalOvers[item]/6)
   }
  }
   let economySorted = Object.keys(economy).sort((a,b) => {
    return economy[a] - economy[b]
   }).slice(0,10).reduce((acc, cur) => {
     acc[cur] = economy[cur];
     return acc;
   },{})
    return economySorted;
}
// -----------------------------Function 5 --------------------------------//

const getNoOfMatchesPlayedInEachCites = (matchesData) => {
  return matchesData.reduce((acc, item) => {
    if( item.city !== ""){
      if( ! acc[item.city]){
        acc[item.city] = 1;
      }else{
        acc[item.city] += 1;
      }
    }
    return acc;
  },{});
}
//---------------Function 6--------------------------//



//----------------------Exporting all function -------------------------//

module.exports.getNoOfMatchesPlayed = getNoOfMatchesPlayed;
module.exports.getNoOfMatchesWonPerTeamPerYear = getNoOfMatchesWonPerTeamPerYear;
module.exports.getExtraRunsPerTeamPerYear = getExtraRunsPerTeamPerYear;
module.exports.getTopTenEconomicalBowlerForYear = getTopTenEconomicalBowlerForYear;
module.exports.getNoOfMatchesPlayedInEachCites = getNoOfMatchesPlayedInEachCites;
