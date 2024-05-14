import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';
import Zehn from './js/zehn.js';

if (navigator.userAgent.includes("Linux")) {
  document.documentElement.classList.add("Linux");
} else if (navigator.userAgent.includes("Windows")) {
  document.documentElement.classList.add("Windows");
}

let FR_NOTIFICATION = new RevealEffects("body", {
    selector: document.querySelectorAll("._1OOQPJx0nCNP9ME9toCmV7")[0],
    backgroundGradientSize: 150,
    borderGradientSize: 80,
    borderLightColor: "rgba(255, 255, 255, 0.25)",
    backgroundLightColor: "rgba(255, 255, 255, 0.25)"
});