// URL GRABBER -----------------------------------------------------------------
const getUrlSuffix = url => {
  let suffix;
  if (url.includes("?")) {
    suffix = url.split("?")[1];
  } else {
    suffix = "BTC=1&ETH=1&XRP=1&LTC=1&BCH=1&EOS=1&BNB=1&BSV=1&USDT=1&XLM=1&ADA=1&TRX=1&XMR=1&DASH=1&MIOTA=1&NEO=1&ETC=1&XTZ=1&XEM=1&MKR=1&ONT=1&ZEC=1&LINK=1&BTG=1&BAT=1&DOGE=1&QTUM=1&OMG=1&BTT=1&DCR=1&TUSD=1&HOT=1&LSK=1&WAVES=1&RVN=1&BCD=1&NANO=1&NPXS=1&ZIL=1&ZRX=1&REP=1&KMD=1&ICX=1&BCN=1&BTM=1&BTS=1&HT=1&DGB=1&DENT=1&AE=1&XVG=1&IOST=1&SC=1&ETP=1&MONA=1&STEEM=1&THETA=1&ENJ=1&ELF=1&ARDR=1&SNT=1&MCO=1&GNT=1&XIN=1&NAS=1&NULS=1&ZEN=1&ARK=1&DGD=1&LOOM=1";
  }
  return suffix;
};
// converts params string to userPortfolio object
const convertUrlSuffix = urlSuffix => {
  let coins = urlSuffix.split("&");
  let result = [];
  coins.forEach(coin => {
    name = coin.split("=")[0];
    quantity = parseFloat(coin.split("=")[1]);
    result.push({name: name, quantity: quantity});
  });
  return result
};





// API CALL --------------------------------------------------------------------
const alternativeMeApiCall = () => {
  // console.log("...starting api call");
  // const proxyurl = "https://cors-anywhere.herokuapp.com/";
  // const url = 'https://api.alternative.me/v2/ticker/?limit=1000';
  // fetch(proxyurl + url)
  // FOR DEVELOPMENT
  console.log("...starting (fake) development api call");
  const url = window.location.href.split(':8080')[0] + ':8080/crypto-mockup-data.json';
  fetch(url)
  .then((resp) => resp.json())
  .then(function(result) {
    allCoins = Object.values(result.data);
    allCoins = allCoins.map(coin => buildCoin(coin));
    portfolioValue.innerText = `${normalizeValue(computePortfolioValue())} $`;
    buildCoinCards(allCoins);
  })
  .catch(function(error){
    console.log("catching error...");
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
const computePortfolioValue = () => {
  userPortfolio.forEach((userCoin) => {
    let targetCoin = allCoins.find(item => item.symbol === userCoin.name);
    portfolioValueFloat += userCoin.quantity * targetCoin.price;
  });
  return portfolioValueFloat;
};





// NORMALIZER HELP FUNCTIONS----------------------------------------------------
const normalizeValue = (totalValue) => {
  return totalValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
};
const normalizePercentage = (val) => {
  return Math.round(val);
};
const normalizePrice = (price) => {
  if (price < 0.01) {
    return price.toFixed(6)
  } else if (price < 0.1) {
    return price.toFixed(5)
  } else if (price < 0.1) {
    return price.toFixed(4)
  } else {
    return price.toFixed(2)
  }
};





// BUILD CARDS -----------------------------------------------------------------
const buildCoinCards = coins => userPortfolio.forEach(userCoin => buildCoinCard(userCoin, coins));
const buildCoinCard  = (userCoin, coins) => {
  const target         = coins.find(element => element.symbol === userCoin.name);
  const svgPath        = `images/svg/color/${target.symbol.toLowerCase()}.svg`;
  const percentage     = `${normalizePercentage(target.price * 100 * userCoin.quantity / portfolioValueFloat)}%`;
  const coinName       = target.name;
  const coinPrice      = `${normalizePrice(target.price)} $`;
  const holdingsValue  = `${normalizeValue(target.price * userCoin.quantity)} $`;
  const holdingsAmount = `${userCoin.quantity} ${target.symbol}`;
  const innerHTML = `
    <div class="coin-card">
      <div class="icon">
        <div class="icon-flex">
          <img src="${svgPath}" alt="">
          <div class="percentage">${percentage}</div>
        </div>
      </div>
      <div class="coin-info">
        <p class="coin-name">${coinName}</p>
        <p class="coin-price">${coinPrice}</p>
      </div>
      <div class="holdings-info">
        <p class="holdings-value">${holdingsValue}</p>
        <p class="holdings-amount">${holdingsAmount}</p>
      </div>
    </div>
  `;
  coinCardsContainer.insertAdjacentHTML("beforeend", innerHTML);
};





// SCRIPT START ----------------------------------------------------------------
// Say Hello
console.log("TRIGGERED: alternativeMeApiCallService");

// // load needed DOM elements
const coinCardsContainer = document.querySelector('.coin-cards-container');
const portfolioValue = document.getElementById('portfolio-value');
// // get data from URL
let urlSuffix = getUrlSuffix(document.URL);
let userPortfolio = convertUrlSuffix(urlSuffix);
let allCoins;
let portfolioValueFloat = 0.0;

// make API call
alternativeMeApiCall();

