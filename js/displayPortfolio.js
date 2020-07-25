/*
 * GRAB COINDATA FROM FIREBASE
 */
const getUserPortfolios = userId => {
  db.collection("users").doc(userId).get().then(doc => {
    if (doc.exists) {
      return doc.data();
    } else {
      console.log("No such document!");
    }
  }).catch(error => {
    console.log("Error getting document:", error);
  });
};

const loadAllCoins = () => {
  return db.collection("coins").doc("all").get().then(doc => {
    if (doc.exists) {
      allCoins = doc.data();
      allCoins.updatedAt = allCoins.updatedAt.toDate().toLocaleString();
    } else {
      console.log("No such document!");
    }
  }).catch(error => {
    console.log("Error getting document:", error);
  });
};

const getCoinData = symbol => {
  return allCoins[symbol];
};

const getUserId = () => {
  if (document.URL.split("/?user=").length === 2) {
    return document.URL.split("/?user=")[1];
  } else {
    let urlSuffix = getUrlSuffix(document.URL);
    let userPf = convertUrlSuffix(urlSuffix);
  }
};

const getUser = userId => {
  return db.collection("users").doc(getUserId()).get().then(snap => {
    return snap.data();
  })
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
  } else if (price < 1) {
    return price.toFixed(4)
  } else {
    return price.toFixed(2)
  }
};

const computePortfolioValue = (userPf, allCoins) => {
  let value = 0;
  for (var key in userPf) {
    try {
      let userCoinSymbol   = key;
      let userCoinQuantity = userPf[key];
      let targetCoin = allCoins[userCoinSymbol];
      value += userCoinQuantity * targetCoin.price;
    } catch (err) {
      console.log(err);
    }
  }
  return value;
};

const removeAllCoinCards = () => {
  document.querySelector('.coin-cards-container').innerHTML = "";
};

const sortByValue = (userPf, allCoins) => {
  console.log(Object.keys(userPf.coins));
  let result = Object.keys(userPf.coins).map(symbol => {
    data = {};
    data["symbol"] = symbol;
    try {
      data["price"] = allCoins[symbol].price;
    } catch {
      data["price"] = 0;
    }
    data["quantity"] = userPf.coins[symbol];
    data["holdingsValue"] = data["price"] * userPf.coins[symbol];
    return data;
  });
  result.sort(sortCoins);
  return result;
};

const sortCoins = (a, b) => {
  if ( a.holdingsValue > b.holdingsValue ){
    return -1;
  }
  if ( a.holdingsValue < b.holdingsValue ){
    return 1;
  }
  return 0;
};

const buildCoinCards = (userPf, allCoins) => {
  let sortedData = sortByValue(userPf, allCoins);
  let totalPfValue = userPf.totalValue;
  sortedData.forEach(data => {
    try {
      let symbol   = data.symbol;
      let quantity = data.quantity;
      buildCoinCard(symbol, quantity, totalPfValue, allCoins[symbol]);
    } catch (err) {
      console.log(err);
    }
  });
};
const buildCoinCardsNoSorting = (userPf, allCoins) => {
  const totalPfValue = userPf.totalValue;
  Object.keys(userPf.coins).forEach(sym => {
    try {
      let symbol   = sym;
      let quantity = userPf.coins[symbol];
      buildCoinCard(symbol, quantity, totalPfValue, allCoins[symbol]);
    } catch (err) {
      console.log(err);
    }
  });
};
const buildCoinCard  = (symbol, quantity, totalPfValue, target) => {
  const svgPath        = `images/svg/color/${symbol.toLowerCase()}.svg`;
  const percentage     = `${normalizePercentage(target.price * 100 * quantity / totalPfValue)}%`;
  const coinName       = target.name;
  const coinPrice      = `${normalizePrice(target.price)} $`;
  const holdingsValue  = `${normalizeValue(target.price * quantity)} $`;
  const holdingsAmount = `${quantity} ${symbol}`;
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
  // return innerHTML;
  document.querySelector('.coin-cards-container').insertAdjacentHTML("beforeend", innerHTML);
};

const selectNavbarPf = (name) => {
  document.querySelectorAll(".pf-group").forEach((pfGroup, indx) => {
    if (pfGroup.dataset.pfname == name) {
      selectNthPortfolio(indx+1);
      closeNav();
    }
  });
};

const orderPortfolios = (data) => {
  let result = {};
  data.portfolioOrdering.map(pfName => {
    result[pfName] = {};
    result[pfName]["coins"] = data[pfName];
    return result;
  });
  return result;
};

const addPfToSidenav = (name, value) => {
  const innerHTML = `
    <div class="pf-group" data-pfname="${name}" onclick="selectNavbarPf('${name}')">
      <a>${name}</a>
      <p class="pf-value">${normalizeValue(value)} $</p>
    </div>
  `;
  document.querySelector('.sidenav-pf-container').insertAdjacentHTML("beforeend", innerHTML);
};

const deselectAllPfsInNavbar = () => {
  document.querySelector('.sidenav-pf-container').querySelectorAll(".pf-group").forEach(pfGroup => {
    pfGroup.classList.remove("selected");
  });
};

const selectNthPfInNavbar = (n) => {
  document.querySelectorAll(`.pf-group`)[n-1].classList.add("selected");
};

const selectNthPortfolio = (n) => {
  // get key ("main portfoil" / "bro")
  const key = Object.keys(userPfs)[n-1];
  // get total value
  document.getElementById('portfolio-value').innerText = `${normalizeValue(userPfs[key]["totalValue"])} $`;
  document.getElementById('portfolio-value-label').innerText = key;
  removeAllCoinCards();
  buildCoinCards(userPfs[key], allCoins);
  // navbar + main portfolio name and total value
  deselectAllPfsInNavbar(); // deselect all portfolios in the navmenu
  selectNthPfInNavbar(n); // mark selected portfolio as selected
};

const addNewPortfolio = () => {
  alert("feature not availible yet! reach out to github.com/dcts for requests!");
};

// LOAD ALL COINS
let allCoins;
// INIT
let updatedAt;
let userPfs;
let portfolioValueFloat = 0.0;
let userPf;
loadAllCoins().then(() => {

  // display last updated price
  document.querySelector(".placeholder-update-timestamp").innerHTML = `<p><strong>last price update:</strong><br>${allCoins.updatedAt}</p>`;

  // check cases USER ID provided
  if (document.URL.split("/?user=").length === 2) {
    let userId = document.URL.split("/?user=")[1];
    getUser(userId).then(data => {
      // get pf in correct ordering
      userPfs = orderPortfolios(data);
      // compute pfvalue for all pf and store inside pf object
      for (const [key, value] of Object.entries(userPfs)) {
        portfolioValueFloat = computePortfolioValue(value["coins"], allCoins);
        userPfs[key]["totalValue"] = portfolioValueFloat;
        addPfToSidenav(key, portfolioValueFloat);
      }
      selectNthPortfolio(1); // show first portfolio
    });

  // OLD USECASE SUPPORTED AS WELL
  } else {
    let urlSuffix = getUrlSuffix(document.URL);
    let userPf = {};
    userPf.coins = convertUrlSuffix(urlSuffix);
    userPf.totalValue = computePortfolioValue(userPf.coins, allCoins);
    document.getElementById('portfolio-value').innerText = `${normalizeValue(userPf.totalValue)} $`;
    buildCoinCardsNoSorting(userPf, allCoins);
  }
});



