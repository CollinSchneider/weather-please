#!/usr/bin/env node
var request = require('request');
var figlet = require('figlet');
var moment = require('moment')
require('dotenv').config();
var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Zip code of desired weather: ", function(zip) {
  var forecast = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+zip+'&cnt=7&units=imperial&appid='+process.env.API_KEY;
  var current = 'http://api.openweathermap.org/data/2.5/weather?q='+zip+'&units=imperial&appid='+process.env.API_KEY;
  getCurrentWeather(current, forecast)
  rl.close();
});

function forecastWeather(forecast){
  request(forecast, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body)
      for (var i = 1; i < json.list.length; i++) {
        var day = json.list[i]
        console.log(moment.unix(day.dt).format('dddd, MMMM D'));
        console.log('Low: '+day.temp.min+'°F');
        console.log('High: '+day.temp.max+'°F');
        console.log('\n');
      }
    }
  })
}

function getCurrentWeather(current, forecast){
  request(current, function(error, response, body){
    if (!error && response.statusCode == 200) {
      var json = JSON.parse(body)
      figlet(json.name, function(err, msg) {
        console.log(msg);
        console.log("Currently "+json.main.temp+"°F");
        console.log(json.weather[0].description);
        console.log(json.wind.speed+" MPH winds");
        console.log("\n");
      })
    }
  })
  setTimeout(function(){
    forecastWeather(forecast)
  }, 800)
}
