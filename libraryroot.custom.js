import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';

function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }
    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });
    observer.observe(document.body, {childList: true, subtree: true});
  });
}

waitForElement('[class*="appproperties_AppProperties_"]').then((element) => {
  let cells = document.querySelectorAll('[class*="pagedsettings_PagedSettingsDialog_PageListItem_"]');
  console.log(cells);
  [].forEach.call(cells, function (el) {
    if(el.innerText.indexOf("Privacy") !== -1) {
      el.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqElEQVQ4jcWT0Q3DIAxEDRvQEbICK2SFrJBZsgIZoStkBVboCqzw+mO3CJGKKh85CSHMnc+2wAFyBf6SugdgBV5A4YuisfWXMCqxABsQm7utuo+teFGnNFBhUu5igWCuf7Rp1QTLmBtCAHI1gwyEhpOB5EVkFpG9MXnq/tBVxwy7iMxC5yGo61SdpzOed865kb57ONUCh/VdzeMYzjwyxE8Vt/+F+xO8AY8A2x0G9QFzAAAAAElFTkSuQmCC')";
      console.log(el)
    }
    if(el.innerText.indexOf("Workshop") !== -1) {
      el.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAg0lEQVQ4je2TXQ2AMAyErwQDIAFPaMETGpCABTQg4eOlg8L4Ca+EL1l2zS7tZdkEKAFUwMjGFPQIVMErQIX29L7XvmZJg+t4vnFIANCEusENUccEWYOTAVxoAbI0IIv2jElSuVZmducGSJ6Y5HiJr/kbfKsB0D6ZgTbz+ZvueEeX/sICJzSyl2iBYIMAAAAASUVORK5CYII=')";
      console.log(el)
    }
    if(el.innerText.indexOf("DLC") !== -1) {
      el.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgElEQVQ4je2T0Q2AIAxEr8YFnMUVXIEV2H+D80PQWg6MiZ9e0kC46wM+aiQBAGaGKJI0YdQeAJiarpf6AV8DSK6jsPRJ1tp4KDmPbp+Kv7meCxBCyQPEuQbEcFzFq1tACWTelTvf1oAAycJ7BpTg0jk/y0bT2JO/cA6GfopTHO8dqCLgMZAfyWYAAAAASUVORK5CYII=')";
      console.log(el)
    }
    if(el.innerText.indexOf("Controller") !== -1) {
      el.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAABA0lEQVQ4jaWTMU7DQBBF36ZCUAAnoEBCiIYWfApEB+fgEnCIVKkdXyDp4rTQgEJPEwmBKEi6R+GxZaIokGSkX+zMn7+a/bNJZZvobNW9ROAOKIEBkLXyWeTGwWkitUYYA2fAM7ALnAA7UZsDr8A3cApMgAsAVNRMnasPcV6F++BmaiPQVydLyH01X5J/iVoj8KZ2/3F7ja46rQVu1NkazTU+1duklsAecL6mg49A6gDHQG/BsjzsHAdKoL9gbQ84SlY+plZzAXwA71R7UtcPgEPgGhgFX2L+LDBVixVz58Gp+bOkPgH78Q4j4OqP2Qvgkmqpvmrl4QY2DtRfq7xRbP0bfwC7VGWrQHGArgAAAABJRU5ErkJggg==')";
      console.log(el)
    }
    if(el.innerText.indexOf("Betas") !== -1) {
      el.style.backgroundImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAkElEQVQ4jd2TQQ6DMAwENxWPax8CX+Md8BS499jr9FCnMpaBVL2xkuVktdmspUSAXA3AygcL0Bvv4fVSIFZgNuFsJnIHTw2q4Bn2L2C0fmiw2M0CJktUR8ONtGvQh7hDkm5TBVAAkorrkd/gFolf8bdB16AhWX9HaUlQdnqzwSEubPBIuHuqTJ5n/Y3TCSdAb0ZzR8TLe04OAAAAAElFTkSuQmCC')";
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

waitForElement('[class*="gamelistbar_HomeBox_"]').then((element) => {
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

waitForElement('[class*="library_AppDetailsMain_"]').then((element) => {
  addButtonLibrary()
});

function moveElements(target, classes) {
  classes.forEach((name) => {
    document.querySelector(`${target}`).appendChild(document.querySelector(`${name}`));
  });
}

function moveChildElements(target, classes) {
  classes.forEach((name) => {
    document.querySelector(`${target}`).firstChild.appendChild(document.querySelector(`${name}`));
  });
}

waitForElement('[class*="steamdesktop_TitleBarControls_"]').then((element) => {
  moveElements(
    '[class*="steamdesktop_TitleBarControls_"]',
    [
      '[class*="titlebarcontrols_NotificationButtonContainer_"]',
      '[class*="bottombar_FriendsButton_"]',
      '[class*="bottombar_DownloadStatus_"]',
      '[class*="bottombar_AddGameButton_"]',
      '[class*="titlebarcontrols_AnnouncementsButton_"]',
      '[class*="titlebarcontrols_VRToggle_"]',
      '[class*="titlebarcontrols_GamepadUIToggle_"]'
    ]
  )
});

// moveChildElements(
//   '[class*="libraryhome_LibraryHome_"]',
//   [
//     '[class*="libraryhomeshowcases_AddShowcaseRow_"]'
//   ]
// )

// moveElements(
//   '[class*="steamdesktop_DragArea_"]',
//   [
//     '[class*="bottombar_DetailedDownloadProgress_"]'
//   ]
// )

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