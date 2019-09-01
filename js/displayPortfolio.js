let allCoins;
let updatedAt;
loadAllCoins();
let userPfs;
let userPf;
getUser("AyC0xdFfGljDuSx6NhHH").then(data => {
  userPfs = data;
  userPf = userPfs[userPfs.portfolioOrdering[0]];
  buildCoinCards(userPf, allCoins);
});



const buildCoinCards = (userPf, allCoins) => {
  for (var key in userPf) {
    let userCoinSymbol   = key;
    let userCoinQuantity = userPf[key];
    buildCoinCard(userCoinSymbol, userCoinQuantity, allCoins);
  }
};
const buildCoinCard  = (symbol, quantity, allCoins) => {
  console.log("--------------BUILDING")
  console.log(symbol);
  console.log(quantity);

  const target         = allCoins[symbol];
  const svgPath        = `images/svg/color/${symbol.toLowerCase()}.svg`;
  // const percentage     = `${normalizePercentage(target.price * 100 * userCoin.quantity / portfolioValueFloat)}%`;
  const percentage     = `20%`;
  const coinName       = target.name;
  // const coinPrice      = `${normalizePrice(target.price)} $`;
  const coinPrice      = `${(target.price)} $`;
  // const holdingsValue  = `${normalizeValue(target.price * userCoin.quantity)} $`;
  const holdingsValue  = `${(target.price * quantity)} $`;
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
