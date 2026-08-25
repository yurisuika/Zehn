import { FIND, STORE, TOGGLE, CREATE, MOVE } from '../lib/util.js';

/* COPY LEGACY SLIDER TRACK WIDTH AS VARIABLE TO CONTAINER ---------------------------------------------------------- */

FIND.findRootsAndTargets('.DialogSlider_Slider', '.DialogSlider_Grabber', (root, target) => {
  function syncVariable() {
    const VALUE = target.style.getPropertyValue('--position').trim();

    if (VALUE) {
      root.style.setProperty('--value', VALUE);
    } else {
      root.style.removeProperty('--value');
    }
  };

  syncVariable();

  const OBSERVER = new MutationObserver((mutations) => {
    if (mutations.some(mutation => mutation.attributeName === 'style')) {
      syncVariable();
    }
  });

  OBSERVER.observe(target, {
    attributes: true,
    attributeFilter: ['style']
  });
});