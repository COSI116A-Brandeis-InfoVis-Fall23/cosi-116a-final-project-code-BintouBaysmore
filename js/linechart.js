// dimensions
var margin = { top: 70, right: 30, bottom: 40, left: 80 };
var width = 1200 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// x and y scales
const x = d3.scaleBand().range([0, width]).padding(0.1);
const y = d3.scaleLinear().range([height, 0]);

// SVG element
const svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load and Process data
d3.json("../data/Stations.json", function (error, data) {
  if (error) {
    console.error("Error loading JSON:", error);
    return;
  }

  // Sort data by a relevant attribute (e.g., stop_name)
  data.sort((a, b) => d3.ascending(a.stop_name, b.stop_name));

  // x domain
  x.domain(data.map(d => d.stop_name));

  // y domain
  y.domain([0, d3.max(data, d => d.average_flow)]);

  // create line generator
  const line = d3.line()
    .x(d => x(d.stop_name) + x.bandwidth() / 2)
    .y(d => y(d.average_flow));

  // add the line path
  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1)
    .attr("d", line);

  // Add X-axis
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("transform", "rotate(-45)");

  // Add Y-axis
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add Y-axis label
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-size", "14px")
    .style("fill", "#777")
    .style("font-family", "sans-serif")
    .text("Average Flow");

  // Add the chart title
  svg
    .append("text")
    .attr("class", "chart-title")
    .attr("x", margin.left - 115)
    .attr("y", margin.top - 100)
    .style("font-size", "24px")
    .style("font-weight", "bold")
    .style("font-family", "sans-serif")
    .text("Average Flow by Stop");
});