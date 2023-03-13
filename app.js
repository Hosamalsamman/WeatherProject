const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {


    const appid = "128308b11ba0e3baa406d5ad653c8b67";
    const query = req.body.cityName;
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + appid;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            console.log(temp);

            const description = weatherData.weather[0].description;
            console.log(description);

            const icon_link = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";

            res.write("<h1>The temperature in " + query + " is " + temp + " Celcius.</h1>");
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<img src=" + icon_link + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("server is running on port 3000.");
});

