//1.9.2020     AJAX call
const API = 'https://api.darksky.net/forecast/557ecd4b8c8bbba02f4a50afe884934b/'

$(document).ready(function () {
    
    $('.tab').on('click', function () {
        if ($(this).data('iscurrent')) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(getLocalWeather);
              }
        }
        else {
            getWeather( $(this).data('lat'), $(this).data('long'));
        }
    });
   
});

let getWeather = function (lat, long) {
    let _lat = lat;
    let _long = long;
    let url = API + _lat + "," + _long;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data) {
            console.log(data);
             document.getElementById("weather_location").innerHTML = getTimezone(data.timezone);
             document.getElementById("weather_temp").innerHTML = cunvertToCelius(data.currently.temperature).toFixed(2);
            document.getElementById("weather_description").innerHTML = data.currently.icon;
        },
        error: function (msg) {
            console.log("error");
        },
    });
};

let getLocalWeather = function(coordinates){
    let coords = coordinates.coords;
    let lat = String(coords.latitude);
    let long = String(coords.longitude);
     getWeather(lat, long) ;
}

function getTimezone(str) {
    return str.split('/')[1];
}
function cunvertToCelius(temp){
 return (5/9)*(temp - 32);
}
