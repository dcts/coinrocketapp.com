function length(obj) {
  return Object.keys(obj).length;
}

// Method to check if element exists in array
Array.prototype.contains = function(obj) {
  var i = this.length;
  while (i--) {
    if (this[i] == obj) {
      return true;
    }
  }
  return false;
}

// STARTING SCRIPT HERE
console.log("starting..");
const ul = document.getElementById("cryptos");
const p = document.getElementById("log");
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = 'https://api.alternative.me/v2/ticker/?limit=1000';

fetch(proxyurl + url)
.then((resp) => resp.json())
.then(function(data) {
  let cryptos = data.results;
  // // DEBUGGING
  // console.log(data.data);
  // console.log(length(data.data));
  // console.log(data.data[1].name);
  // console.log(data.data[1].quotes.USD.price);
  let logMsg = `${length(data.data)} cryptocurrencies loaded`
  document.getElementById("log").innerHTML = logMsg;

  let chosenCryptosIds = [1, 1027, 2682, 328, 1720 ,2603, 2137];
  /* 1      BTC
   * 1027   ETH
   * 2682   HOT
   * 328    XMR
   * 1720   IOTA
   * 2603   Pundi X
   * 2137   ELECTRONEUM
   */
  for (item in data.data) {
    let name = data.data[item].name;
    let price = data.data[item].quotes.USD.price;
    console.log(`${name}: ${price} $`);
    let span = document.createElement('span');
    let li = document.createElement('li');
    span.innerHTML = `${name}: ${price} $`;
    li.appendChild(span);
    if (chosenCryptosIds.contains(item)) {
      var att = document.createAttribute("class");     // Create a "class" attribute
      att.value = "visible";                           // Set the value of the class attribute
      li.setAttributeNode(att);
    }
    ul.appendChild(li);
  }
})
.catch(function(error){
  console.log(JSON.stringify(error));
});
