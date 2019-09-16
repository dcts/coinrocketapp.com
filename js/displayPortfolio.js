/*
 * GRAB COINDATA FROM FIREBASE
 */
const getUserPortfolios = userId => {
  db.collection("users").doc(userId).get().then(doc => {
    if (doc.exists) {
      const x = doc.data();
      console.log(x);
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
    console.log("asdasdasd");
    console.log(userPf);
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
  } else if (price < 0.1) {
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



const buildCoinCards = (userPf, allCoins) => {
  for (var key in userPf) {
    try {
      let userCoinSymbol   = key;
      let userCoinQuantity = userPf[key];
      buildCoinCard(userCoinSymbol, userCoinQuantity, allCoins);
    } catch (err) {
      console.log(err);
    }
  }
};
const buildCoinCard  = (symbol, quantity, totalPfValue, allCoins) => {
  const target         = allCoins[symbol];
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
  console.log("hi");
  console.log(name);
};

const orderPortfolios = (data) => {
  let result = {};
  data.portfolioOrdering.map(pfName => {
    result[pfName] = data[pfName];
    return result;
  });
  return result;
};

const addPfToSidenav = (name, value) => {
  const innerHTML = `
    <div class="pf-group" onclick="selectNavbarPf('${name}')">
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
  document.querySelector('.sidenav-pf-container').querySelector(`.pf-group:nth-child(${n})`).classList.add("selected");
};

const selectNthPortfolio = (n) => {
  // get key ("main portfoil" / "bro")
  const key = Object.keys(userPfs)[n-1];
  // get total value
  document.getElementById('portfolio-value').innerText = `${normalizeValue(userPfs[key]["totalValue"])} $`;
  buildCoinCards(userPfs[key], allCoins);
  // NAVBAR
  deselectAllPfsInNavbar(); // deselect all portfolios in the navmenu
  selectNthPfInNavbar(n); // mark selected portfolio as selected
};

// LOAD ALL COINS
let allCoins;
// INIT
let updatedAt;
let userPfs;
let portfolioValueFloat = 0.0;
let userPf;
loadAllCoins().then(() => {

  // check cases USER ID provided
  if (document.URL.split("/?user=").length === 2) {
    let userId = document.URL.split("/?user=")[1];
    getUser(userId).then(data => {
      // get pf in correct ordering
      userPfs = orderPortfolios(data);
      // compute pfvalue for all pf and store inside pf object
      let first = true;
      for (const [key, value] of Object.entries(userPfs)) {
        console.log(key, value);
        portfolioValueFloat = computePortfolioValue(value, allCoins);
        userPfs[key]["totalValue"] = portfolioValueFloat;
        console.log(portfolioValueFloat);
        addPfToSidenav(key, portfolioValueFloat);
      }
      selectNthPortfolio(1); // show first portfolio
    });

  // OLD USECASE SUPPORTED AS WELL
  } else {
    console.log("else");
    let urlSuffix = getUrlSuffix(document.URL);
    console.log(urlSuffix);
    let userPf = convertUrlSuffix(urlSuffix);
    console.log(userPf);
    console.log(allCoins);
    portfolioValueFloat = computePortfolioValue(userPf, allCoins);
    document.getElementById('portfolio-value').innerText = `${normalizeValue(portfolioValueFloat)} $`;
    buildCoinCards(userPf, allCoins);
  }
});



