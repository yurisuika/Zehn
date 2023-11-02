import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';

let FR_NOTIFICATION = new RevealEffects("body", {
    selector: document.querySelectorAll('[class*="desktoptoasts_DesktopToastPopup_"]')[0],
    backgroundGradientSize: 150,
    borderGradientSize: 80,
    borderLightColor: "rgba(255, 255, 255, 0.25)",
    backgroundLightColor: "rgba(255, 255, 255, 0.25)"
});