const openNav = () => {
  document.getElementById("mySidenav").style.width = "100vw";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

// close nav with escape key on desktop
document.addEventListener("keyup", e => {
  if (e.keyCode == 27) {
    closeNav();
  }
});
