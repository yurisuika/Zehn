import { Reveal } from './reveal.js';
import { RevealHeader } from './revealHeader.js';

const Zehn = {
  waitForElement(selector) {
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
  },

  waitAndObserve(wait, target, classes, callback) {
    Zehn.waitForElement(wait).then((element) => {
      var observer = new MutationObserver(function(mutations, observer) {
        callback();
      });
      observer.observe(document, {subtree: true, attributes: true});
    });
  },

  appendElements(target, classes) {
    classes.forEach((name) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelector(`${target}`).appendChild(document.querySelector(`${name}`) || '');
      }
    });
  },

  prependElements(target, classes) {
    classes.forEach((name) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelector(`${target}`).prepend(document.querySelector(`${name}`) || '');
      }
    });
  },

  appendChildElements(target, classes) {
    classes.forEach((name) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelector(`${target}`).before(document.querySelector(`${name}`) || '');
      }
    });
  },

  moveAppend(wait, target, classes) {
    Zehn.waitAndObserve(wait, target, classes, () => Zehn.appendElements(target, classes));
  },

  movePrepend(wait, target, classes) {
    Zehn.waitAndObserve(wait, target, classes, () => Zehn.prependElements(target, classes));
  },

  moveBefore(wait, target, classes) {
    Zehn.waitAndObserve(wait, target, classes, () => Zehn.beforeElements(target, classes));
  },

  addUserAgent() {
    if (navigator.userAgent.includes('Linux')) {
      document.documentElement.classList.add('Linux');
    } else if (navigator.userAgent.includes('Windows')) {
      document.documentElement.classList.add('Windows');
    }
  },

  createReveal(target, button) {
    var color = getComputedStyle(document.body).getPropertyValue('--color-negative');
    Zehn.waitAndObserve(target, button, [], () => {
      document.querySelectorAll(`${button}`).forEach((element) => {
        let FR = new Reveal('body', {
            selector: element,
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderAcrylicColor: 'rgba(var(--color-negative), 0.25)',
            backgroundAcrylicColor: 'rgba(var(--color-negative), 0.1)'
        });
      });
    });
  },

  createRevealBorder(target, button) {
    var color = getComputedStyle(document.body).getPropertyValue('--color-negative');
    Zehn.waitAndObserve(target, button, [], () => {
      document.querySelectorAll(`${button}`).forEach((element) => {
        let FR = new Reveal('body', {
            selector: element,
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderAcrylicColor: 'rgba(var(--color-negative), 0.25)',
            backgroundAcrylicColor: 'transparent'
        });
      });
    });
  },

  createRevealHeader(target, button) {
    var color = getComputedStyle(document.body).getPropertyValue('--color-negative');
    Zehn.waitAndObserve(target, button, [], () => {
      document.querySelectorAll(`${button}`).forEach((element) => {
        let FR = new RevealHeader('body', {
            selector: document.querySelectorAll(`${target}`),
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderAcrylicColor: 'rgba(var(--color-negative), 0.25)',
            backgroundAcrylicColor: 'rgba(var(--color-negative), 0.1)',
            childrenSelector: element
        });
      });
    });
  },

  createButton(target, button, callback) {
    Zehn.waitAndObserve(target, button, [], () => {
      if (document.querySelector(`${target}`) != null) {
        if (document.querySelector(`${target} ${button}`) == null) {
            callback(target);
        }
      }
    });
  }
};

export default Zehn;