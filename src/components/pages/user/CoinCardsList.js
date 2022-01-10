
import React, { useContext } from "react";
import { UserContext } from "../../../utils/context/UserContext";
import { normalizeValue } from "../../../utils/DataHelper.js";

import CoinCard from './CoinCard';

const CoinCardsList = () => {
  const { ["data"]: [data, setData] } = useContext(UserContext);
  const { ["selectedPortfolioIndx"]: [selectedPortfolioIndx, setSelectedPortfolioIndx] } = useContext(UserContext);

  let coinCards = data && data.portfolios ? data.portfolios[selectedPortfolioIndx].coins : [];
  coinCards = coinCards.sort((a,b) => b.holdings.valueUSD - a.holdings.valueUSD);
  return (
    <div className="coin-cards-list">
      {coinCards.map((coin, indx) => <CoinCard key={indx} coin={coin} />)}
    </div>
  );
};

export default CoinCardsList;
