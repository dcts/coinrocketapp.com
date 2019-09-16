const getUrlSuffix = url => {
  let suffix;
  if (url.includes("?")) {
    suffix = url.split("?")[1];
  } else {
    suffix = "BTC=1&ETH=1&XRP=1&LTC=1&BCH=1&EOS=1&BNB=1&BSV=1&USDT=1&XLM=1&ADA=1&TRX=1&XMR=1&DASH=1&MIOTA=1&NEO=1";
  }
  return suffix;
};
// converts params string to userPortfolio object
const convertUrlSuffix = urlSuffix => {
  let coins = urlSuffix.split("&");
  let result = {};
  coins.forEach(coin => {
    symbol = coin.split("=")[0];
    quantity = parseFloat(coin.split("=")[1]);
    result[symbol] = quantity;
  });
  return result
};
