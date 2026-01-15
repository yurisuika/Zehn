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

  createElement(target, button, callback) {
    Zehn.waitAndObserve(target, () => {
      if (document.querySelector(`${target}`) != null) {
        if (document.querySelector(`${target} ${button}`) == null) {
            callback(target);
        }
      }
    });
  },

  addButton(target, button, buttonIcon, position, callback) {
    var btn = document.createElement('button');
    btn.classList.add('ZehnButton');
    btn.id = `${button}`;
    btn.name = 'button';
    btn.onclick = callback;
    if (position) {
      document.querySelector(`${target}`).append(btn);
    } else {
      document.querySelector(`${target}`).prepend(btn);
    }
    var icon = document.createElement('div');
    icon.id = `${buttonIcon}`;
    document.querySelector(`${target}`).querySelector(`#${button}`).append(icon);
  }
};

export default Zehn;