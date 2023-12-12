// Immediately Invoked Function Expression to limit access to our 
// variables and prevent 
((() => {

  
  const dispatchString = "selectionUpdated";

  // Create a dispatcher (d3-dispatch) for selection events
  const dispatcher = d3.dispatch(dispatchString);

  // Load the data from a JSON file
  d3.json("../data/stations.json", (data) => {

    // Create a line chart
    let lcStationFlow = linechart()
      .x(d => d.stop_name)
      .xLabel("Station Name")
      .y(d => d.average_flow)
      .yLabel("Average Flow")
      .yLabelOffset(40)
      .selectionDispatcher(dispatcher)
      ("#chart-container", data);

    // Create a table
    const tableData = mbtatable()
      .selectionDispatcher(dispatcher)
      ("#table-container", data);

    // When the line chart selection is updated via brushing, 
    // tell the table to update its selection (linking)
    lcStationFlow.selectionDispatcher().on(dispatchString, function(selectedData) {
      tableData.updateSelection(selectedData);
    });

    // When the table is updated via brushing, tell the line chart
    tableData.selectionDispatcher().on(dispatchString, function(selectedData) {
      lcStationFlow.updateSelection(selectedData);
    });
  });
})());


//DATA + VISUALIZATIONS WE DECIDED NOT TO USE ANYMORE

/*//NYC chart
var total = 156,
    buttons = document.querySelector('.buttons'),
    pie = document.querySelector('.pie'),
    activeClass = 'active';

var stations = {
  RedLine: 23,
  GreenLine : 11,
  OrangeLine: 10,
  GreenLine: 9,
  BlueLine: 69,
};

// work out percentage as a result of total
var numberFixer = function(num){
  var result = ((num * total) / 100);
  return result;
}

// create a button for each country
for(property in stations){
  var newEl = document.createElement('button');
  newEl.innerText = property;
  newEl.setAttribute('data-name', property);
  buttons.appendChild(newEl);
}

// when you click a button setPieChart and setActiveClass
  buttons.addEventListener('click', function(e){
    if(e.target != e.currentTarget){
      var el = e.target,
          name = el.getAttribute('data-name');
      setPieChart(name);
      setActiveClass(el);
    }
    e.stopPropagation();
  });

var setPieChart = function(name){
  var number = stations[name],
      fixedNumber = numberFixer(number),
      result = fixedNumber + ' ' + total;
  
  pie.style.strokeDasharray = result;
}

var setActiveClass = function(el) {
  for(var i = 0; i < buttons.children.length; i++) {
    buttons.children[i].classList.remove(activeClass);
    el.classList.add(activeClass);
  }
}

// Set up default settings
setPieChart('RedLine');
setActiveClass(buttons.children[0]);


//LINE CHART BELOW

// dimensions
var margin = {top: 70, right: 30, bottom:40, left:80};
var width =  1200- margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// x and y scales
const x = d3.scaleTime()
  .range([0, width]);
const y = d3.scaleLinear()
  .range([height, 0]);

// SVG element
const svg = d3.select("#chart-container")
  .append("svg")
    .attr("width", width + margin.left +margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 'translate(${margin.left}, ${margin.top})');

//Load and Process data 
d3.csv("Line,_and_Stop(1).csv").then(function (data) {
  const parseDate= d3.timeParse("%Y");
  data.forEach(d => {
    d.route_id= parseDate(d.route_id);
    d.average_flow =+ d.average_flow;
  });

  console.log(data)

//define the x and y domains
x.domain(d3.extent(data, d => d.route_id));
y.domain([0, d3.max(data, d => d.average_flow)]);

//create line generator
const line= d3.line()
  .x(d => x(d.route_id))
  .y(d => y(d.average_flow));

//add the line path
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "blue")
  .attr("stroke-width", 1)
  .attr("d", line);
})

// // Add Y-axis label

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.style("font-size", "14px")
.style("fill", "#777")
.style("font-family", "sans-serif")
.text("Transit Lines");

// // Add the chart title

svg.append("text")
.attr("class", "chart-title")
.attr("x", margin.left - 115)
.attr("y", margin.top - 100)
.style("font-size", "24px")
.style("font-weight", "bold")
.style("font-family", "sans-serif")
.text("MBTA transit lines"); 
  */
