"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var expect = require("chai").expect;
var cors = require("cors");

var apiRoutes = require("./routes/api.js");
var fccTestingRoutes = require("./routes/fcctesting.js");
var runner = require("./test-runner");

var app = express();

app.use("/public", express.static(process.cwd() + "/public"));

app.use(cors({ origin: "*" })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route("/").get(function(req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API
app.get("/api/convert", (req, res) => {
  var input = req.query.input;

  var unitRegex = /[a-z]*$/i;
  var unit = input.match(unitRegex)[0].toLowerCase();

  var numberRegex = /[0-9]*\.?\/?[0-9]*/;
  var number = input.match(numberRegex)[0];
  number = eval(number)

  var newNumber;
  var newUnit;
  var string;

  console.log(unit);
  console.log(number);

  if (unit == "kg") {
    newNumber = number * 2.20462262185;
    newUnit = "lbs";
    string = `${number} kilograms converts to ${newNumber} pounds`;
  } else if (unit == "km") {
    newNumber = number * 0.62137;
    newUnit = "mi";
    string = `${number} kilometers converts to ${newNumber} miles`;
  } else if (unit == "gal") {
    newNumber = number * 3.78541;
    newUnit = "l";
    string = `${number} gallons converts to ${newNumber} liters`;
  } else if (unit == "lbs") {
    newNumber = number / 2.20462;
    newUnit = "kg";
    string = `${number} pounds converts to ${newNumber} kilograms`;
  } else if (unit == "mi") {
    newNumber = number / 0.62137;
    newUnit = "km";
    string = `${number} miles converts to ${newNumber} kilometers`;
  } else if (unit == "l") {
    newNumber = number / 3.78541;
    newUnit = "gal";
    string = `${number} miles converts to ${newNumber} kilometers`;
  }else if (unit){
    newUnit = "Invalid unit"
  }

  console.log(newNumber);
  console.log(string);
});

apiRoutes(app);

//404 Not Found Middleware
app.use(function(req, res, next) {
  res
    .status(404)
    .type("text")
    .send("Not Found");
});

//Start our server and tests!
app.listen(process.env.PORT || 3000, function() {
  console.log("Listening on port " + process.env.PORT);
  if (process.env.NODE_ENV === "test") {
    console.log("Running Tests...");
    setTimeout(function() {
      try {
        runner.run();
      } catch (e) {
        var error = e;
        console.log("Tests are not valid:");
        console.log(error);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
