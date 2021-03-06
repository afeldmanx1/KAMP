var apiKey = "kjVPCM3LEwQYZxkv4byFPo1TRCvJk61IAO9wwtyI";
var searchTerm = "";
var stateTerm = "";
var queryURL = "";




var parkName = "";
var parkDescription = "";
var parkLatLon = "";
var parkCity = "";
var parkURL = "";

var wxLat, wxLon = "";


document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelector('select');
    elems.onchange = selectThem;
    var instances = M.FormSelect.init(elems);
    function selectThem() {
        var selectedOne = instances.getSelectedValues();
        console.log(selectedOne);
        stateTerm = selectedOne.join();
        console.log(stateTerm);
        queryURL = "https://api.nps.gov/api/v1/parks?q=" + searchTerm + "&stateCode=" + stateTerm + "&api_key=" + apiKey;
        console.log(queryURL);
    }

    $("#search-btn").click(function() {

        $("#search-results").empty();
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
        
            for (var i = 0; i < response.data.length; i++) {
              parkName = response.data[i].fullName;
              parkURL = response.data[i].url;
              parkLatLon = response.data[i].latLong;

              console.log(parkLatLon);
              var latEnd = parkLatLon.indexOf(".");
              wxLat = parkLatLon.substring(4,latEnd);
              console.log(wxLat);
              var lonStart = parkLatLon.lastIndexOf(":") + 1;
              var lonEnd = parkLatLon.lastIndexOf(".");
              wxLon = parkLatLon.substring(lonStart, lonEnd);
              console.log(wxLon);

              var wxResponse = "";
              
              var wxURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + wxLat + "&lon=" + wxLon + "&APPID=7d303e69b0351c31f4dd317a06e61fed&mode=html&units=imperial";

                $.ajax({
                url: wxURL,
                method: "GET"
                }).then(function(wxResponse) {
                $("#weather-results").append(wxResponse);
                 console.log(response.Runtime);
                });

              console.log(parkLatLon); 
              
              $("#search-results").append("<li><a href=" + parkURL + ">" + parkName + "</li>" + wxResponse);
             
            }
        });
    })
});



