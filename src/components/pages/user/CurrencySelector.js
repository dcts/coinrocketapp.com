import React, { useContext } from "react";
import { UserContext } from "../../../utils/context/UserContext.js";

const CurrencySelector = () => {
  const { ["selectedCurrency"]: [selectedCurrency, setSelectedCurrency] } = useContext(UserContext);
  const { ["currencySelectorIsOpen"]: [currencySelectorIsOpen, setCurrencySelectorIsOpen] } = useContext(UserContext);
  const { ["data"]: [data, setData] } = useContext(UserContext);

  const handleCurrencySelection = (currency) => {
    setSelectedCurrency(currency);
    setCurrencySelectorIsOpen(false);
  }

  const currencies = data && data.currencyRates ? Object.keys(data.currencyRates) : [];
  return (
    <div className={`currency-selector ${currencySelectorIsOpen ? "is-open" : ""}`} onClick={() => setCurrencySelectorIsOpen(false)}>
      <h1>Select Currency</h1>
      <div>
        { currencies.map((currency, i) => {
          return (
            <div key={i} className="currency-selector-option" onClick={() => handleCurrencySelection(currency)}>
              <p>{currency}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrencySelector;
