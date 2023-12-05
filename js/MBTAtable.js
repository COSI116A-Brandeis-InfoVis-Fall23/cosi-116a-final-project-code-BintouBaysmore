d3.json("../data/Stations.json", function (error, data) {
    if (error) {
      console.error("Error loading JSON:", error);
      return;
    }
  
    // Create the table
    const table = d3.select("#table-container")
      .append("table")
      .attr("class", "table");
  
    // Create table header
    const thead = table.append("thead");
    thead.append("tr")
      .selectAll("th")
      .data(["Stop", "Total Ons", "Total Offs", "Average Flow"])
      .enter()
      .append("th")
      .text(d => d);
  
    // Create table rows
    const tbody = table.append("tbody");
    const rows = tbody.selectAll("tr")
      .data(data)
      .enter()
      .append("tr");
  
    // Populate the table
    rows.append("td").text(d => d.stop_name);
    rows.append("td").text(d => d.total_ons);
    rows.append("td").text(d => d.total_offs);
    rows.append("td").text(d => d.average_flow);
  });