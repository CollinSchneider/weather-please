#!/usr/bin/env node
var request = require('request');
var figlet = require('figlet');
require('dotenv').config();

if(process.argv[2]){
  var city = process.argv[2].replace(' ', '')
  var state = process.argv[3]
  var query = state === undefined ? city : city + ',' + state.replace(' ', '')
  // var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&cnt=7&appid='+process.env.API_KEY; FORECAST
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+process.env.API_KEY;
  getWeather(url)
} else {
  figlet('Weather-Please', function(err, msg) {
      if (err) {
        console.log('error...');
        console.dir(err);
        return;
      }
      console.log(msg)
      console.log("Use command 'weather-please <city(zip or name)>' to retrieve weather info on your city\n");
  });
}


function getWeather(url){
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body)
      figlet(json.name, function(err, msg) {
          if (err) {
            console.log('error...');
            console.dir(err);
            return;
          }
          console.log(msg)
          console.log(json.weather[0].description);
          console.log("Current temperature: "+kelvinToF(json.main.temp)+"°F");
          console.log("Wind blowing "+json.wind.speed+" MPH");
          console.log('\n');
      });
      // console.log(json);
    }
  })
}

function kelvinToF(kelvin){
  return Math.round((kelvin*(9/5)) - 459.67)
}
