
// Creating map object
var myMap = L.map("map", {
  center: [37.7749, -7.4194],
  zoom: 1.3
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "/countries" ;


// Fetch the JSON data and console log it
d3.json(url, function (data) { 
console.log(data);

// define variables to use for choropleth from app and geojson format in shapes.js
country_count = data.country_count;
console.log(country_count);
country_name = geoShapes.features[4].properties.name;


function getColor(d, e = 0){

return d >= 25 ? '#fe1300' :
       d >= 15  ? '#ff2727' :
       d >= 10  ? '#ff6827' :
       d >= 4  ? '#ff8514' :
       d >= 2  ? '#ffdd27' : 
       d > 0  ? '#ffff76' :
                '#FFEDA0';
}



function style(feature) {
return {
    fillColor: getColor(country_count[feature.properties.name]),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
};
}
L.geoJson(geoShapes, {style:style}).addTo(myMap);
// });
// // Grab the data with d3
// d3.json(url, function(data) {

// Create a new marker cluster group
var markers = L.markerClusterGroup();
locate = [];

for (var i = 0; i < data.country.length; i++) {
var lat = data.latitude[i];
var lng = data.longitude[i];

locate[lat,lng]

console.log(lng);
console.log(lat);
console.log(locate) 

// Check for location property
if (locate) {

  markers.addLayer(L.circleMarker(


  [lat, lng],{radius:3})
  .bindPopup("<h6>" +data.rider_name[i] + "</h6> <hr><img width=70 src = https://i.pinimg.com/originals/05/8d/07/058d0703a96cc9f6cf669bc6017aa4bf.gif alt=testing /><b>Rank: " + data.final_ranking[i] + "</b>"));
  
  
}

}
// Add our marker cluster layer to the map
myMap.addLayer(markers);

// Set up the legend and the colour variance for magnitude from leaflet documentation
var legend = L.control({ position: 'bottomright'});


  legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend'),
        colors = [1,2,4,10,15,25],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
  div.innerHTML += '<h4> Riders per Country</h4>'
    for (var i = 0; i < colors.length; i++) {
        div.innerHTML +=
            '<i style="background:' + fillColor(colors[i] + 1) + '"></i> ' +
            colors[i] + (colors[i + 1] ? '&ndash;' + colors[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

// Define colors depending on the magnituge of the earthquake
function fillColor(colors) {

  switch (true) {
    case colors >= 25:
      return '#fe1300';
      break;
    
    case colors >= 15:
      return '#ff2727';
      break;

    case colors >= 10:
      return '#ff6827';
      break;
    
    case colors >= 4:
      return '#ff8514';
      break;

    case colors >= 2:
      return '#ffdd27';
      break;
    
    case colors > 0:
      return '#ffff76 ';
      break;

    default:
      return '#FFEDA0';
  };
};

});


  
