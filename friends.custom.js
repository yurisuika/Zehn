import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';
import Zehn from './js/zehn.js';

if (navigator.userAgent.includes("Linux")) {
  document.documentElement.classList.add("Linux");
} else if (navigator.userAgent.includes("Windows")) {
  document.documentElement.classList.add("Windows");
}

function addButtonUser() {
  var btn = document.createElement("button");
  btn.classList.add("ZehnButton");
  btn.id = "toggleUser";
  btn.type = "button";
  btn.value = "close";
  btn.name = "button";
  btn.onclick = function () {
    var btnUser = document.getElementById("toggleUser");
    var user = document.querySelector(`.currentUserContainer`);
    var voice = document.querySelector(`.activeVoiceControls`);
    if (btnUser.value == "close") {
      btnUser.value = "open";
      user.style.setProperty("transform", "scaleY(0)", "important");
      user.style.setProperty("min-height", "0px", "important");
      user.style.setProperty("height", "0px", "important");
      voice.style.setProperty("transform", "scaleY(0)", "important");
      voice.style.setProperty("min-height", "0px", "important");
      voice.style.setProperty("height", "0px", "important");
    }
    else if (btnUser.value = "open") {
      btnUser.value = "close";
      user.style.setProperty("transform", "none");
      user.style.setProperty("min-height", "48px");
      user.style.setProperty("height", "48px");
      voice.style.setProperty("transform", "none", "important");
      voice.style.setProperty("min-height", "32px", "important");
      voice.style.setProperty("height", "32px", "important");
    }
  };
  document.querySelector(`.currentUserContainer`).before(btn);
  var icon = document.createElement("div");
  icon.id = "toggleUserIcon";
  document.getElementById("toggleUser").append(icon);
}

Zehn.waitForElement('.currentUserContainer').then((element) => {
  addButtonUser()
});

Zehn.waitForElement('.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader').then((element) => {
  Zehn.appendElements(
    '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader',
    [
      '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout'
    ]
  )
});