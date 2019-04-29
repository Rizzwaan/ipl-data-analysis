fetch('./data.json')
    .then(response => response.json())
    .then(data => {

      chartForMatchesPerSeason(data["MatchesPlayed"]);
      barCharForNoOfWins(data["MatchesWonPerTeamPerYear"]);
      chartForExtraRunsPerTeam(data["ExtraRunsPerTeam"]);
      chartForEconomicalBower(data["TopTenEconomicalBowler"]);
})

function formatColumnGraphData(object){
  let arr = [];
  for( let item in object){
    arr.push({name:item, y:object[item]})
  }
   return arr;
}

function formatBarChartData(object){
   let arr = [];
   let checkingArray = ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017'];
   for( let item in object){
       let newArr = []
      checkingArray.forEach(val => {
           if(object[item][val] === undefined){
             newArr.push('0')
           }else{
               newArr.push(object[item][val]);
           }
      })
      arr.push({name: item, data: newArr})
   }
    return [arr,checkingArray]
}


//------------------chart functions -----------------------------------------//

function chartForMatchesPerSeason(jsonData) {
    let formatedData = formatColumnGraphData(jsonData);
    Highcharts.chart('div1', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Total Matches Played Per Season!!'
      },
      subtitle: {
          text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
      },
      xAxis: {
          type: 'category',
          title: {
            text: 'Year',
          }
      },
      yAxis: {
          title: {
              text: 'Number of Matches'
          }
  
      },
      legend: {
          enabled: false
      },
      plotOptions: {
          series: {
              borderWidth: 0,
              dataLabels: {
                  enabled: true,
                  format: '{point.y:.1f}'
              }
          }
      },
  
      tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
      },
  
      series: [
          {
              name: "Matches",
              colorByPoint: true,
              data:  formatedData,
          }
      ],
      
  });
}


function barCharForNoOfWins(jsonData) {
   let formattedData = formatBarChartData(jsonData);
   Highcharts.chart('div4', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Wins Each Team Per Year'
    },
    xAxis: {
        categories: formattedData[1]
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Wins In Year'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series:  formattedData[0],
});
}

function chartForExtraRunsPerTeam(jsonData) {
  let formatedData = formatColumnGraphData(jsonData);
  Highcharts.chart('div2', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Extra Runs By Each Team In 2016!!'
    },
    subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    xAxis: {
        type: 'category',
        title: {
          text: 'Team',
        }
    },
    yAxis: {
        title: {
            text: 'Total Runs'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
    },

    series: [
        {
            name: "Extra Runs",
            colorByPoint: true,
            data:  formatedData,
        }
    ],
    
});
}



function chartForEconomicalBower(jsonData) {
  let formatedData = formatColumnGraphData(jsonData);
  Highcharts.chart('div3', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Top 10 Economical Bowler 2015!!'
    },
    subtitle: {
        text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'
    },
    xAxis: {
        type: 'category',
        title: {
          text: 'Bowler',
        }
    },
    yAxis: {
        title: {
            text: 'Economy'
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
    },

    series: [
        {
            name: "Economy",
            colorByPoint: true,
            data:  formatedData,
        }
    ],
    
});
}