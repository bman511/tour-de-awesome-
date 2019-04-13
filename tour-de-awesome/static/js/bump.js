
var url = "/bump_data";
d3.json(url).then(function(data){

  function makeTrace(rider){

    let trace = {

      x:rider.performance.stages,
      y:rider.performance.rank,
      mode:'lines+markers',
      marker:{
        size: 12
      },

      line:{
        color: $c.rand(),
        width: 4,
        shape:'spline'
      },
      text: rider.country,
      name: rider.name,

    };

    return trace;

    }


  let trace_arr = data.map(makeTrace);

// Apply the group barmode to the layout
let layout = {
  title: "Rank By Stage",
  hovermode:"closest",
  yaxis: {

  zeroline: false,
  showgrid:false,
  autotick: false,
  ticks: 'outside',
  tick0: 1,
  dtick: 10,
  ticklen: 8,
  tickcolor: '#000',

  title:{

    text: "Rank",
    font: {

      family: "Courier New, monospace",
      size: 18,
      color: "black"
    }
  },

  //range: [180,0]
  autorange: "reversed"
},
xaxis: {
  zeroline:false,
  autotick: false,
  ticks: 'outside',
  tick0: 1,
  dtick: 1,
  ticklen: 10,
  //tickwidth: 8,
  tickcolor: '#000',
  title:{

    text:"Stage",
    font: {

      family: "Courier New, monospace",
      size: 18,
      color: "black"
       }
     },
  }
};

// Render the plot to the div tag with id "plot"
  Plotly.newPlot("bump", trace_arr, layout);
});
