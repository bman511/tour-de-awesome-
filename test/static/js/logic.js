
//   // Creating map object
//   var myMap = L.map("map", {
//     center: [37.7749, -7.4194],
//     zoom: 2.3,
//     // layers: [streetmap, ]
//   });

//   var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(myMap)

//   // var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   //   maxZoom: 18,
//   //   id: "mapbox.dark",
//   //   accessToken: API_KEY
//   // }).addTo(myMap)

//   // var baseMaps = {
//   //   "Street Map": streetmap,
//   //   "Dark Map": darkmap
//   // };

//   // var overlayMaps = {
//   //   "riders": data
//   // }
  
//   // L.control.layers(baseMaps, overlayMaps, {
//   //   collapsed: false
//   // }).addTo(myMap);

//   // // Adding tile layer
//   // L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//   //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   //   maxZoom: 18,
//   //   id: "mapbox.streets",
//   //   accessToken: API_KEY
//   // }).addTo(myMap);





// var url = "/countries" ;


// // Fetch the JSON data and console log it
// d3.json(url, function (data) { 
//   console.log(data);

  
// country_count = data.country_count;
// console.log(country_count);
// country_name = geoShapes.features[4].properties.name;

// // country_counts = country_count[country_name];

// // console.log(country_counts);

// function getColor(d, e = 0){
  
//   return d > 25 ? '#800026' :
//            d > 15  ? '#BD0026' :
//            d > 10  ? '#E31A1C' :
//            d > 5  ? '#FC4E2A' :
//            d > 3  ? '#e2a7fe' : 
//            d > 1  ? '#d8fc2a' : 
//            d > 0   ? '#76fed9' : 
//                       '#FFEDA0';
// }

// // d > 3  ? '#FD8D3C' : #e2a7fe
// // d > 1  ? '#FEB24C' : #d8fc2a
// // d > 0   ? '#FED976' : #76fed9

// function style(feature) {
//   return {
//       fillColor: getColor(country_count[feature.properties.name]),
//       weight: 2,
//       opacity: 1,
//       color: 'white',
//       dashArray: '3',
//       fillOpacity: 0.7
//   };
// }
// L.geoJson(geoShapes, {style:style}).addTo(myMap);
// // });
// // // Grab the data with d3
// // d3.json(url, function(data) {

// // Create a new marker cluster group
// // var markers = L.markerClusterGroup();
// locate = [];

// for (var i = 0; i < data.country.length; i++) {
//   var lat = data.latitude[i];
//   var lng = data.longitude[i];

//   locate[lat,lng]
//   // lat_lngs = zip(lats, lngs)
  
//   console.log(lng);
//   console.log(lat);
//   console.log(locate) 

// // Check for location property
//   if (locate) {

//     // markers.addLayer(
//       L.circleMarker(
  

//     [lat, lng],{radius:2})
//     .bindPopup(data.rider_name[i] + "<img width=50 src = https://i.pinimg.com/originals/05/8d/07/058d0703a96cc9f6cf669bc6017aa4bf.gif alt=testing />" + " rank -- " + data.final_ranking[i] ).addTo(myMap);
//     console.log([i])
//     console.log(data.rider_name[i])
//   }
 
// }
// // Add our marker cluster layer to the map
// // myMap.addLayer(markers);
// });




//1st part
// markers.addLayer(L.circleMarker([lat, lng],{radius:2}).addTo(myMap).bindPopup("<h4> " + data.rider_name  + data.country + "</h4><hr><h5>" + data.final_ranking[i] + "</h5>"  ));   


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


country_count = data.country_count;
console.log(country_count);
country_name = geoShapes.features[4].properties.name;

// country_counts = country_count[country_name];

// console.log(country_counts);

function getColor(d, e = 0){

return d > 25 ? '#800026' :
         d > 15  ? '#BD0026' :
         d > 10  ? '#E31A1C' :
         d > 5  ? '#FC4E2A' :
         d > 3  ? '#e2a7fe' : 
         d > 1  ? '#d8fc2a' : 
         d > 0   ? '#76fed9' : 
                    '#FFEDA0';
}

// d > 3  ? '#FD8D3C' : #e2a7fe
// d > 1  ? '#FEB24C' : #d8fc2a
// d > 0   ? '#FED976' : #76fed9

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
});


  
