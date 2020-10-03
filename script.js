var API_KEY = "7ca00def645e760d9e5485c05171420a";
var url = "https://api.openweathermap.org/data/2.5/weather?q=Austin&units=imperial&appid=" + API_KEY;


$.ajax({
  url: url,
  method: "GET"
}).then(function(response){
  console.log(response);
  $(".city").html("<h1>" + response.name + " weather details</h1>");
  $(".wind").text("Wind speed: " + response.wind.speed + "s");
  $(".humidity").text("Humidity: " + response.main.humidity + "%");
  $(".temp").text("Temperature: " + response.main.temp + "F")
}); 
