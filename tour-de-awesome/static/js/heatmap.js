var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "/countries";

d3.json(url, function(response) {

  // var heatArray = [];
  // console.log(response.latitude.length);
  // for (var i = 0; i < response.latitude.length; i++) {
  //   var latitude = response.latitude[i];
  //   var longitude = response.longitude[i]
  //   if (latitude) {
  //     heatArray.push([longitude, latitude])
  //     L.marker([latitude, longitude]).addTo(myMap);
  //   }
  // }

  // var heat = L.heatLayer(heatArray, {
  //   radius: 5,
  //   blur: 5
  // }).addTo(myMap);

  console.log(response);

});
