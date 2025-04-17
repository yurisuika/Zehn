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

  waitAndObserve(wait, callback) {
    Zehn.waitForElement(wait).then((element) => {
      var observer = new MutationObserver(function(mutations, observer) {
        callback();
      });
      observer.observe(document, {subtree: true, attributes: true});
    });
  },

  appendElements(target, classes) {
    classes.forEach((selector) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelectorAll(`${selector}`).forEach((sub) => {
        document.querySelector(`${target}`).appendChild(sub || '');
        })
      }
    });
  },

  prependElements(target, classes) {
    classes.forEach((selector) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelectorAll(`${selector}`).forEach((sub) => {
        document.querySelector(`${target}`).prepend(sub || '');
        })
      }
    });
  },

  beforeElements(target, classes) {
    classes.forEach((selector) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelectorAll(`${selector}`).forEach((sub) => {
        document.querySelector(`${target}`).before(sub || '');
        })
      }
    });
  },

  moveAppend(wait, target, classes) {
    Zehn.waitAndObserve(wait, () => Zehn.appendElements(target, classes));
  },

  movePrepend(wait, target, classes) {
    Zehn.waitAndObserve(wait, () => Zehn.prependElements(target, classes));
  },

  moveBefore(wait, target, classes) {
    Zehn.waitAndObserve(wait, () => Zehn.beforeElements(target, classes));
  },

  removeOld(wait, target, classes) {
    Zehn.waitAndObserve(wait, () => {
      classes.forEach((selector) => {
        var removable = document.querySelectorAll(`${target} ${selector}`);
        if (removable != null) {
          if (removable.length > 1) {
            removable[0].remove();
          }
        }
      });
    });
  },

  addUserAgent() {
    if (navigator.userAgent.includes('Linux')) {
      document.documentElement.classList.add('Linux');
    } else if (navigator.userAgent.includes('Windows')) {
      document.documentElement.classList.add('Windows');
    }
  },

  createReveal(target, button) {
    Zehn.waitAndObserve(target, () => {
      document.querySelectorAll(`${button}`).forEach((element) => {
        let FR = new Reveal('body', {
            selector: element,
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderAcrylicColor: 'var(--zehn-color-reveal-border)',
            backgroundAcrylicColor: 'var(--zehn-color-reveal-background)'
        });
      });
    });
  },

  createRevealBorder(target, button) {
    Zehn.waitAndObserve(target, () => {
      document.querySelectorAll(`${button}`).forEach((element) => {
        let FR = new Reveal('body', {
            selector: element,
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderAcrylicColor: 'var(--zehn-color-reveal-notification-border)',
            backgroundAcrylicColor: 'var(--zehn-color-reveal-notification-background)'
        });
      });
    });
  },

  createRevealHeader(target, button) {
    Zehn.waitAndObserve(target, () => {
      document.querySelectorAll(`${button}`).forEach((element) => {
        let FR = new RevealHeader('body', {
            selector: document.querySelectorAll(`${target}`),
            backgroundGradientSize: 150,
            borderGradientSize: 80,
            borderAcrylicColor: 'var(--zehn-color-reveal-border)',
            backgroundAcrylicColor: 'var(--zehn-color-reveal-background)',
            childrenSelector: element
        });
      });
    });
  },

  createElement(target, button, callback) {
    Zehn.waitAndObserve(target, () => {
      if (document.querySelector(`${target}`) != null) {
        if (document.querySelector(`${target} ${button}`) == null) {
            callback(target);
        }
      }
    });
  }
};

export default Zehn;