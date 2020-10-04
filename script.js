var API_KEY = "7ca00def645e760d9e5485c05171420a";
var cities = ["Austin", "Denver", "Dallas"];

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


        var UVurl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=" + API_KEY;

        $.ajax({
            url: UVurl,
            method: "GET"
        }).then(function (response) {
            $(".uv").text("UV index: " + response.value);


            // var forcastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + 30.27 + "&lon=" + -94.74 + "&appid=" + API_KEY;
            // // var forcastURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + response.coord.id + "&appid=" + API_KEY;
            // $.ajax({
            //     url: forcastURL,
            //     method: "GET"
            // }).then(function(response) {
            //     console.log(response);
            //     $(".forcast1").text(response.list[0])
            // })
        })
    });
});
$("#find-city").on("click", function (event) {
    
    event.preventDefault();
    var city = $("#city-input").val().trim();
    cities.push(city);
    renderButtons();
});

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