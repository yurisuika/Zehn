import { RevealEffects } from './js/revealDirect.js';
import { RevealEffectsMasked } from './js/revealMasked.js';
import Zehn from './js/zehn.js';

Zehn.addUserAgent();

Zehn.setOptions();

let FR_NOTIFICATION = new RevealEffects('body', {
    selector: document.querySelectorAll('._1OOQPJx0nCNP9ME9toCmV7')[0],
    backgroundGradientSize: 150,
    borderGradientSize: 80,
    borderLightColor: 'rgba(255, 255, 255, 0.25)',
    backgroundLightColor: 'rgba(255, 255, 255, 0.25)'
});