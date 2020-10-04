var API_KEY = "7ca00def645e760d9e5485c05171420a";
var cities = ["Nederland", "Atlanta", "Orlando", "San Francisco", "Chicago", "Dallas", "Austin"];
var firstURL = "https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=" + API_KEY;

function displayCityName() {
    var cityName = $(this).attr("data-name");
    var displayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + API_KEY;
    $.ajax({
        url: displayURL,
        method: "GET"
    }).then(function (response) {
        $(".city").html("<h1>" + response.name + " weather details</h1>");
        $(".temp").text("Temperature: " + response.main.temp + "F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind speed: " + response.wind.speed + "s");
        // provides UV data
        var UVurl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + API_KEY;

        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (response) {
            $(".uv").text("UV index: " + response.value);
        });
    })
}
// renders a button for each city in the "cities" array
function renderButtons() {
    $("#buttonsView").empty();
    for (var i = 0; i < cities.length; i++) {

        var a = $("<button>");
        a.addClass("city-btn");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#buttonsView").prepend(a);
    }
}

// provides weather details for Austin when you first load the page
function renderWeather() {
    $.ajax({
        url: firstURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".city").html("<h1>" + response.name + " weather details</h1>");
        $(".temp").text("Temperature: " + response.main.temp + "F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind speed: " + response.wind.speed + "s");
        // provides UV data
        var UVurl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + API_KEY;

        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (response) {
            $(".uv").text("UV index: " + response.value);
        });
    });
}
// provides weather deatils for city user searches
$("#find-city").on("click", function (event) {
    event.preventDefault();
    var userCity = $("#city-input").val();
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + API_KEY;

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".city").html("<h1>" + response.name + " weather details</h1>");
        $(".temp").text("Temperature: " + response.main.temp + "F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind speed: " + response.wind.speed + "s");

        // provides UV data
        var UVurl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + API_KEY;

        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (response) {
            $(".uv").text("UV index: " + response.value);
        });
    });
});
// adds button for city user searches
$("#find-city").on("click", function (event) {

    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    $("#city-input").val("");
    renderButtons();
});

// $(".city-btn").on("click", function (){
//     $(".city").html("<h1>" + response.name + " weather details</h1>");
//     $(".temp").text("Temperature: " + response.main.temp + "F");
//     $(".humidity").text("Humidity: " + response.main.humidity + "%");
//     $(".wind").text("Wind speed: " + response.wind.speed + "s");
// })

$(document).on("click", ".city-btn", displayCityName);

renderWeather();
renderButtons();







// $.ajax({
//   url: url,
//   method: "GET"
// }).then(function(response){
//   console.log(response);
//   $(".city").html("<h1>" + response.name + " weather details</h1>");
//   $(".wind").text("Wind speed: " + response.wind.speed + "s");
//   $(".humidity").text("Humidity: " + response.main.humidity + "%");
//   $(".temp").text("Temperature: " + response.main.temp + "F")
// }); 

// "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + API_KEY