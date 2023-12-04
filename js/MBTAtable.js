
document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from your API or load it from a file
    fetch("../data/Stations.json")
      .then((response) => response.json())
      .then((data) => {
        // Create the table
        const table = document.createElement("table");
        table.className = "table";
  
        // Create table header
        const thead = document.createElement("thead");
        const headerRow = thead.insertRow();
        ["Stop", "Total Ons", "Total Offs", "Average Flow"].forEach((header) => {
          const th = document.createElement("th");
          th.textContent = header;
          headerRow.appendChild(th);
        });
        table.appendChild(thead);
  
        // Create table body
        const tbody = document.createElement("tbody");
        data.forEach((row) => {
          const tr = document.createElement("tr");
          ["stop_name", "total_ons", "total_offs", "average_flow"].forEach((key) => {
            const td = document.createElement("td");
            td.textContent = row[key];
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
  
        // Append the table to the container with id "table-container"
        const tableContainer = document.getElementById("table-container");
        tableContainer.appendChild(table);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });