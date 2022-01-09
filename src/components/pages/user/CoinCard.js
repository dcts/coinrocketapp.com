import { useContext } from "react";
import { normalizePrice, addThousandsSeparator, convertCurrency  } from "../../../utils/DataHelper.js";
import { UserContext } from "../../../utils/context/UserContext";

const CoinCard = ({coin}) => {
  console.log(coin);
  const { ["data"]: [data, setData] } = useContext(UserContext);
  const { ["selectedPortfolioIndx"]: [selectedPortfolioIndx, setSelectedPortfolioIndx] } = useContext(UserContext);
  const { ["selectedCurrency"]: [selectedCurrency, setSelectedCurrency] } = useContext(UserContext);

  // coin = {
  //   holdings: {
  //     quantity: 13000000,
  //     valueUSD: 114095.01999999999
  //   },
  //   id: "holotoken",
  //   image: "https://assets.coingecko.com/coins/images/3348/large/Holologo_Profile.png?1547037966",
  //   name: "Holo",
  //   price: 0.00877654,
  //   symbol: "hot",
  // };

  const currency = selectedCurrency === "USD" ? "$" : selectedCurrency;
  const portfolioPercentage = "40%";

  const coinPriceCoverted = convertCurrency(coin.price, selectedCurrency, data.currencyRates);
  const coinDisplayPrice = normalizePrice(coinPriceCoverted);

  const coinValueConverted = convertCurrency(coin.holdings.valueUSD, selectedCurrency, data.currencyRates);
  const coinDisplayValue = normalizePrice(coinValueConverted);
  return (
    <div className="coin-card">
      { coin.id &&
        <>
          <div className="icon">
            <div className="icon-flex">
              <img src={coin.image} alt="" />
              <div className="percentage">{portfolioPercentage}</div>
            </div>
          </div>
          <div className="coin-info">
            <p className="coin-name text-no-wrap">{coin.name}</p>
            <p className="coin-price">{coinDisplayPrice} {currency}</p>
          </div>
          <div className="holdings-info">
            <p className="holdings-value">{coinDisplayValue} {currency}</p>
            <p className="holdings-amount">{addThousandsSeparator(coin.holdings.quantity.toString())} {coin && coin.symbol ? coin.symbol.toUpperCase() : ""}</p>
          </div>
        </>
      }
    </div>
  );
};

export default CoinCard;
