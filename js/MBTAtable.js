/* global D3 */

function mbtatable() {

    // Based on Mike Bostock's margin convention
    // https://bl.ocks.org/mbostock/3019563
    let ourBrush = null,
      selectableElements = d3.select(null),
      dispatcher;
  
    // Variable to help with brushing and keep track of mouse state
    let isMouseDown;
  
    // Create the chart by adding an svg to the div with the id 
    // specified by the selector using the given data
    function chart(selector, data) {
      let table = d3.select(selector)
        .append("table")
          .classed("my-table", true);
  
      // Here, we grab the labels of the first item in the dataset
      // and store them as the headers of the table.
      let tableHeaders = Object.keys(data[0]);
  
      // Append headers to the <table> element as <th> objects inside a <thead>
      let thead = table.append('thead');
      thead.append('tr')
        .selectAll('th')
        .data(["Station Name", "Average Flow"])
        .enter()
        .append('th')
        .text((d) => d);
  
      // Add a row for each row of the data within a <tbody>
      let tbody = table.append('tbody');

      let rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");
  
      // Add a cell for each piece of data in the row
      let cells = rows.selectAll("td")
    .data((row) => {
      return [
        { column: "station_name", value: row.stop_name },
        { column: "average_flow", value: row.average_flow }
      ];
    })
    .enter()
    .append("td")
    .text((d) => d.value);

  

      // Code to allow for brushing

      // When the mouse is pressed and over the elements, it will select that data and tell the dispatcher accordingly
      d3.selectAll("tr")
        .on("mouseover", (d, i, elements) => {
          if (isMouseDown) {
            d3.select(elements[i]).classed("selected", true);
            let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
            dispatcher.call(dispatchString, this, table.selectAll(".selected").data()); // Call dispatcher to tell the other visualizations what to highlight
            d3.event.preventDefault();
          }
        })
  
        // Mouse is released, so no more data can be selected without resetting 
        .on("mouseup", (d, i, elements) => {
          isMouseDown = false; // As long as isMouseDown is true, it will continue adding whatever the mouse is over
        })
  
        // If clicked again, resets the selected elements 
        .on("mousedown", (d, i, elements) => {
          d3.selectAll(".selected").classed("selected", false); // All the previously selected data gets reset 
          isMouseDown = true;
          d3.select(elements[i]).classed("selected", true);
          let dispatchString = Object.getOwnPropertyNames(dispatcher._)[0];
          dispatcher.call(dispatchString, this, table.selectAll(".selected").data());
          d3.event.preventDefault();
        });
  
      return chart;
    }
  
    // Gets or sets the dispatcher we use for selection events
    chart.selectionDispatcher = function (_) {
      if (!arguments.length) return dispatcher;
      dispatcher = _;
      return chart;
    };
  
    // Given selected data from another visualization 
    // select the relevant elements here (linking)
    chart.updateSelection = function (selectedData) {
      if (!arguments.length) return;
  
      // Select an element if its datum was selected
      d3.selectAll('tr').classed("selected", d => {
        return selectedData.includes(d);
      });
      dispatcher.call("selectionUpdated", this, selectedData);
    };
  
    return chart;
  }
  