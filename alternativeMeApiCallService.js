// URL GRABBER -----------------------------------------------------------------
const getUrlSuffix = url => {
  console.log("URL:");
  console.log(url);
  let suffix;
  if (url.includes("?")) {
    suffix = url.split("?")[1];
  } else {
    suffix = "BTC=1&ETH=1&XRP=1&LTC=1&BCH=1&EOS=1&BNB=1&BSV=1&USDT=1&XLM=1&ADA=1&TRX=1&XMR=1&DASH=1&MIOTA=1&NEO=1&ETC=1&XTZ=1&XEM=1&MKR=1&ONT=1&ZEC=1&LINK=1&BTG=1&BAT=1&DOGE=1&QTUM=1&OMG=1&BTT=1&DCR=1&TUSD=1&HOT=1&LSK=1&WAVES=1&RVN=1&BCD=1&NANO=1&NPXS=1&ZIL=1&ZRX=1&REP=1&KMD=1&ICX=1&BCN=1&BTM=1&BTS=1&HT=1&DGB=1&DENT=1&AE=1&XVG=1&IOST=1&SC=1&ETP=1&MONA=1&STEEM=1&THETA=1&ENJ=1&ELF=1&ARDR=1&SNT=1&MCO=1&GNT=1&XIN=1&NAS=1&NULS=1&ZEN=1&ARK=1&DGD=1&LOOM=1";
  }
  console.log("SUFFIX:");
  console.log(suffix);
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
// GET ALL COINS CODE SNIPPET
// const url = window.location.href.split(':8080')[0] + ':8080/crypto-mockup-data.json';
// fetch(url)
// .then((resp) => resp.json())
// .then(function(result) {
//   console.log(result);
//   let coins = Object.values(result.data);
//   coins = coins.map(coin => `${coin.symbol}=1`);
//   console.log(coins.join("&"));
// })





// API CALL --------------------------------------------------------------------
const alternativeMeApiCall = () => {
  console.log("...starting api call");
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = 'https://api.alternative.me/v2/ticker/?limit=1000';
  fetch(proxyurl + url)
  // FOR DEVELOPMENT
  // const url = window.location.href.split(':8080')[0] + ':8080/crypto-mockup-data.json';
  // fetch(url)
  .then((resp) => resp.json())
  .then(function(result) {
    let coins = Object.values(result.data);
    coins = coins.map(coin => buildCoin(coin));
    console.log("coins loaded:");
    console.log(coins);
    createCoinCards(coins);
    computePortfolioValue(coins);
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
const computePortfolioValue = (coins) => {
  console.log("HI");
  console.log(coins);
  console.log(userPortfolio);
  let portfolioValue = 0;
  userPortfolio.forEach((userCoin) => {
    console.log(userCoin);
  });
};





// BUILD CARDS -----------------------------------------------------------------
const normalizeValue = (totalValue) => {
  return totalValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'")
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
const createCoinCards = (coins) => {
  console.log("user portfolio working:");
  console.log(userPortfolio);
  // for each userPortfolio -> find data from fetched coins array
  userPortfolio.forEach((userCoin) => {
    console.log(userCoin);
    // create card
    const coinCard = createCoinCard(userCoin, coins);
    // append card to container
  });
  // });
};
const createCoinCard = (userCoin, coins) => {
  console.log(`userCoin: ${userCoin.quantity} ${userCoin.name}`);
  let target = coins.find((element) => {
    return element.symbol === userCoin.name;
  });
  // TARGET
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
  const coinCard = document.createElement('div');
  coinCard.classList.add("coin-card");

  //----------------------
  // create icon div
  const icon = document.createElement('div');
  icon.classList.add("icon");
  //   create icon-flex div
  const iconFlex = document.createElement('div');
  iconFlex.classList.add("icon-flex");
  //     create img
  const img = document.createElement('img');
  img.src = `images/svg/color/${target.symbol.toLowerCase()}.svg`
  //     create percentage div
  const percentage = document.createElement('div');
  percentage.classList.add("percentage");
  percentage.innerText = `${Math.floor(Math.random()*80)}%`;

  //----------------------
  // create coin-info div
  const coinInfo = document.createElement('div');
  coinInfo.classList.add("coin-info");
  //   create coin-name p
  const coinName = document.createElement('p');
  coinName.classList.add("coin-name");
  coinName.innerText = target.name;
  //   create coin-price p
  const coinPrice = document.createElement('p');
  coinPrice.classList.add("coin-price");
  coinPrice.innerText = `${normalizePrice(target.price)} $`;

  //----------------------
  // create holdings-info div
  const holdingsInfo = document.createElement('div');
  holdingsInfo.classList.add("holdings-info");
  //   create holding-value p
  const holdingsValue = document.createElement('p');
  holdingsValue.classList.add("holdings-value");
  holdingsValue.innerText = `${normalizeValue(target.price * userCoin.quantity)} $`;
  //   create holding-amount p
  const holdingsAmount = document.createElement('p');
  holdingsAmount.classList.add("holdings-amount");
  holdingsAmount.innerText = `${userCoin.quantity} ${target.symbol}`;

  // append
  iconFlex.appendChild(img);
  iconFlex.appendChild(percentage);
  icon.appendChild(iconFlex);

  coinInfo.appendChild(coinName);
  coinInfo.appendChild(coinPrice);

  holdingsInfo.appendChild(holdingsValue);
  holdingsInfo.appendChild(holdingsAmount);

  coinCard.appendChild(icon);
  coinCard.appendChild(coinInfo);
  coinCard.appendChild(holdingsInfo);

  coinCardsContainer.appendChild(coinCard);
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

// make API call
alternativeMeApiCall();

// update portfolio value
portfolioValue.innerText = `Portfolio Value: ${12000} $`
