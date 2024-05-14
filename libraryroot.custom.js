import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';
import Zehn from './js/zehn.js';

if (navigator.userAgent.includes("Linux")) {
  document.documentElement.classList.add("Linux");
} else if (navigator.userAgent.includes("Windows")) {
  document.documentElement.classList.add("Windows");
}

Zehn.waitForElement('._1FyBL6obxHQ2Z2CsaV2Gbz').then((element) => {
  let cells = document.querySelectorAll('.bkfjn0yka2uHNqEvWZaTJ');
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
    var sidebar = document.querySelector(`._9sPoVBFyE_vE87mnZJ5aB`);
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
  document.querySelector(`._3AhYljPF4e4E8LaBt-FoY0`).after(btn);
  var icon = document.createElement("div");
  icon.id = "toggleSidebarIcon";
  document.getElementById("toggleSidebar").append(icon);
}

Zehn.waitForElement('._3AhYljPF4e4E8LaBt-FoY0').then((element) => {
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
    var sidebar = document.querySelector(`._9sPoVBFyE_vE87mnZJ5aB`);
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
  document.querySelector(`._2Nq6ov7A1hGcHXVOXNt_OE`).append(btn);
  var icon = document.createElement("div");
  icon.id = "toggleLibraryIcon";
  document.getElementById("toggleLibrary").append(icon);
}

Zehn.waitForElement('._2Nq6ov7A1hGcHXVOXNt_OE').then((element) => {
  addButtonLibrary()
});

Zehn.waitForElement('._3cykd-VfN_xBxf3Qxriccm').then((element) => {
  Zehn.appendElements(
    '._3cykd-VfN_xBxf3Qxriccm',
    [
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3mGEzzp18imtSzGPkduedi)', // NOTIFICATIONS
      '._1TdaAqMFadi0UTqilrkelR', // FRIENDS
      '._2EQ7ghgqIdjKv9jsQC0Zq9', // DOWNLOADS
      '._2foCkpRXhqq0UGVE50BWqj', // ADD GAME
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._5wILZhsLODVwGfcJ0hKmJ)', // ANNOUNCEMENTS
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3LKQ3S_yqrebeNLF6aeiog)' // BIG PICTURE
    ]
  )
});

Zehn.waitForElement('._3lRfTo8Wo3phXfE1DvK6QW').then((element) => {
  Zehn.appendElements(
    '._3cykd-VfN_xBxf3Qxriccm',
    [
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(._3lRfTo8Wo3phXfE1DvK6QW)' // VR
    ]
  )
});

Zehn.waitForElement('.Utdt7JrpIm5JlpQmqyj1v').then((element) => {
  Zehn.appendElements(
    '._3cykd-VfN_xBxf3Qxriccm',
    [
      '._3cykd-VfN_xBxf3Qxriccm .Focusable:has(.Utdt7JrpIm5JlpQmqyj1v)' // SOUNDTRACK
    ]
  )
});

Zehn.waitForElement('.OverlayBrowser_Browser .TitleBar.title-area').then((element) => {
  Zehn.prependElements(
    '.OverlayBrowser_Browser .TitleBar.title-area',
    [
      '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
    ]
  )
});

Zehn.waitForElement('.TabbedPopupBrowser .TitleBar.title-area').then((element) => {
  Zehn.prependElements(
    '.TabbedPopupBrowser .TitleBar.title-area',
    [
      '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
    ]
  )
});