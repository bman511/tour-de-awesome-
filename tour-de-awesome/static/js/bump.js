
//     var data = [
//         {
//           "country": "Great Britain",
//           "name": "Chris Froome",
//           "performance": {
//             "rank": [
//               91,
//               76,
//               18,
//               17,
//               15,
//               14,
//               14,
//               12,
//               8,
//               6,
//               2,
//               2,
//               2,
//               2,
//               2,
//               2,
//               3,
//               3,
//               4,
//               3,
//               3
//             ],
//             "stages": [
//               1,
//               2,
//               3,
//               4,
//               5,
//               6,
//               7,
//               8,
//               9,
//               10,
//               11,
//               12,
//               13,
//               14,
//               15,
//               16,
//               17,
//               18,
//               19,
//               20,
//               21
//             ]
//           },
//           "rider_id": 1
//         },
//         {
//           "country": "Great Britain",
//           "name": "Geraint Thomas",
//           "performance": {
//             "rank": [
//               15,
//               6,
//               3,
//               3,
//               4,
//               2,
//               2,
//               2,
//               2,
//               2,
//               1,
//               1,
//               1,
//               1,
//               1,
//               1,
//               1,
//               1,
//               1,
//               1,
//               1
//             ],
//             "stages": [
//               1,
//               2,
//               3,
//               4,
//               5,
//               6,
//               7,
//               8,
//               9,
//               10,
//               11,
//               12,
//               13,
//               14,
//               15,
//               16,
//               17,
//               18,
//               19,
//               20,
//               21
//             ]
//           },
//           "rider_id": 8
//         }
//     ];


//     let xAxisStages = [1,2,3,4];

//     let yAxisPlaces = [1,2,3,4];

//     let playerOne = [2,3,4,1];

//     let playerTwo = [4,2,1,3]


// var trace1 = {
//   x: xAxisStages,
//   y: playerOne,
//   mode:'lines+markers',
//   marker:{
//     color: 'rgb(128, 0, 128)',
//     size: 16
//   },
//   line:{
//     color: 'rgb(128, 0, 128)',
//     width: 4,
//     shape:'spline'
//   },
//   text: "player one",
//   name: "player one",
//   //type: "line"
// };


// var trace2 = {
//   x: xAxisStages,
//   y: playerTwo,
//   mode:'lines+markers',
//   marker:{
//     color: 'rgb(40, 0, 128)',
//     size: 16
//   },
//   line:{
//     color: 'rgb(80, 25, 94)',
//     width: 4,
//     shape: 'hv'
//   },
//   text: "player two",
//   name: "player two",
//   //type: "line"
// };

d3.json("/bump_data",function(data){

  function makeTrace(rider){

    let trace = {

      x:rider.performance.stages,
      y:rider.performance.rank,
      mode:'lines+markers',
      marker:{
        color: 'rgb(128, 0, 128)',
        size: 8
      },
      line:{
        color: 'rgb(128, 0, 128)',
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
    title: "Place Stage by Stage",
  //barmode: "group"
  };

// Render the plot to the div tag with id "plot"
  Plotly.newPlot("bump", trace_arr, layout);
});
