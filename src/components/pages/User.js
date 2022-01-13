import Sidenav from "./user/Sidenav.js";
import Header from "./user/Header.js";
import CoinCardsList from "./user/CoinCardsList.js";
import FloatingMenu from "./user/FloatingMenu.js";
import CurrencySelector from "./user/CurrencySelector.js";

const User = () => {

  return (
    <div className="user container-main">

      {/* SIDENAVIGATION */}
      <Sidenav />

      {/* HEADER */}
      <Header />

      {/* COIN CARDS CONTAINER -> will be populated with */}
      <CoinCardsList />

      {/* FLOATING MENU BUTTON */}
      <FloatingMenu />

      {/* CURRENCY SELECT SCREEN */}
      <CurrencySelector />
    </div>
  );
};

export default User;
