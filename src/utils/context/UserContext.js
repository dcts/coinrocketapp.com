// Following this example:
// => https://dev.to/nazmifeeroz/using-usecontext-and-usestate-hooks-as-a-store-mnm
import React from 'react'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import { processData, computeCoins } from '../../utils/DataHelper.js';

export const UserContext = React.createContext(null)

export default ({ children, getCoinrocketUserData }) => {
  const [data, setData] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedPortfolioIndx, setSelectedPortfolioIndx] = useState(0);
  const [sidenavIsOpen, setSidenavIsOpen] = useState(false);
  const [currencySelectorIsOpen, setCurrencySelectorIsOpen] = useState(false);

  // for debugging
  window.data = data;
  window.setSelectedCurrency = (currency) => setSelectedCurrency(currency);

  // get userId
  let { userId } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  if (!userId) {
    userId = urlParams.get("id");
  }
  if (!userId) {
    userId = urlParams.get("userId");
  }

  // load all needed data from database
  useEffect(() => {
    const fetchData = async () => {
      const res = await getCoinrocketUserData({id: userId});
      res.data.currencyRates["ETH"] = 1 / res.data.coins.ethereum.price;
      res.data.currencyRates["BTC"] = 1 / res.data.coins.bitcoin.price;
      setData(res.data);
    };
    fetchData();
  }, []);

  // once data is loaded, choose default currency
  useEffect(() => {
    if (data && data.defaultCurrency) {
      setSelectedCurrency(data.defaultCurrency);
    }
  }, [data]);

  useEffect(() => {
    if (!["USD","EUR","PLN","CHF","ETH","BTC"].includes(selectedCurrency)) {
      setSelectedCurrency("USD");
    }
  }, [selectedCurrency]);

  const store = {
    data: [data, setData],
    selectedCurrency: [selectedCurrency, setSelectedCurrency],
    selectedPortfolioIndx: [selectedPortfolioIndx, setSelectedPortfolioIndx],
    sidenavIsOpen: [sidenavIsOpen, setSidenavIsOpen],
    currencySelectorIsOpen: [currencySelectorIsOpen, setCurrencySelectorIsOpen],
  }

  return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}


