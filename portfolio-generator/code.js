
function getparameter() {

    // getelementfrom

}


function getUrlSuffix(url) {
  let suffix = url.split("?")[1];
  return suffix;
}

// get string -> converts to object
function convertUrlSuffix(urlSuffix) {
  let coins = urlSuffix.split(";");
  console.log(coins);
  console.log(coins[0]);
  result = {};
  coins.forEach(coin => {
    name = coin.split("=")[0];
    quantity = coin.split("=")[1];
    result[name] = parseFloat(quantity);
    console.log(`coin: ${name}. quantity: ${quantity}`);
  });
  console.log(result);
  return result
}

function createHTMLElements(coins) {
  const ul = document.getElementById("cointable");
  for (let [key, value] of Object.entries(coins)) {
    console.log(`${key}, ${value}`);
    let span1 = document.createElement('span');
    let att = document.createAttribute("class");
    att.value = "coinname";
    span1.setAttributeNode(att);
    let att1 = document.createAttribute("class");
    att1.value = "coinname";
    span1.setAttributeNode(att);
    span1.innerHTML = key;
    let span2 = document.createElement('span');
    let att2 = document.createAttribute("class");
    att2.value = "coinquantity";
    span2.setAttributeNode(att2);
    span2.innerHTML = value;
    // append childs
    let li = document.createElement('li');
    ul.appendChild(li);
    li.appendChild(span1);
    li.appendChild(span2);
  }
  // coins.forEach(coin => {
  // });
}

// GET SUFFIX FROM URL
let urlSuffix = getUrlSuffix(document.URL);

// CONVERT SUFFIX TO JSON (coins = json with key: coinname / value: coinquantity)
let coins = convertUrlSuffix(getUrlSuffix(document.URL));

// ITERATE OVER ELEMENTS AND CREATE HTML ELEMENTS
createHTMLElements(coins);

// console.log("\n\n-----starting-----");
// const p = document.getElementById("urlcontent");


