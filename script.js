const API_KEY = "7ca00def645e760d9e5485c05171420a";
const initialCities = ["Atlanta", "Orlando", "San Francisco", "Chicago", "Dallas", "Houston", "Los Angeles", "Phoenix", "Philadelphia", "Jacksonville", "Austin"];

const firstURL = "https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=" + API_KEY;
// displays weather data for user search
function displayCityName(cityName) {
    var displayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + API_KEY;
    $.ajax({
        url: displayURL,
        method: "GET"
    }).then(function (response) {
        $(".city").html("<h1>" + response.name + "</h1>");
        $(".temp").text("Temperature: " + response.main.temp + "F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind speed: " + response.wind.speed + "s");
        $(".mainIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $(".description").text(response.weather[0].description);
        // provides UV data
        var UVurl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + API_KEY;

        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (response) {
            $(".uv").text("UV index: " + response.value);
            var UV = response.value;
            if (UV > 7) {
                $(".uv").attr("class", "uv high");
            } else if (UV > 5) {
                $(".uv").attr("class", "uv moderate");
            } else {
                $(".uv").attr("class", "uv low");
            }
        });
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + API_KEY
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $(".date0").text(response.list[5].dt_txt);
            $(".icon0").attr("src", "https://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png");
            $(".description0").text(response.list[5].weather[0].description);
            $(".date1").text(response.list[13].dt_txt);
            $(".icon1").attr("src", "https://openweathermap.org/img/wn/" + response.list[13].weather[0].icon + "@2x.png");
            $(".description1").text(response.list[13].weather[0].description);
            $(".date2").text(response.list[21].dt_txt);
            $(".icon2").attr("src", "https://openweathermap.org/img/wn/" + response.list[21].weather[0].icon + "@2x.png");
            $(".description2").text(response.list[21].weather[0].description);
            $(".date3").text(response.list[29].dt_txt);
            $(".icon3").attr("src", "https://openweathermap.org/img/wn/" + response.list[29].weather[0].icon + "@2x.png");
            $(".description3").text(response.list[29].weather[0].description);
            $(".date4").text(response.list[37].dt_txt);
            $(".icon4").attr("src", "https://openweathermap.org/img/wn/" + response.list[37].weather[0].icon + "@2x.png");
            $(".description4").text(response.list[37].weather[0].description);
            $(".forecastTemp0").text("Temp: " + response.list[5].main.temp + "F");
            $(".forecastTemp1").text("Temp: " + response.list[13].main.temp + "F");
            $(".forecastTemp2").text("Temp: " + response.list[21].main.temp + "F");
            $(".forecastTemp3").text("Temp: " + response.list[29].main.temp + "F");
            $(".forecastTemp4").text("Temp: " + response.list[37].main.temp + "F");
            $(".forecastHum0").text("Humidity: " + response.list[5].main.humidity + "%");
            $(".forecastHum1").text("Humidity: " + response.list[13].main.humidity + "%");
            $(".forecastHum2").text("Humidity: " + response.list[21].main.humidity + "%");
            $(".forecastHum3").text("Humidity: " + response.list[29].main.humidity + "%");
            $(".forecastHum4").text("Humidity: " + response.list[37].main.humidity + "%");

        });
    })
}
// adds user search to array and renders a button for each city in the array
function addCityButtons() {
    $("#buttonsView").empty();

    var searchedCities = JSON.parse(localStorage.getItem("searchedCities") || "[]");
    var allCities = initialCities.concat(searchedCities);
    displayCityName(allCities[allCities.length - 1]);
    for (var i = 0; i < allCities.length; i++) {
        addCityButton(allCities[i]);
    }
}
// adds a button for user city search
function addCityButton(city) {
    var a = $("<button>");
    a.addClass("city-btn");
    a.attr("data-name", city);
    a.text(city);
    $("#buttonsView").prepend(a);
}
// displays weather info on user city search
$("#find-city").on("click", function (event) {
    event.preventDefault();
    var userCity = $("#city-input").val();
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + API_KEY;

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".city").html("<h1>" + response.name + "</h1>");
        $(".temp").text("Temperature: " + response.main.temp + "F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind speed: " + response.wind.speed + "s");
        $(".mainIcon").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        $(".description").text(response.weather[0].description);
        // provides UV data
        var UVurl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + API_KEY;

        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (response) {
            $(".uv").text("UV index: " + response.value);
            var UV = response.value;
            if (UV > 7) {
                $(".uv").attr("class", "uv high");
            } else if (UV > 5) {
                $(".uv").attr("class", "uv moderate");
            } else {
                $(".uv").attr("class", "uv low");
            }
        });
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&units=imperial&appid=" + API_KEY
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $(".date0").text(response.list[5].dt_txt);
            $(".icon0").attr("src", "https://openweathermap.org/img/wn/" + response.list[5].weather[0].icon + "@2x.png");
            $(".description0").text(response.list[5].weather[0].description);
            $(".date1").text(response.list[13].dt_txt);
            $(".icon1").attr("src", "https://openweathermap.org/img/wn/" + response.list[13].weather[0].icon + "@2x.png");
            $(".description1").text(response.list[13].weather[0].description);
            $(".date2").text(response.list[21].dt_txt);
            $(".icon2").attr("src", "https://openweathermap.org/img/wn/" + response.list[21].weather[0].icon + "@2x.png");
            $(".description2").text(response.list[21].weather[0].description);
            $(".date3").text(response.list[29].dt_txt);
            $(".icon3").attr("src", "https://openweathermap.org/img/wn/" + response.list[29].weather[0].icon + "@2x.png");
            $(".description3").text(response.list[29].weather[0].description);
            $(".date4").text(response.list[37].dt_txt);
            $(".icon4").attr("src", "https://openweathermap.org/img/wn/" + response.list[37].weather[0].icon + "@2x.png");
            $(".description4").text(response.list[37].weather[0].description);
            $(".forecastTemp0").text("Temp: " + response.list[5].main.temp + "F");
            $(".forecastTemp1").text("Temp: " + response.list[13].main.temp + "F");
            $(".forecastTemp2").text("Temp: " + response.list[21].main.temp + "F");
            $(".forecastTemp3").text("Temp: " + response.list[29].main.temp + "F");
            $(".forecastTemp4").text("Temp: " + response.list[37].main.temp + "F");
            $(".forecastHum0").text("Humidity: " + response.list[5].main.humidity + "%");
            $(".forecastHum1").text("Humidity: " + response.list[13].main.humidity + "%");
            $(".forecastHum2").text("Humidity: " + response.list[21].main.humidity + "%");
            $(".forecastHum3").text("Humidity: " + response.list[29].main.humidity + "%");
            $(".forecastHum4").text("Humidity: " + response.list[37].main.humidity + "%");

        });
    });
});
// adds user city search to local storage
$("#find-city").on("click", function (event) {

    event.preventDefault();
    var city = $("#city-input").val().trim();
    $("#city-input").val("");
    addCityButton(city);
    var searchedCities = JSON.parse(localStorage.getItem("searchedCities") || "[]");
    searchedCities.push(city);
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
});
// dispays weather info when user clicks any city button
$(document).on("click", ".city-btn", citySearch);

addCityButtons();
// renders weather info based on the user search
function citySearch() {
    var cityName = $(this).attr("data-name");
    displayCityName(cityName);
}