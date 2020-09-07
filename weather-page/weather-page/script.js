//1.9.2020     AJAX call
const API = 'https://api.darksky.net/forecast/557ecd4b8c8bbba02f4a50afe884934b/';
const CORSPROXY = 'https://cors-anywhere.herokuapp.com/';
var skycons = new Skycons({ "color": "#fff" });
skycons.play();
$(document).ready(function () {
    getMyLocalWeather();
    $('.tab').on('click', function () {
        if ($(this).data('iscurrent')) {
            getMyLocalWeather();
        }
        else {
            let lat = $(this).data('lat');
            let long = $(this).data('long');
            getWeather(lat, long);
        }
    });

});

// Call ajax with vanila js:
function getWeather(lat, long) {
    startLoader();
    let url = CORSPROXY + API + lat + "," + long;
    var opts = {
        method: 'GET',
        headers: {}
    };
    fetch(url).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            handleData(data);
        }).catch(function (e) {
            handleError(e);
        });
}
function getMyLocalWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getLocalWeather);
    }
}
let getLocalWeather = function (coordinates) {
    let coords = coordinates.coords;
    let lat = String(coords.latitude);
    let long = String(coords.longitude);
    getWeather(lat, long);
}
function getTimezone(str) {
    return str.split('/')[1];
}
function cunvertToCelius(temp) {
    return (5 / 9) * (temp - 32);
}
function handleError(e) {
    document.getElementById("weather_infobox").style.display = "none";
    document.getElementById("error_text").style.display = 'block';
    document.getElementById("error_text").innerHTML = "Got some problem with connection. \n Plaese try later!"
    console.log(e);
}
function startLoader() {
    document.getElementById("loader").style.display = 'block';
    document.getElementById("weather_infobox").style.display = 'none';
}
function stopLoader() {
    document.getElementById("loader").style.display = 'none';
    document.getElementById("weather_infobox").style.display = 'block';
}
function handleData(data) {
    console.log(data);
    let current = data.currently;
    let timeZone = data.timezone
    stopLoader();
    document.getElementById("weather_location").innerHTML = getTimezone(timeZone);
    skycons.set("weather_icon", current.icon);
    document.getElementById("weather_temp").innerHTML = cunvertToCelius(current.temperature).toFixed(2);
    document.getElementById("weather_description").innerHTML = current.summary;
}

// CALL AJAX WITH JQUERY: 
// let getWeather = function (lat, long) {
//     let _lat = lat;
//     let _long = long;
//     let url = CORSPROXY + API + _lat + "," + _long;
//     $.ajax({
//         crossOrigin: true,
//         type: "GET",
//         url: url,
//         dataType: "json",
//         success: function (data) {
//             console.log(data);
//             let current = data.currently;
//             let timeZone = data.timezone
//             document.getElementById("weather_location").innerHTML = getTimezone(timeZone);
//             document.getElementById("weather_icon").innerHTML = current.icon;
//             document.getElementById("weather_temp").innerHTML = cunvertToCelius(current.temperature).toFixed(2);
//             document.getElementById("weather_description").innerHTML = current.summary;
//         },
//         error: function (msg) {
//             console.log("error");
//         },
//     });
// };
