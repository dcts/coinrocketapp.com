// URL GRABBER -----------------------------------------------------------------
const getUrlSuffix = url => {
  let suffix = url.split("?")[1];
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
  console.log("...starting api call");
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = 'https://api.alternative.me/v2/ticker/?limit=1000';
  // const url = 'http://127.0.0.1:8080/crypto-mockup-data.json'; // FOR DEVELOPMENT
  // fetch(url)
  fetch(proxyurl + url)
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
  percentage.innerText = "29%";

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

// // get data from URL
let urlSuffix = getUrlSuffix(document.URL);
let userPortfolio = convertUrlSuffix(urlSuffix);

// make API call
alternativeMeApiCall();






