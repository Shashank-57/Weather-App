const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.set('view engine','ejs');

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
      var temper = weatherData.main.temp;
      var weaDesc = weatherData.weather[0].description;
      res.render("response", {temp: temper, wd: weaDesc});
    })
  })
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server kicked off at port 3000");
});
