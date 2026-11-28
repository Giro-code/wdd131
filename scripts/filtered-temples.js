"use strict";

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const gallery = document.querySelector("#temple-gallery");
const temples = [
  {
    "templeName": "Aba Nigeria",
    "location": "Aba, Nigeria",
    "dedicated": "2005, August, 7",
    "area": 11500,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    "templeName": "Manti Utah",
    "location": "Manti, Utah, United States",
    "dedicated": "1888, May, 21",
    "area": 74792,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    "templeName": "Payson Utah",
    "location": "Payson, Utah, United States",
    "dedicated": "2015, June, 7",
    "area": 96630,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    "templeName": "Yigo Guam",
    "location": "Yigo, Guam",
    "dedicated": "2020, May, 2",
    "area": 6861,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    "templeName": "Washington D.C.",
    "location": "Kensington, Maryland, United States",
    "dedicated": "1974, November, 19",
    "area": 156558,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    "templeName": "Lima Perú",
    "location": "Lima, Perú",
    "dedicated": "1986, January, 10",
    "area": 9600,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    "templeName": "Mexico City Mexico",
    "location": "Mexico City, Mexico",
    "dedicated": "1983, December, 2",
    "area": 116642,
    "imageUrl": "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    "templeName": "Santo Domingo Dominican Republic",
    "location": "Santo Domingo, Dominican Republic",
    "dedicated": "2000, September, 17",
    "area": 67000,
    "imageUrl": "https://www.churchofjesuschrist.org/imgs/bd7519e3369d1f82b7470f7d16f1ab92504246b1/full/500%2C/0/default"
  },
  {
    "templeName": "San Juan Puerto Rico",
    "location": "San Juan, Puerto Rico",
    "dedicated": "2023, January, 15",
    "area": 6988,
    "imageUrl": "https://www.churchofjesuschrist.org/imgs/b8e8764466cb11eda40eeeeeac1ead22054ff7fc/full/500%2C/0/default"
  },
  {
    "templeName": "Bogotá Colombia",
    "location": "Bogotá, Colombia",
    "dedicated": "1999, April, 24",
    "area": 53500,
    "imageUrl": "https://www.churchofjesuschrist.org/imgs/89b209718a7ed41649a497893e240972b7cfd036/full/500%2C/0/default"
  }
];
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
  home: ["Home", "Explore ten temples around the world."],
  old: ["Old", "Temples dedicated before 1900."],
  new: ["New", "Temples dedicated after 2000."],
  large: ["Large", "Temples larger than 90,000 square feet."],
  small: ["Small", "Temples smaller than 10,000 square feet."]
};

function createTempleCards(list) {
  gallery.replaceChildren();
  list.forEach(temple => {
    const card = document.createElement("section");
    card.className = "temple-card";
    const name = document.createElement("h2");
    name.textContent = temple.templeName;
    card.append(name);
    for (const [label, value] of [["Location", temple.location], ["Dedicated", temple.dedicated], ["Size", `${temple.area.toLocaleString("en-US")} sq ft`]]) {
      const detail = document.createElement("p");
      const heading = document.createElement("strong");
      heading.textContent = `${label}: `;
      detail.append(heading, value);
      card.append(detail);
    }
    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple exterior`;
    img.loading = "lazy";
    img.width = 400;
    img.height = 250;
    card.append(img);
    gallery.append(card);
  });
  viewNote.textContent = `Showing ${list.length} of ${temples.length} temples.`;
}

function filterTemples(view) {
  switch (view) {
    case "old": return temples.filter(t => parseInt(t.dedicated, 10) < 1900);
    case "new": return temples.filter(t => parseInt(t.dedicated, 10) > 2000);
    case "large": return temples.filter(t => t.area > 90000);
    case "small": return temples.filter(t => t.area < 10000);
    default: return temples;
  }
}

links.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    const mobileMenuWasOpen = menuButton.getAttribute("aria-expanded") === "true";
    const view = link.dataset.view;
    links.forEach(item => item.removeAttribute("aria-current"));
    link.setAttribute("aria-current", "page");
    const [title, description] = descriptions[view];
    viewTitle.textContent = title;
    viewDescription.textContent = description;
    createTempleCards(filterTemples(view));
    CloseMenu();
    if (mobileMenuWasOpen) viewTitle.focus();
  });
});
window.matchMedia("(min-width: 640px)").addEventListener("change", CloseMenu);
createTempleCards(temples);
