import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';

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

moveElements(
  '[class*="steamdesktop_TitleBarControls_"]',
  [
    '[class*="titlebarcontrols_AnnouncementsButton_"]',
    '[class*="titlebarcontrols_NotificationButtonContainer_"]',
    // '[class*="titlebarcontrols_AccountMenu_"]',
    '[class*="bottombar_DownloadStatus_"]',
    '[class*="bottombar_FriendsButton_"]',
    '[class*="bottombar_AddGameButton_"]',
    '[class*="titlebarcontrols_VRToggle_"]',
    '[class*="titlebarcontrols_GamepadUIToggle_"]'
    // '[class*="titlebarcontrols_WalletBalance_"]',
    // '[class*="bottombar_Status_"]'
  ]
)

moveChildElements(
  '[class*="libraryhome_LibraryHome_"]',
  [
    '[class*="libraryhomeshowcases_AddShowcaseRow_"]'
  ]
)

moveElements(
  '[class*="steamdesktop_DragArea_"]',
  [
    '[class*="bottombar_DetailedDownloadProgress_"]'
  ]
)

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