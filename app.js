const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function() {
  console.log("Server kicked off at port 3000");
});
