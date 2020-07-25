const openNav = () => {
  document.getElementById("mySidenav").style.width = "100vw";
  document.querySelector("#floating-menu > img").setAttribute("src", "/images/assets/close-white.svg");
  document.querySelector("#floating-menu").setAttribute("onclick", "closeNav()");
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector("#floating-menu > img").setAttribute("src", "/images/assets/list-solid.svg");
  document.querySelector("#floating-menu").setAttribute("onclick", "openNav()");
  // document.getElementById("floating-menu").classList.remove("reversed");
};

// close nav with escape key on desktop
document.addEventListener("keyup", e => {
  if (e.keyCode == 27) {
    closeNav();
  }
});
