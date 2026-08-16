/* HTML Elements */
let htmlTag = document.querySelector("html");
let settingsBtn = document.getElementById("settings-toggle");
let closeSettingsBtn = document.getElementById("close-settings");
let sideBar = document.getElementById("settings-sidebar");
let bodyElement = document.body;
let fontButtons = Array.from(document.querySelectorAll("button.font-option"));

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

/*Methods*/

document.addEventListener("DOMContentLoaded", function () {
  reportSectionsData();
  adjustStartupDarkMode();
  adjustStartupFonts();
  addActiveClass();
});

/*Get Sections Data */
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

/*Scroll Spy Methods*/
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
window.addEventListener("scroll", function () {
  addActiveClass();
  if (window.scrollY > heroSection.scrollHeight) toggleToTopButtonOn();
  else {
    toggleToTopButtonOff();
  }
});

/*Settings Toggles */
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

/* Themes Switch Methods*/
document
  .getElementById("theme-toggle-button")
  .addEventListener("click", function (e) {
    var isDark = htmlTag.classList.toggle("dark");
    var theme = "";
    if (isDark) theme = "dark";
    else theme = "light";
    localStorage.setItem("theme", theme);
  });

document.getElementById;

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
    btn.classList.remove("active","border-primary","bg-slate-50","dark:bg-slate-800");
    btn.classList.add("border-slate-200","dark:border-slate-700");
  });
  document
    .querySelector(`button.font-option[data-font='${fontName}']`)
    .classList.add("active","border-primary","bg-slate-50","dark:bg-slate-800");

  document
    .querySelector(`button.font-option[data-font='${fontName}']`)
    .classList.remove("border-slate-200","dark:border-slate-700");
  return usedFont;
}

fontButtons.forEach(btn => {
btn.addEventListener('click', function(e){
  var usedFont = applyFont(e.currentTarget.getAttribute('data-font'));
  localStorage.setItem("font", usedFont);
})
})