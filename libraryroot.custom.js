import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';

function moveElements(target, classes) {
  classes.forEach((name) => {
    document.querySelector(`.${target}`).appendChild(document.querySelector(`.${name}`));
  });
}

moveElements(
  'steamdesktop_DragArea_30vB9',
  [
    'bottombar_AddGameButton_2foCk',
    'bottombar_DownloadStatus_2EQ7g',
    'bottombar_FriendsButton_1TdaA',
    'titlebarcontrols_NotificationButtonContainer_3mGEz',
    'titlebarcontrols_AnnouncementsButton_5wILZ',
    'titlebarcontrols_AccountMenu_3yD46',
    'bottombar_DetailedDownloadProgress_2VtAq'
  ]
)

moveElements(
  'libraryhome_LibraryHome_3Sb2o',
  [
    'libraryhomeshowcases_AddShowcaseRow_3SkuN'
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