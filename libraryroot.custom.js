import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';
import Zehn from './js/Zehn.js';

if (navigator.userAgent.includes("Linux")) {
  document.documentElement.classList.add("Linux");
} else if (navigator.userAgent.includes("Windows")) {
  document.documentElement.classList.add("Windows");
}

Zehn.waitForElement('[class*="appproperties_AppProperties_"]').then((element) => {
  let cells = document.querySelectorAll('[class*="pagedsettings_PagedSettingsDialog_PageListItem_"]');
  console.log(cells);
  [].forEach.call(cells, function (el) {
    if(el.innerText.indexOf("Privacy") !== -1) {
      el.style.backgroundImage = "var(--icon-privacy)";
      console.log(el)
    }
    if(el.innerText.indexOf("Workshop") !== -1) {
      el.style.backgroundImage = "var(--icon-store)";
      console.log(el)
    }
    if(el.innerText.indexOf("DLC") !== -1) {
      el.style.backgroundImage = "var(--icon-shop)";
      console.log(el)
    }
    if(el.innerText.indexOf("Controller") !== -1) {
      el.style.backgroundImage = "var(--icon-controller)";
      console.log(el)
    }
    if(el.innerText.indexOf("Betas") !== -1) {
      el.style.backgroundImage = "var(--icon-update-dev)";
      console.log(el)
    }
    if(el.innerText.indexOf("Installed Files") !== -1) {
      el.style.backgroundImage = "var(--icon-apps-all)";
      console.log(el)
    }
    if(el.innerText.indexOf("Updates") !== -1) {
      el.style.backgroundImage = "var(--icon-update)";
      console.log(el)
    }
    if(el.innerText.indexOf("Compatibility") !== -1) {
      el.style.backgroundImage = "var(--icon-switch)";
      console.log(el)
    }
    if(el.innerText.indexOf("General") !== -1) {
      el.style.backgroundImage = "var(--icon-home)";
      console.log(el)
    }
  });
});

function addButtonSidebar() {
  var btn = document.createElement("button");
  btn.classList.add("ZehnButton");
  btn.id = "toggleSidebar";
  btn.type = "button";
  btn.value = "close";
  btn.name = "button";
  btn.onclick = function () {
    var btnSidebar = document.getElementById("toggleSidebar");
    var btnLibrary = document.getElementById("toggleLibrary");
    var sidebar = document.querySelector(`[class*="library_LeftListSizableContainer_"]`);
    if (btnSidebar.value == "close") {
      btnSidebar.value = "open";
      btnLibrary.value = "open";
      btnLibrary.style.display = "block";
      sidebar.style.setProperty("transform", "scaleX(0)", "important");
      sidebar.style.setProperty("min-width", "0px", "important");
      sidebar.style.setProperty("max-width", "0px", "important");
    }
    else if (btnSidebar.value = "open") {
      btnSidebar.value = "close";
      btnLibrary.value = "close";
      btnLibrary.style.display = "none";
      sidebar.style.setProperty("transform", "none", "important");
      sidebar.style.setProperty("min-width", "256px", "important");
      sidebar.style.setProperty("max-width", "calc(min(50%, 100% - 400px))", "important");
    }
  };
  document.querySelector(`[class*="gamelistbar_HomeBox_"]`).after(btn);
  var icon = document.createElement("div");
  icon.id = "toggleSidebarIcon";
  document.getElementById("toggleSidebar").append(icon);
}

Zehn.waitForElement('[class*="gamelistbar_HomeBox_"]').then((element) => {
  addButtonSidebar()
});

function addButtonLibrary() {
  var btn = document.createElement("button");
  btn.classList.add("ZehnButton");
  btn.classList.add("DialogButton");
  btn.id = "toggleLibrary";
  btn.type = "button";
  btn.value = "close";
  btn.name = "button";
  btn.onclick = function () {
    var btnSidebar = document.getElementById("toggleSidebar");
    var btnLibrary = document.getElementById("toggleLibrary");
    var sidebar = document.querySelector(`[class*="library_LeftListSizableContainer_"]`);
    if (btnLibrary.value == "close") {
      btnSidebar.value = "open";
      btnLibrary.value = "open";
      btnLibrary.style.display = "block";
      sidebar.style.setProperty("transform", "scaleX(0)", "important");
      sidebar.style.setProperty("min-width", "0px", "important");
      sidebar.style.setProperty("max-width", "0px", "important");
    }
    else if (btnLibrary.value = "open") {
      btnSidebar.value = "close";
      btnLibrary.value = "close";
      btnLibrary.style.display = "none";
      sidebar.style.setProperty("transform", "none", "important");
      sidebar.style.setProperty("min-width", "256px", "important");
      sidebar.style.setProperty("max-width", "calc(min(50%, 100% - 400px))", "important");
    }
  };
  document.querySelector(`[class*="library_AppDetailsMain_"]`).append(btn);
  var icon = document.createElement("div");
  icon.id = "toggleLibraryIcon";
  document.getElementById("toggleLibrary").append(icon);
}

Zehn.waitForElement('[class*="library_AppDetailsMain_"]').then((element) => {
  addButtonLibrary()
});

Zehn.waitForElement('[class*="steamdesktop_TitleBarControls_"]').then((element) => {
  Zehn.appendElements(
    '[class*="steamdesktop_TitleBarControls_"]',
    [
      '[class*="titlebarcontrols_NotificationButtonContainer_"]',
      '[class*="bottombar_FriendsButton_"]',
      '[class*="bottombar_DownloadStatus_"]',
      '[class*="bottombar_AddGameButton_"]',
      '[class*="titlebarcontrols_SoundtrackControls_"]',
      '[class*="titlebarcontrols_AnnouncementsButton_"]',
      '[class*="titlebarcontrols_VRToggle_"]',
      '[class*="titlebarcontrols_GamepadUIToggle_"]'
    ]
  )
});

Zehn.waitForElement('.OverlayBrowser_Browser .TitleBar.title-area').then((element) => {
  Zehn.prependElements(
    '.OverlayBrowser_Browser .TitleBar.title-area',
    [
      '[class*="desktopbrowser_BrowserTabs_"]'
    ]
  )
});

Zehn.waitForElement('.TabbedPopupBrowser .TitleBar.title-area').then((element) => {
  Zehn.prependElements(
    '.TabbedPopupBrowser .TitleBar.title-area',
    [
      '[class*="desktopbrowser_BrowserTabs_"]'
    ]
  )
});

// document.querySelector(".rootmenu_RootMenuButton_2UyOB").style.border = "1px solid transparent";
// document.querySelector(".DialogButton").style.border = "1px solid transparent";

// let FR1 = new RevealEffects("body", {
//     selector: document.querySelectorAll('.rootmenu_RootMenuButton_2UyOB')[0],
//     backgroundGradientSize: 150,
//     borderGradientSize: 80,
//     borderLightColor: "rgba(255, 255, 255, 0.25)",
//     backgroundLightColor: "rgba(255, 255, 255, 0.25)"
// });

// let FR2 = new RevealEffects("body", {
//     // selector: document.getElementById('.testOne').querySelectorAll('.testTwo')[0],
//     selector: document.querySelectorAll('.contextmenu_contextMenuItem_pFo3k')[0],
//     backgroundGradientSize: 150,
//     borderGradientSize: 80,
//     borderLightColor: "rgba(255, 255, 255, 0.25)",
//     backgroundLightColor: "rgba(255, 255, 255, 0.25)"
// });

// let FR3 = new RevealEffects(".contextmenu_contextMenuContents_2y2tU", {
//     selector: document.querySelectorAll('.contextmenu_contextMenuItem_pFo3kS')[1],
//     backgroundGradientSize: 150,
//     borderGradientSize: 80,
//     borderLightColor: "rgba(255, 255, 255, 0.75)",
//     backgroundLightColor: "rgba(255, 255, 255, 0.75)"
// });

// let FR4 = new RevealEffects("body", {
//     selector: document.querySelectorAll('.menu_MenuItem_2jXHP')[1],
//     backgroundGradientSize: 150,
//     borderGradientSize: 80,
//     borderLightColor: "rgba(255, 255, 255, 0.75)",
//     backgroundLightColor: "rgba(255, 255, 255, 0.75)"
// });

// let FR_ROOT = new RevealEffects("body", {
//     selector: document.querySelectorAll('.rootmenu_RootMenuButton_2UyOB')[0],
//     backgroundGradientSize: 150,
//     borderGradientSize: 80,
//     borderLightColor: "rgba(255, 255, 255, 0.25)",
//     backgroundLightColor: "rgba(255, 255, 255, 0.25)"
// });

// let FR_BUTTON = new RevealEffects("body", {
//     selector: document.querySelectorAll('.DialogButton')[0],
//     backgroundGradientSize: 150,
//     borderGradientSize: 80,
//     borderLightColor: "rgba(255, 255, 255, 0.25)",
//     backgroundLightColor: "rgba(255, 255, 255, 0.25)"
// });