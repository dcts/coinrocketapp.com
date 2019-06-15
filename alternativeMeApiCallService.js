// URL GRABBER -----------------------------------------------------------------
const getUrlSuffix = url => {
  let suffix = url.split("?")[1];
  return suffix;
};
// converts params string to userPortfolio object
const convertUrlSuffix = urlSuffix => {
  let coins = urlSuffix.split("&");
  let result = {};
  coins.forEach(coin => {
    name = coin.split("=")[0];
    quantity = coin.split("=")[1];
    result[name] = parseFloat(quantity);
  });
  return result
};





// API CALL --------------------------------------------------------------------
const alternativeMeApiCall = () => {
  console.log("...starting api call");
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // const url = 'https://api.alternative.me/v2/ticker/?limit=1000';
  const url = 'http://127.0.0.1:8080/crypto-mockup-data.json'; // FOR DEVELOPMENT
  fetch(url)
  .then((resp) => resp.json())
  .then(function(result) {
    let coins = Object.values(result.data);
    coins = coins.map(coin => buildCoin(coin));
    console.log("coins loaded:");
    console.log(coins);
    createCoinCards(coins);
  })
  .catch(function(error){
    console.log("catching...");
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





// BUILD CARDS -----------------------------------------------------------------
const createCoinCards = (coins) => {
  console.log("user portfolio working:");
  console.log(userPortfolio);
  // for each userPortfolio -> find data from fetched coins array
  // userPortfolio.forEach((userCoin) => {
  //   // create card
  //   console.log(userCoin);
  //   const coinCard = createCoinCard(userCoin, coins);
  //   // append card to container

  // });
};
const createCoinCard = (userCoin, coins) => {
  console.log(`userCoin: ${userCoin}`);
  coins.find((element) => {
    // return element.symbol === userCoin.;
  });
  // console.log(`Coin: ${userCoin.name}`);

  // <div class="coin-card">
  //   <div class="icon">
  //     <div class="icon-flex">
  //       <img src="images/btc.svg" alt="">
  //       <div class="percentage">74%</div>
  //     </div>
  //   </div>
  //   <div class="coin-info">
  //     <p class="coin-name">Bitcoin</p>
  //     <p class="coin-price">7'256.20 €</p>
  //   </div>
  //   <div class="holdings-info">
  //     <p class="holdings-value">36'281.20 €</p>
  //     <p class="holdings-amount">5 BTC</p>
  //   </div>
  // </div>

  // create coin-card div

  // create icon div
  //   create icon-flex div
  //     create img
  //     create percentage div

  // create coin-info div
  //   create coin-name p
  //   create coin-price p

  // create holdings-info div
  //   create holding-value p
  //   create holding-amount p

  // append
};






// SCRIPT START ----------------------------------------------------------------
// Say Hello
console.log("TRIGGERED: alternativeMeApiCallService");

// // load needed DOM elements
// const coinCardsContainer = document.querySelector('.coin-cards-container');

// // get data from URL
let urlSuffix = getUrlSuffix(document.URL);
let userPortfolio = convertUrlSuffix(urlSuffix);

// make API call
alternativeMeApiCall();






