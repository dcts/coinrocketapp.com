
console.log(`ALL PRICES WITH REDUCE: ${allCoins.map(item => item.price).reduce((a,b) => a + b)}`);
prices = allCoins.map(item => item.price);
sum = 0.0;
prices.forEach((item) => {
  if (item === 0) {
    console.log("ERROR");
  }
  sum += item;
});
console.log(`RESULT ${sum}`);
