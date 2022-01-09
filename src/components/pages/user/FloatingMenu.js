import React, { useContext } from "react";
import { UserContext } from "../../../utils/context/UserContext.js";

const FloatingMenu = () => {
  const { ["sidenavIsOpen"]: [sidenavIsOpen, setSidenavIsOpen] } = useContext(UserContext);

  const toggleMenu = () => {
    setSidenavIsOpen(!sidenavIsOpen);
  }
  return (
    <div id="floating-menu" className="display-flex justify-center align-center" onClick={toggleMenu}>
      <div className="flex justify-center align-center">
        <button
          className={`hamburger hamburger--squeeze no-select ${sidenavIsOpen ? "is-active" : ""}`}
          type="button"
          onClick={toggleMenu}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default FloatingMenu;
