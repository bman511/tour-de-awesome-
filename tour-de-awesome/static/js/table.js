function buildTable(stage, type) {
  // Change the heading message
  var title = d3.select("#stageInfo");
  title.text("");
  if (type == 1) {
  title.text(`Stage ${stage} Results`);
  }
  else if (type==2){
  title.text(`Stage ${stage} Overall Standings`);
  }
// Populate the table
  var url = `/summary/${stage}`;
  var tbody = d3.select("tbody");
  tbody.html("");
  d3.json(url).then(function(data)  {
      stage = data.stage
        if (type == 2) {
          var outResults = data[0].overall_results
        }
        else if (type == 1) {
          var outResults = data[0].stage_results
        }
      for (var i = 0; i < outResults.rank.length; i++) {
          var row = tbody.append("tr");
          cell1 = row.append("td");
          cell1.text(outResults.rank[i])
          cell2 = row.append("td");
          cell2.text(outResults.name[i])
          cell3 = row.append("td");
          cell3.text(outResults.country[i])
          cell4 = row.append("td");
          cell4.text(outResults.team[i])
          cell5 = row.append("td");
          cell5.text(outResults.speed[i])
      }; //end of forEach 1
    });
};

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selStage");
  var title = d3.select("#stageInfo");
  title.text("Stage 1 Results")
  var stages
  // Use the list of sample names to populate the select options
  d3.json("/summary").then((data) => {
    data.forEach((item) => {
      stage = item.stage;
      selector
        .append("option")
        .text(item.stage)
        .property("value", item.stage);
    });

    // Use the first sample from the list to build the initial plots
    const firstStage = 1;
    const firstType = 1;
    buildTable(firstStage, firstType);

  });
}
function optionChanged(event, newType) {
  d3.event.preventDefault();
  var currentStage = d3.select("#selStage").property("value");
  buildTable(currentStage, newType)
}
function stageChanged(event, newStage) {
  d3.event.preventDefault();
  var currentType = d3.selectAll('input:checked').property("value");
  buildTable(newStage,currentType);
}

// Initialize the dashboard
init();
