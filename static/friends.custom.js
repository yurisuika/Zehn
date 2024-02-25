import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';
import Zehn from './js/Zehn.js';

if (navigator.userAgent.includes("Linux")) {
  document.documentElement.classList.add("Linux");
} else if (navigator.userAgent.includes("Windows")) {
  document.documentElement.classList.add("Windows");
}

Zehn.waitForElement('.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader').then((element) => {
  Zehn.appendElements(
    '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader',
    [
      '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout'
    ]
  )
});