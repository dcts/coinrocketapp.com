import React, { useContext } from "react";
import { UserContext } from "../../../utils/context/UserContext";
import { normalizePrice, convertCurrency } from "../../../utils/DataHelper.js";

const Header = () => {
  const { ["data"]: [data, setData] } = useContext(UserContext);
  const { ["selectedPortfolioIndx"]: [selectedPortfolioIndx, setSelectedPortfolioIndx] } = useContext(UserContext);
  const { ["selectedCurrency"]: [selectedCurrency, setSelectedCurrency] } = useContext(UserContext);
  const { ["sidenavIsOpen"]: [sidenavIsOpen, setSidenavIsOpen] } = useContext(UserContext);
  const { ["currencySelectorIsOpen"]: [currencySelectorIsOpen, setCurrencySelectorIsOpen] } = useContext(UserContext);

  const portfolio = data.portfolios ? data.portfolios[selectedPortfolioIndx] : {};
  const currency = selectedCurrency === "USD" ? "$" : selectedCurrency;

  const openMenu = () => {
    setSidenavIsOpen(true);
  }
  const reload = () => {
    window.location.reload();
  }

  const openCurrencySelector = () => {
    setCurrencySelectorIsOpen(true);
  }

  const portfolioValueConverted = convertCurrency(portfolio.valueUSD, selectedCurrency, data.currencyRates);
  const portfolioDisplayValue = normalizePrice(portfolioValueConverted);
  return (
    <>
      <div className="header">
        <div className="pos-relative">
          <RedBouncingDot />
        </div>
        <div className="menu" onClick={openMenu}><div></div><div></div><div></div></div>
        <div className="overview" onClick={reload}>
          <p id="portfolio-value-label">{portfolio.name}</p>
          <p id="portfolio-value">{portfolioDisplayValue} {currency}</p>
        </div>
        <div className="currency" onClick={openCurrencySelector}>{selectedCurrency}</div>
      </div>
      <div className="placeholder-update-timestamp">
        <p><strong>last price update:</strong></p>
      </div>
    </>
  );
};


const RedBouncingDot = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-tobiasahlin">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  )
}

export default Header;
