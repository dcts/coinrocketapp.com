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
  let result = {};
  coins.forEach(coin => {
    symbol = coin.split("=")[0];
    quantity = parseFloat(coin.split("=")[1]);
    result[symbol] = quantity;
  });
  return result
};
