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

function fuckValve() {
  var bg = document.createElement("div");
  bg.id = "fade";
  bg.style.setProperty("background", "rgba(0, 0, 0, 0.5)");
  bg.style.setProperty("z-index", "9999");
  bg.style.setProperty("position", "absolute");
  bg.style.setProperty("width", "100%");
  bg.style.setProperty("height", "100%");
  bg.style.setProperty("left", "0px");
  bg.style.setProperty("top", "0px");
  bg.style.setProperty("visibility", "var(--option-display-warning-notice)");
  var div = document.createElement("div");
  div.id = "hatedChinee";
  div.style.setProperty("background", "red");
  div.style.setProperty("position", "relative");
  div.style.setProperty("width", "50%");
  div.style.setProperty("margin", "auto");
  div.style.setProperty("min-height", "fit-content");
  div.style.setProperty("transform", "translateY(50%)");
  var btn = document.createElement("button");
  btn.classList.add("ZehnButton");
  btn.id = "close";
  btn.type = "button";
  btn.value = "close";
  btn.name = "button";
  btn.innerHTML = "";
  btn.style.setProperty("height", "38px");
  btn.style.setProperty("width", "38px");
  btn.style.setProperty("position", "absolute");
  btn.style.setProperty("right", "0px");
  btn.style.setProperty("top", "0px");
  var icon = document.createElement("div");
  icon.id = "close";
  icon.style.setProperty("background-image", "var(--icon-window-close)");
  icon.style.setProperty("background-size", "16px");
  icon.style.setProperty("background-repeat", "no-repeat");
  icon.style.setProperty("background-position", "center");
  icon.style.setProperty("width", "38px");
  icon.style.setProperty("height", "38px");
  var text = document.createElement("div");
  text.style.setProperty("color", "white");
  text.style.setProperty("font-size", "16px");
  text.style.setProperty("text-align", "center");
  text.style.setProperty("padding", "38px");
  text.style.setProperty("font-weight", "500");
  var p1 = document.createElement("h1");
  var p2 = document.createElement("h4");
  var p3 = document.createElement("li");
  var p4 = document.createElement("li");
  var p5 = document.createElement("li");
  var p6 = document.createElement("h4");
  p1.innerHTML = "VALVE IS SCREWING WITH SKINNING";
  p2.innerHTML = "Currently in Beta and likely coming to your desktop, Valve has obfuscated all HTML classnames. This makes skinning not only extremely difficult, but breaks all skins. It will take a long time to convert this skin to the new classnames, so in the meantime I suggest you take these steps if you wish to use this skin or any other that has not been fixed:";
  p3.innerHTML = "Back up your Steam folder, minus the \"steamapps\" games directory.";
  p4.innerHTML = "Create a file \"steam.cfg\" in your Steam directory."
  p5.innerHTML = "Edit the file and add the line \"BootStrapperInhibitAll=Enable\" and save."
  p6.innerHTML = "This will stop Steam from updating itself. When Zehn has been remapped to the new classnames, this notice will be removed."
  btn.onclick = function () {
    if (btn.value == "close") {
      btn.value = "open";
      bg.style.setProperty("visibility", "hidden");
    }
    else if (btn.value = "open") {
      btn.value = "close";
      bg.style.setProperty("visibility", "visible");
    }
  };
  document.querySelector(`[class*="steamdesktop_Wrapper_"]`).after(bg);
  bg.append(div);
  div.append(text);
  text.append(p1);
  text.append(p2);
  text.append(p3);
  text.append(p4);
  text.append(p5);
  text.append(p6);
  div.append(btn);
  btn.append(icon);
}

Zehn.waitForElement('[class*="steamdesktop_Wrapper_"]').then((element) => {
  fuckValve()
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
      '[class*="steamdesktop_TitleBarControls_"] .Focusable:has([class*="titlebarcontrols_NotificationButtonContainer_"])',
      '[class*="bottombar_FriendsButton_"]',
      '[class*="bottombar_DownloadStatus_"]',
      '[class*="bottombar_AddGameButton_"]',
      '[class*="steamdesktop_TitleBarControls_"] .Focusable:has([class*="titlebarcontrols_AnnouncementsButton_"])',
      '[class*="steamdesktop_TitleBarControls_"] .Focusable:has([class*="titlebarcontrols_GamepadUIToggle_"])'
    ]
  )
});

Zehn.waitForElement('[class*="titlebarcontrols_VRToggle_"]').then((element) => {
  Zehn.appendElements(
    '[class*="steamdesktop_TitleBarControls_"]',
    [
      '[class*="steamdesktop_TitleBarControls_"] .Focusable:has([class*="titlebarcontrols_VRToggle_"])'
    ]
  )
});

Zehn.waitForElement('[class*="titlebarcontrols_SoundtrackControls_"]').then((element) => {
  Zehn.appendElements(
    '[class*="steamdesktop_TitleBarControls_"]',
    [
      '[class*="steamdesktop_TitleBarControls_"] .Focusable:has([class*="titlebarcontrols_SoundtrackControls_"])'
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