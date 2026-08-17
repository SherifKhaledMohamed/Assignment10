/* HTML Elements */
let htmlTag = document.querySelector("html");
let settingsBtn = document.getElementById("settings-toggle");
let closeSettingsBtn = document.getElementById("close-settings");
let sideBar = document.getElementById("settings-sidebar");
let bodyElement = document.body;
let fontButtons = document.querySelectorAll("button.font-option");

// Theme Colors
let colors = [
  {
    name: "Purple Blue",
    primary: "#6366f1",
    secondary: "#8b5cf6",
    accent: "#a855f7",
  },
  {
    name: "Pink Orange",
    primary: "#ec4899",
    secondary: "#f97316",
    accent: "#fb923c",
  },
  {
    name: "Green Emerald",
    primary: "#10b981",
    secondary: "#059669",
    accent: "#34d399",
  },
  {
    name: "Blue Cyan",
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#22d3ee",
  },
  {
    name: "Red Rose",
    primary: "#ef4444",
    secondary: "#f43f5e",
    accent: "#fb7185",
  },
  {
    name: "Amber Orange",
    primary: "#f59e0b",
    secondary: "#ea580c",
    accent: "#fbbf24",
  },
];

//Nav & Tabs Data Filter
let dataFilterBtns = Array.from(
  document.querySelectorAll("button.portfolio-filter[data-filter]"),
);
let dataFilterDivs = Array.from(
  document.querySelectorAll("div.portfolio-item[data-category]"),
);

//Carousel Elements
let carousel = document.getElementById("testimonials-carousel");
let carouselNextBtn = document.getElementById("next-testimonial");
let carouselPrevBtn = document.getElementById("prev-testimonial");
let carouselindicatorsBtns = Array.from(
  document.querySelectorAll("button.carousel-indicator"),
);

/* Sections */
let heroSection = document.getElementById("hero-section");
let aboutSection = document.getElementById("about");
let skillsSection = document.getElementById("skills-section");
let portfolioSection = document.getElementById("portfolio");
let experienceSection = document.getElementById("experience");
let testimonialsSection = document.getElementById("testimonials");
let statisticsSection = document.getElementById("statistics-section");
let contactSection = document.getElementById("contact");

/* Navbar Anchors*/
let navLinks = Array.from(
  document.querySelectorAll('#header div.nav-links a[href^="#"]'),
);

/*Variables*/
var sectionsData = [];
var scrollMargin = 5;

// Methods

document.addEventListener("DOMContentLoaded", function () {
  reportSectionsData();
  adjustStartupDarkMode();
  adjustStartupFonts();
  addActiveClass();
  addColorsButtons();
  setStartupDocumentColor();
});

//#region Populate Theme Colors
function addColorsButtons() {
  var colorsGrid = document.getElementById("theme-colors-grid");
  colors.forEach((color) => {
    var myBtn = document.createElement("button");
    ((myBtn.className =
      "color-button w-12 h-12 rounded-full cursor-pointer transition-transform hover:scale-110 border-2 border-slate-200 dark:border-slate-700 hover:border-primary shadow-sm"),
      (myBtn.style.background = `linear-gradient(135deg, ${color.primary}, ${color.secondary})`));
    myBtn.setAttribute("title", color.name);
    myBtn.setAttribute("data-primary", color.primary);
    myBtn.setAttribute("data-secondary", color.secondary);
    colorsGrid.appendChild(myBtn);

    myBtn.addEventListener("click", function () {
      setDocumentColor(color.primary, color.secondary, color.accent);
      localStorage.setItem("themeColor", JSON.stringify(color));
      document.querySelectorAll("button.color-button").forEach((element) => {
        element.classList.remove(
          "ring-2",
          "ring-primary",
          "ring-ofset-2",
          "ring-offset-white",
          "dark:ring-offset-slate-900",
        );
      });
      myBtn.classList.add(
        "ring-2",
        "ring-primary",
        "ring-ofset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    });
  });
}
function setDocumentColor(primary, secondary, accent) {
  document.documentElement.style.setProperty("--color-primary", primary);
  document.documentElement.style.setProperty("--color-secondary", secondary);
  document.documentElement.style.setProperty("--color-accent", accent);
}
function setStartupDocumentColor() {
  var currenLocalColor = JSON.parse(localStorage.getItem("themeColor"));
  if (currenLocalColor) {
    setDocumentColor(
      currenLocalColor.primary,
      currenLocalColor.secondary,
      currenLocalColor.accent,
    );
    setColorBtnActive(currenLocalColor.name);
  } else {
    currenLocalColor = colors[0];
    setDocumentColor(
      currenLocalColor.primary,
      currenLocalColor.secondary,
      currenLocalColor.accent,
    );
    setColorBtnActive(currenLocalColor.name);
  }
}
function setColorBtnActive(name) {
  var colorBtn = document.querySelector(`button[title="${name}"]`);
  document.querySelectorAll("button.color-button").forEach((element) => {
    element.classList.remove(
      "ring-2",
      "ring-primary",
      "ring-ofset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );
  });
  colorBtn.classList.add(
    "ring-2",
    "ring-primary",
    "ring-ofset-2",
    "ring-offset-white",
    "dark:ring-offset-slate-900",
  );
}
//#endregion

//#region Get Sections Data

function reportSectionsData() {
  let allSections = Array.from(document.querySelectorAll("section"));
  let lastTop = 0;
  for (var i = 0; i < allSections.length; i++) {
    var sectionData = {
      sectionId: "#" + allSections[i].id,
      sectionStart: lastTop,
      sectionEnd: allSections[i].scrollHeight + lastTop,
    };
    lastTop = sectionData.sectionEnd;

    sectionsData.push(sectionData);
  }
}

//#endregion

//#region Scroll Spy Methods

function getActiveSectionData(scrollPosition) {
  for (var i = 0; i < sectionsData.length; i++) {
    if (
      sectionsData[i].sectionStart < scrollPosition + scrollMargin &&
      scrollPosition + scrollMargin < sectionsData[i].sectionEnd
    ) {
      return sectionsData[i].sectionId;
    }
  }
}
function getActiveSection(sectionId) {
  for (var i = 0; i < navLinks.length; i++) {
    if (navLinks[i].getAttribute("href") === sectionId) {
      return navLinks[i];
    }
  }
}
function removeActiveSectionClass() {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
}
function addActiveClass() {
  var currentSectionId = getActiveSectionData(window.scrollY);
  var activeSection = getActiveSection(currentSectionId);
  removeActiveSectionClass();
  activeSection.classList.add("active");
}
function toggleToTopButtonOn() {
  document.getElementById("scroll-to-top").classList.remove("opacity-0");
  document.getElementById("scroll-to-top").classList.remove("invisible");
}
function toggleToTopButtonOff() {
  document.getElementById("scroll-to-top").classList.add("opacity-0");
  document.getElementById("scroll-to-top").classList.add("invisible");
}
document.getElementById("scroll-to-top").addEventListener("click", function () {
  window.scrollTo(0, 0);
});
window.addEventListener("scroll", function () {
  addActiveClass();
  if (window.scrollY > heroSection.scrollHeight) toggleToTopButtonOn();
  else {
    toggleToTopButtonOff();
  }
});

//#endregion

//#region Settings Toggles
settingsBtn.addEventListener("click", function () {
  var isExpanded = settingsBtn.getAttribute("aria-expanded");
  if (isExpanded === "false") {
    openSideBar();
  } else {
    closeSideBar();
  }
});
closeSettingsBtn.addEventListener("click", function () {
  closeSideBar();
});
document.addEventListener("click", function (e) {
  // var sideBarChildrens = Array.from(sideBar.children);
  if (
    !sideBar.contains(e.target) &&
    settingsBtn.getAttribute("aria-expanded") == "true" &&
    !settingsBtn.contains(e.target)
  )
    closeSideBar();
});
function openSideBar() {
  sideBar.classList.remove("translate-x-full");
  settingsBtn.setAttribute("aria-expanded", "true");
  settingsBtn.style.right = "20rem";
}
function closeSideBar() {
  sideBar.classList.add("translate-x-full");
  settingsBtn.setAttribute("aria-expanded", "false");
  settingsBtn.style.right = "0";
}
//#endregion

//#region Themes Switch
document
  .getElementById("theme-toggle-button")
  .addEventListener("click", function (e) {
    var isDark = htmlTag.classList.toggle("dark");
    var theme = "";
    if (isDark) theme = "dark";
    else theme = "light";
    localStorage.setItem("theme", theme);
  });

function adjustStartupDarkMode() {
  var theme = localStorage.getItem("theme");
  if (!theme) {
    htmlTag.classList.add("dark");
    theme = "dark";
  } else {
    if (theme === "dark") {
      htmlTag.classList.add("dark");
      theme = "dark";
    } else {
      htmlTag.classList.remove("dark");
      theme = "light";
    }
  }
  localStorage.setItem("theme", theme);
}

function adjustStartupFonts() {
  var usedFont = localStorage.getItem("font");
  if (!usedFont) {
    usedFont = applyFont("tajawal");
  } else {
    switch (usedFont) {
      case "font-tajawal":
        usedFont = applyFont("tajawal");
        break;

      case "font-alexandria":
        usedFont = applyFont("alexandria");
        break;

      case "font-cairo":
        usedFont = applyFont("cairo");
        break;

      default:
        break;
    }
  }
  localStorage.setItem("font", usedFont);
}

function applyFont(fontName) {
  bodyElement.classList.remove("font-tajawal", "font-alexandria", "font-cairo");
  bodyElement.classList.add(`font-${fontName}`);

  var usedFont = `font-${fontName}`;
  fontButtons.forEach((btn) => {
    btn.classList.remove(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800",
    );
    btn.classList.add("border-slate-200", "dark:border-slate-700");
  });
  document
    .querySelector(`button.font-option[data-font='${fontName}']`)
    .classList.add(
      "active",
      "border-primary",
      "bg-slate-50",
      "dark:bg-slate-800",
    );

  document
    .querySelector(`button.font-option[data-font='${fontName}']`)
    .classList.remove("border-slate-200", "dark:border-slate-700");
  return usedFont;
}

fontButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    var usedFont = applyFont(e.currentTarget.getAttribute("data-font"));
    localStorage.setItem("font", usedFont);
  });
});
//#endregion

//#region Nav & Tabs Methods
dataFilterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    activateSelectedButton(btn);
    var currentSelection = btn.getAttribute("data-filter");
    switch (currentSelection) {
      case "all":
        hideAllPortfolioItems();
        activateSelectedPortfolioItems("all");
        break;
      case "web":
        hideAllPortfolioItems();
        activateSelectedPortfolioItems("web");
        break;
      case "app":
        hideAllPortfolioItems();
        activateSelectedPortfolioItems("app");
        break;
      case "design":
        hideAllPortfolioItems();
        activateSelectedPortfolioItems("design");
        break;
      case "ecommerce":
        hideAllPortfolioItems();
        activateSelectedPortfolioItems("ecommerce");
        break;
      default:
        break;
    }
  });
});
function hideAllPortfolioItems() {
  dataFilterDivs.forEach((item) => {
    item.classList.add("hidden-item");
    setTimeout(() => {
      item.classList.add("hidden-display");
    }, 300);
  });
}
function activateSelectedPortfolioItems(key) {
  if (key === "all") {
    dataFilterDivs.forEach((item) => {
      item.classList.remove("hidden-item");
      setTimeout(() => {
        item.classList.remove("hidden-display");
      }, 300);
    });
  } else {
    dataFilterDivs.forEach((item) => {
      if (item.getAttribute("data-category") === key) {
        item.classList.remove("hidden-item");
        setTimeout(() => {
          item.classList.remove("hidden-display");
        }, 300);
      }
    });
  }
}
function activateSelectedButton(selectedButton) {
  dataFilterBtns.forEach((btn) => {
    btn.classList.remove(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "text-white",
      "shadow-lg",
      "shadow-primary/50",
    );
    btn.classList.add(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
    btn.setAttribute("aria-pressed", "false");
  });
  selectedButton.classList.remove(
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "border",
    "border-slate-300",
    "dark:border-slate-700",
  );
  selectedButton.classList.add(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "text-white",
    "shadow-lg",
    "shadow-primary/50",
  );
  selectedButton.setAttribute("aria-pressed", "true");
}
//#endregion

//#region Carousel Methods

carouselNextBtn.addEventListener("click", function () {
  var currentStep = Number(carousel.getAttribute("move-step"));
  if (currentStep === 4) {
    carousel.style.transform = `translateX(0)`;
    currentStep = 1;
    activateCarouselIndicator(currentStep);
    carousel.setAttribute("move-step", currentStep);
  } else {
    carousel.style.transform = `translateX(${100 * (currentStep / 3)}%)`;
    currentStep++;
    activateCarouselIndicator(currentStep);
    carousel.setAttribute("move-step", currentStep);
  }
});
carouselPrevBtn.addEventListener("click", function () {
  var currentStep = Number(carousel.getAttribute("move-step"));
  if (currentStep === 1) {
    carousel.style.transform = `translateX(100%)`;
    currentStep = 4;
    activateCarouselIndicator(currentStep);
    carousel.setAttribute("move-step", currentStep);
  } else {
    carousel.style.transform = `translateX(${100 * ((currentStep - 2) / 3)}%)`;
    currentStep--;
    activateCarouselIndicator(currentStep);
    carousel.setAttribute("move-step", currentStep);
  }
});

carouselindicatorsBtns.forEach((indicator) => {
  indicator.addEventListener("click", function () {
    var currentStep = Number(indicator.getAttribute("data-index"));
    var activeIndicator = document.querySelector(
      "button.carousel-indicator[aria-selected='true']",
    );

    console.log(currentStep);
    console.log(activeIndicator);

    if (Number(activeIndicator.getAttribute("data-index")) !== currentStep) {
      carousel.style.transform = `translateX(${100 * ((currentStep - 1) / 3)}%)`;
      activateCarouselIndicator(currentStep);
    }
  });
});

function activateCarouselIndicator(currentStep) {
  carouselindicatorsBtns.forEach((indicator) => {
    indicator.classList.remove("active", "bg-accent", "scale-125");
    indicator.classList.add("bg-slate-400", "dark:bg-slate-600");
    indicator.setAttribute("aria-selected", "false");
    if (Number(indicator.getAttribute("data-index")) === currentStep) {
      indicator.classList.add("active", "bg-accent", "scale-125");
      indicator.classList.remove("bg-slate-400", "dark:bg-slate-600");
      indicator.setAttribute("aria-selected", "true");
    }
  });
}
//#endregion

//#region Reset Button
document
  .getElementById("reset-settings")
  .addEventListener("click", function () {
    localStorage.setItem("font", "font-tajawal");
    localStorage.setItem("theme", "dark");
    localStorage.setItem("themeColor", JSON.stringify(colors[0]));

    applyFont("tajawal");
    setDocumentColor(colors[0].primary, colors[0].secondary, colors[0].accent);
    setColorBtnActive(colors[0].name);
    htmlTag.classList.add("dark");
  });
//#endregion
