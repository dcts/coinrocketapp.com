// URL GRABBER -----------------------------------------------------------------
const getUrlSuffix = url => {
  let suffix = url.split("?")[1];
  return suffix;
};
// converts params string to object
const convertUrlSuffix = urlSuffix => {
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
};
const createCoinCards = coins => {

};
const createCoinCard = coin => {

};





// API CALL --------------------------------------------------------------------
const alternativeMeApiCall = () => {
  console.log("...starting api call");
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = 'https://api.alternative.me/v2/ticker/?limit=1000';
  fetch(proxyurl + url)
  .then((resp) => resp.json())
  .then(function(result) {
    let coins = Object.values(result.data);
    coins = coins.map(coin => buildCoin(coin));
  })
  .catch(function(error){
    console.log(JSON.stringify(error));
  });
}
// coin factory function
const buildCoin = (coin) => {
  return {
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    price: coin.quotes["USD"].price,
    change7d: coin.quotes["USD"].percentage_change_7d,
    change24h: coin.quotes["USD"].percentage_change_24h
  }
};





// SCRIPT START ----------------------------------------------------------------
// Say Hello
console.log("TRIGGERED: alternativeMeApiCallService");

// get data from URL


// make API call
alternativeMeApiCall();

// load needed DOM elements





