// coinmarketcapScraper.js
const tableRows = document.querySelectorAll("table.summary-table tr");

const results = [];
tableRows.forEach((tableRow, indx) => {
  // console.log(tableRow);
  // console.log(indx);
  if (indx > 0) {
    const data = {
      symbol:    tableRow.querySelector(".col-symbol").innerText,
      name:      tableRow.querySelector(".currency-name-container").innerText,
      price:     parseFloat(tableRow.querySelector("td:nth-of-type(5)").dataset.sort),
      marketcap: parseFloat(tableRow.querySelector("td:nth-of-type(5)").dataset.sort),
      vol24h:    parseFloat(tableRow.querySelector("td:nth-of-type(5)").dataset.sort),
      diff1h:    parseFloat(tableRow.querySelector("td:nth-of-type(5)").dataset.sort),
      diff24h:   parseFloat(tableRow.querySelector("td:nth-of-type(5)").dataset.sort),
      diff7d:    parseFloat(tableRow.querySelector("td:nth-of-type(5)").dataset.sort),
    };
    results.push(data);
  }
});
