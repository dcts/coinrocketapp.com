import React, { useContext } from "react";
import { UserContext } from "../../../utils/context/UserContext.js";
import { normalizePrice, convertCurrency } from "../../../utils/DataHelper.js";

const Sidenav = () => {
  // global state
  const { ["data"]: [data, setData] } = useContext(UserContext);
  const { ["sidenavIsOpen"]: [sidenavIsOpen, setSidenavIsOpen] } = useContext(UserContext);
  const { ["selectedCurrency"]: [selectedCurrency, setSelectedCurrency] } = useContext(UserContext);
  const { ["selectedPortfolioIndx"]: [selectedPortfolioIndx, setSelectedPortfolioIndx] } = useContext(UserContext);
  const currency = selectedCurrency === "USD" ? "$" : selectedCurrency;

  const handleClose = () => {
    setSidenavIsOpen(false);
  }
  const selectPortfolio = (indx) => {
    setSelectedPortfolioIndx(indx);
    setSidenavIsOpen(false);
  }

  return (
    <div className={`sidenav ${sidenavIsOpen ? "open" : ""}`}>
      <a onClick={handleClose} className="closebtn">&times;</a>
      <div className="sidenav-pf-container">
        {
          data.portfolios && data.portfolios.map((portfolio, indx) => {
            const portfolioValueConverted = convertCurrency(portfolio.valueUSD, selectedCurrency, data.currencyRates);
            const portfolioDisplayValue = normalizePrice(portfolioValueConverted);
            return (
              <div key={indx} className="pf-group" onClick={() => selectPortfolio(indx)}>
                <a>{portfolio.name}</a>
                <p className="pf-value">{portfolioDisplayValue} {currency}</p>
              </div>
            )
          })
        }
      </div>
      <div className="flex align-center add-pf-btn">
        <i className="fas fa-folder-plus"></i>
        <p>Add New Portfolio</p>
      </div>
    </div>
  );
};

export default Sidenav;
