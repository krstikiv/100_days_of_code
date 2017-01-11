jQuery(document).ready(function($) {

  //Get GeoLocation with error if browser does not support it
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      //To display geo coordinates if needed
      /* $("#geo").html("latitude: " + position.coords.latitude +
        "<br>longitude: " + position.coords.longitude); */

      //Define API URL using geoposition
      var apiUrl = "https://api.wunderground.com/api/6660b3f05f7ab0e6/conditions/geolookup/conditions/q/" + lat + "," + long + ".json";

      //console.log(apiUrl); //to test if api url is working

      //WUnderground Weather API Call
      $.ajax({
        url: apiUrl,
        type: "GET",
        dataType: "jsonp",
        success: function(data) {
          //console.log(data);
          var city = data.location.city;
          var weather = data.current_observation.weather; //Get Weather Type
          var tempString = data.current_observation.temperature_string; //Get temp_string F(C)
          var tempF = data.current_observation.temp_f + "&deg; F"; //Get temp in F
          var tempC = data.current_observation.temp_c + "&deg; C"; //Get temp in c
          var icon = data.current_observation.icon;
          var icon_url = data.current_observation.icon_url;
          var windMph = data.current_observation.wind_mph + " Mph";
          var windKph = data.current_observation.wind_kph + " Kph";
          var swap = true;

          //Switch statement to change background image based on weather conditions
         switch (icon) {
            case "snow":
            case "chancessnow":
            case "sleet":
            case "chancesleet":
            case "flurries":
            case "chanceflurries":
              $("body").css("background-image", "url('https://static.pexels.com/photos/197635/pexels-photo-197635.jpeg')");
              break;
            case "mostlycloudy":
            case "cloudy":
            case "partlycloudy":
              $("body").css("background-image", "url('https://static.pexels.com/photos/216596/pexels-photo-216596.jpeg')");
              break;
            case "rain":
            case "chancerain":
            case "tstorms":
            case "chancetstorms":
              $("body").css("background-image", "url('https://static.pexels.com/photos/69927/rain-floor-water-wet-69927.jpeg')");
              break;
            case "sunny":
            case "mostlysunny":
              $("body").css("background-image", "url('https://static.pexels.com/photos/3847/jetty-landing-stage-sea-sky.jpeg')");
              break;
            case "fog":
            case "hazy":
              $("body").css("background-image", "url('https://static.pexels.com/photos/109037/pexels-photo-109037.jpeg')");
              break;
            case "clear":
              $("body").css("background-image", "url('https://static.pexels.com/photos/191744/pexels-photo-191744.jpeg')");
              break;
          } //End switch statement to change background image based on weather conditions

          //Display in HTML
          $("#city").html(city);
          $("#icon_img").html("<img src=" + icon_url + ">"+ " " + weather);
          $("#weatherType").html(weather);
          $("#temp").html(tempF);
          $("#wind").html(windMph);

          //Begin Swap Fahrenheit & Celsius and Mph & Kph
          $("#temp").on("click", function() {
            if (swap === false) {
              $("#temp").html(tempF);
              $("#wind").html(windMph);
              swap = true;
            } else {
              $("#temp").html(tempC);
              $("#wind").html(windKph);
              swap = false;
            }
          }); //End Swap Fahrenheit & Celsius and Mph & Kph

        }
      }); //End WUnderground Weather API Call

    }); //End navigator call;

  } else {
    $("#error").html("Geolocation is not supported by this browser.");

  } //End If check
}); //End document