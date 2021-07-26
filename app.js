const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
  var city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=b09e97061e47deeb3d42e84a05ec4bdf&units=metric";
  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      res.sendFile(__dirname+"/response.html", {city:city}, {temp:weatherData.main.temp},{wDescp:weatherData.weather[0].description});
      // res.write("<h1>The temperature of "+city+" is : "+weatherData.main.temp+" deg C</h1>");
      // res.write("<h2>The Weather Description is : "+weatherData.weather[0].description+"</h2>");
      // var picUrl = "http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png";
      // res.write("<img src="+picUrl+">");
      // res.send();
    })
  })
});

app.listen(3000, function() {
  console.log("Server kicked off at port 3000");
});
