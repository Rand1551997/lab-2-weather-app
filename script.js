document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();

  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=a22d758a13a84b65c33f244c52ebab04";
  console.log(url);
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      let results = "";
      results += '<div class = "Weather-class"><h2>Current Weather in ' + json.name + "</h2>";
      for (let i = 0; i < json.weather.length; i++) {
        results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += '<h2>Feels like: ' + json.main.feels_like + " &deg;F</h2>"
      results += '<h2>humidity: ' + json.main.humidity + " &deg;F</h2>"
      results += '<h2>pressure: ' + json.main.pressure + " &deg;F</h2>"
      results += '<h2>temp_max:  ' + json.main.temp_max + " &deg;F</h2>"
      results += "<p>"
      for (let i = 0; i < json.weather.length; i++) {
        results += json.weather[i].description
        if (i !== json.weather.length - 1)
          results += ", "
      }
      results += '</p></div>';
      document.getElementById("weatherResults").innerHTML = results;
    });

  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=a22d758a13a84b65c33f244c52ebab04";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json)
      let forecast = "" + '<h2 class = "simple ">Next 5 days </h2>';

      for (let i = 0; i < json.list.length; i++) {
        forecast += '<div class = " grid-container" ><h2>' + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
        forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
        forecast += '<div class = "weatherIcon"><img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></div></div>'
        forecast += '<h2>Feels like: ' + json.list[i].main.feels_like + " &deg;F</h2>"
        forecast += '<h2>humidity: ' + json.list[i].main.humidity + " %</h2>"
        forecast += '<h2>pressure: ' + json.list[i].main.pressure + " &deg;F</h2>"
        forecast += '<h2>temp_max: ' + json.list[i].main.temp_max + " &deg;F</h2>"
      }
      document.getElementById("forecastResults").innerHTML = forecast;
    });
});
