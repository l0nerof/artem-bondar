const menuIcon = document.querySelector(".header__menu-icon");
const menu = document.querySelector(".header__menu");
const MenuLinks = {
  first: document.querySelector("#first"),
  second: document.querySelector("#second"),
  third: document.querySelector("#third"),
  fourth: document.querySelector("#fourth"),
  fifth: document.querySelector("#fifth"),
  // sixth: document.querySelector("#sixth"),
  seventh: document.querySelector("#seventh"),
};

menuIcon.addEventListener("click", toggleMenu);
MenuLinks.first.addEventListener("click", toggleMenu);
MenuLinks.second.addEventListener("click", toggleMenu);
MenuLinks.third.addEventListener("click", toggleMenu);
MenuLinks.fourth.addEventListener("click", toggleMenu);
MenuLinks.fifth.addEventListener("click", toggleMenu);
// MenuLinks.sixth.addEventListener("click", toggleMenu);
MenuLinks.seventh.addEventListener("click", toggleMenu);

function toggleMenu() {
  const isMenuOpen = menuIcon.classList.toggle("active");
  menu.classList.toggle("is-open");

  const scrollLockMethod = !isMenuOpen
    ? "disableBodyScroll"
    : "enableBodyScroll";
  bodyScrollLock[scrollLockMethod](document.body);
}

window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
  if (!e.matches) return;
  menu.classList.remove("is-open");
  bodyScrollLock.enableBodyScroll(document.body);
});
