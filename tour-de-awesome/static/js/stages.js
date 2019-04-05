function buildTable(stage) {
  // Change the heading message
// Populate the table
  var url = `/summary`;
  var tbody = d3.select("tbody");
  tbody.html("");
  d3.json(url).then(function(data)  {
    var date = new Date();
    var options = { year: 'numeric', month: 'short', day: '2-digit'};
      for (var i = 0; i < data.length; i++) {
          var row = tbody.append("tr");
          cell1 = row.append("td");
          cell1.text(`Stage ${data[i].stage}`)
          cell2 = row.append("td");
          cell2.text(data[i].date.split("00:00:00 GMT", 1));
          cell3 = row.append("td");
          cell3.text(data[i].start)
          cell4 = row.append("td");
          cell4.text(data[i].finish);
          cell5 = row.append("td");
          cell5.text(`${data[i].distance} km`)
          cell6 = row.append("td");
          if (data[i].type == "Flat stage") {
            cell6.html("<img src='../static/images/004-work-tools.svg'  width=50em height=50em class='filter-green'/><br />")
          }
          else if (data[i].type == "Team time trial" || data[i].type == "Individual time trial"){
            cell6.html("<img src='../static/images/003-bicycle.svg'  width=50em height=50em class='filter-blue'/><br />")
          }
          else if (data[i].type == "Mountain stage") {
            cell6.html("<img src='../static/images/002-mountains.svg'  width=50em height=50em class='filter-pink'/><br />")
          }
          else if (data[i].type == "Hilly stage") {
            cell6.html("<img src='../static/images/001-hills.svg'  width=50em height=50em class='filter-yellow'/><br />")
          }
      }; //end of forEach 1
    });
};

function init() {
    buildTable();
}
init();
