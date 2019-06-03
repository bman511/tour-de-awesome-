function buildCharts(type) {
  // Fetch the result type selected for the plots

  /*=========Build a box plot ==============*/
  var url = `/speeds/${type}`;

  d3.json(url).then(function(response)  {

    var data = [];
    var traces = [];
    response.forEach(data => {
      if (data.type=="Flat stage") {
        var color = "#56dd3b"
      }
      else if (data.type=="Mountain stage") {
        var color = "#da36e2"
      }
      else if (data.type=="Team time trial" || data.type=="Individual time trial") {
        var color = "#3956db"
      }
      else {
        var color = "#ecf93e"
      }

      var trace = {
        y: data.data.speed,
        orientation:"v",
        width:0.8,
        hovertext: data.data.rider,
        hoverlabel:{bgcolor:color},
        hoverinfo:"y+text",
        type: 'box',
        name: data.stage,
        boxpoints: 'all',
        jitter: 1,
        pointpos: 0,
        whiskerwidth: 0.2,
        fillcolor: color,
        marker: {
            size: 7,
            color: color,
            opacity:0.8,
            outliercolor: "rgb(255, 2, 10)",
            line: {
              color:"#222",
              width:1,
              outliercolor: "rgb(255, 2, 10)",
              outlierwidth: 0.2
            },
          },
        line: {
            width: 1,
            color: "#000"
             }
      }
      traces.push(trace)
    });

  var layout = {
      title: '2018 Tour de France Speeds by Stage',
      xaxis: {
      showgrid: true,
      dtick:1,
      zeroline: false,
      tickangle: 45,
      showticklabels: true
    },
      yaxis: {
          autorange: true,
          showgrid: true,
          dtick: 5,
          gridcolor: 'rgb(66,66,66)',
          gridwidth: 1,
          zeroline: false
      },
      margin: {
          l: 80,
          r: 30,
          b: 80,
          t: 100
      },
      paper_bgcolor: 'white',
      plot_bgcolor: 'white',
      showlegend: false};
  Plotly.newPlot('box', traces, layout);
  //===================
  });
}
//
function init() {
  // Grab a reference to the select element
  var selector = d3.select("#selType");
    var firstSelection = 1;
    buildCharts(firstSelection);
  };

function optionChanged(newType) {
  //Fetch the selection and build plot with value
  buildCharts(newType);
}

init();
