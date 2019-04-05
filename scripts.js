//Map generation-----------------------------------------------------


var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  
// Perform a GET request to the query URL
d3.json(url, function(data) {
// Once we get a response, send the data.features object to the createFeatures function

createFeatures(data.features);

});

function getColor(num) {
    return num > 100 ? '#800026' :
           num > 50  ? '#BD0026' :
           num > 20  ? '#E31A1C' :
           num > 10  ? '#FC4E2A' :
           num > 5   ? '#FD8D3C' :
           num > 3   ? '#FEB24C' :
           num > 1   ? '#FED976' :
                      '#FFEDA0';
}

// fauxCountries = {

//     "United States": {
//         count:3,
//         riders:[
//             "John","Sam","Bill"
//         ]
//     },
//     "France": {
//         count:5,
//         riders:[
//             "Pierre","Michel", "Raoul","Paulo","Jean-Claude"
//         ]
//     }

// };
//get the keys or the array depending on format of JSON
//let allCountryArray = geoJSONdata.features.map(x => x.properties.name);
//this will update the geoJSON to include riderCount as a property  
function updateGeoJSON(geoJSONdata){
    
    //console.log(geoJSONdata.features[0].properties.name);
    
    let allCountryArray = geoJSONdata.features.map(x => x.properties.name);

    let riderCountries = ["Afghanistan","Albania", "Argentina"];

    //geoJSONata.map(function to return nil or updated rider count as new property)
    function addRiderCount(val){

        var riderIndex = allCountryArray.indexOf(val);
        
        if(riderIndex + 1){
            
            //console.log(riderIndex);
            
            geoJSONdata.features[riderIndex].properties.riderCount = 3;

            return;
        }

        return;
    }

    riderCountries.map(addRiderCount);
    
    var updatedJSON = geoJSONdata;

    return updatedJSON;

}

//var newJSON = updateGeoJSON(geodata);

//--------------------------------------------------------------------

function createFeatures(earthquakeData) {

// Define a function we want to run once for each feature in the features array
// Give each feature a popup describing the place and time of the earthquake
function onEachFeature(feature, layer) {
  layer.bindPopup("<h3>" + feature.properties.place +
    "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
}

// Create a GeoJSON layer containing the features array on the earthquakeData object
// Run the onEachFeature function once for each piece of data in the array
var earthquakes = L.geoJSON(earthquakeData, {
  onEachFeature: onEachFeature
});

// Sending our earthquakes layer to the createMap function
createMap(earthquakes);
}

function createMap(earthquakes) {

// Define streetmap and darkmap layers
var outdoor_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// var mapboxAccessToken = {your access token here};
// var map = L.map('map').setView([37.8, -96], 4);

// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapboxAccessToken, {
//     id: 'mapbox.light',
//     attribution: ...
// }).addTo(map);

//L.geoJson(geoShapes).addTo(map);


// Define a baseMaps object to hold our base layers
var baseMaps = {
  "Outdoor Map": outdoor_map,
  //"Dark Map": darkmap
};

// Create overlay object to hold our overlay layer
var overlayMaps = {
  Earthquakes: earthquakes
};

// Create our map, giving it the outdoor map and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    38.642763, -98.327818
  ],
  zoom: 4,
  layers: [outdoor_map, earthquakes]
});

L.geoJson(geoShapes).addTo(myMap);

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);
}





let xAxisStages = [1,2,3,4];
    
    let yAxisPlaces = [1,2,3,4];
     
    let playerOne = [2,3,4,1];
     
    let playerTwo = [4,2,1,3]

    
var trace1 = {
  x: xAxisStages,
  y: playerOne,
  mode:'lines+markers',
  marker:{
    color: 'rgb(128, 0, 128)',
    size: 16
  },
  line:{
    color: 'rgb(128, 0, 128)',
    width: 4,
    shape:'spline'
  },
  text: "player one",
  name: "player one",
  //type: "line"
};


var trace2 = {
  x: xAxisStages,
  y: playerTwo,
  mode:'lines+markers',
  marker:{
    color: 'rgb(40, 0, 128)',
    size: 16
  },
  line:{
    color: 'rgb(80, 25, 94)',
    width: 4,
    shape: 'hv'
  },
  text: "player two",
  name: "player two",
  //type: "line"
};

// Combining both traces
var data = [trace1, trace2];

// Apply the group barmode to the layout
var layout = {
  title: "Place Stage by Stage",
  //barmode: "group"
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data, layout);
  
/*
- Example below groups data into objects by year, then passes that into the plot function as the slider value changes
- In our case, we could simply group traces by stage, then pass them into the plot function as the slider value changes

Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function (err, data) {
  // Create a lookup table to sort and regroup the columns of data,
  // first by year, then by continent:
  var lookup = {};
  function getData(year, continent) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {;
      byYear = lookup[year] = {};
    }
	 // If a container for this year + continent doesn't exist yet,
	 // then create one:
    if (!(trace = byYear[continent])) {
      trace = byYear[continent] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

  // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.year, datum.continent);
    trace.text.push(datum.country);
    trace.id.push(datum.country);
    trace.x.push(datum.lifeExp);
    trace.y.push(datum.gdpPercap);
    trace.marker.size.push(datum.pop);
  }

  // Get the group names:
  var years = Object.keys(lookup);
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  var firstYear = lookup[years[0]];
  var continents = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < continents.length; i++) {
    var data = firstYear[continents[i]];
	 // One small note. We're creating a single trace here, to which
	 // the frames will pass data for the different years. It's
	 // subtle, but to avoid data reference problems, we'll slice
	 // the arrays to ensure we never write any new data into our
	 // lookup table:
    traces.push({
      name: continents[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 200000
      }
    });
  }

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  var frames = []; //so my loop would be stages.length for stage
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: continents.map(function (continent) { //could generate sliced data on the fly, only for stage 1,1-2,1-3,etc.
        return getData(years[i], continent);
      })
    })
  }

  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  var sliderSteps = []; //this is pretty straightforward, just use stages instead of years
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    xaxis: {
      title: 'Life Expectancy',
      range: [30, 85]
    },
    yaxis: {
      title: 'GDP per Capita',
      type: 'log'
    },
    hovermode: 'closest',
	 // We'll use updatemenus (whose functionality includes menus as
	 // well as buttons) to create a play button and a pause button.
	 // The play button works by passing `null`, which indicates that
	 // Plotly should animate all frames. The pause button works by
	 // passing `[null]`, which indicates we'd like to interrupt any
	 // currently running animations with a new list of frames. Here
	 // The new list of frames is empty, so it halts the animation.
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 300},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
	 // Finally, add the slider and use `pad` to position it
	 // nicely next to the buttons.
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };

  // Create the plot:
  Plotly.plot('myDiv', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});

*/