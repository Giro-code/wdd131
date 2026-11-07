"use strict";

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const gallery = document.querySelector("#temple-gallery");
const figures = [...gallery.querySelectorAll("figure")];
const links = [...navigation.querySelectorAll("a")];
const viewTitle = document.querySelector("#view-title");
const viewDescription = document.querySelector("#view-description");
const viewNote = document.querySelector("#view-note");

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last modified: ${document.lastModified}`;

function CloseMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.querySelector("span").textContent = "☰";
}

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  navigation.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  menuButton.querySelector("span").textContent = open ? "×" : "☰";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    CloseMenu();
    menuButton.focus();
  }
});

const descriptions = {
  home: ["Home", "Nine temples across the Caribbean and Latin America."],
  old: ["Old", "Temples dedicated before 2000."],
  new: ["New", "Temples dedicated in 2000 or later."],
  large: ["Large Photos", "All nine temples, with larger photographs on desktop."],
  small: ["Small Photos", "All nine temples, in a compact desktop photo layout."]
};

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const mobileMenuWasOpen = menuButton.getAttribute("aria-expanded") === "true";
    const view = link.dataset.view;
    links.forEach((item) => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    const [title, description] = descriptions[view];
    viewTitle.textContent = title;
    viewDescription.textContent = description;
    gallery.classList.toggle("large-photos", view === "large");
    gallery.classList.toggle("small-photos", view === "small");
    let count = 0;
    figures.forEach((figure) => {
      const year = Number(figure.dataset.year);
      const visible = view === "old" ? year < 2000 : view === "new" ? year >= 2000 : true;
      figure.hidden = !visible;
      if (visible) count++;
    });
    viewNote.textContent = count === figures.length ? "Showing all 9 temples." : `Showing ${count} of 9 temples.`;
    CloseMenu();
    if (mobileMenuWasOpen) viewTitle.focus();
  });
});

window.matchMedia("(min-width: 640px)").addEventListener("change", CloseMenu);
