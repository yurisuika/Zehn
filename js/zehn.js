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

  appendElements(target, classes) {
    classes.forEach((name) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelector(`${target}`).appendChild(document.querySelector(`${name}`));
      }
    });
  },

  prependElements(target, classes) {
    classes.forEach((name) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelector(`${target}`).prepend(document.querySelector(`${name}`));
      }
    });
  },

  appendChildElements(target, classes) {
    classes.forEach((name) => {
      if (document.querySelector(`${target}`) != null) {
        document.querySelector(`${target}`).firstChild.appendChild(document.querySelector(`${name}`));
      }
    });
  },

  addUserAgent() {
    if (navigator.userAgent.includes('Linux')) {
      document.documentElement.classList.add('Linux');
    } else if (navigator.userAgent.includes('Windows')) {
      document.documentElement.classList.add('Windows');
    }
  },

  createButton(target, addition, callback) {
    Zehn.waitForElement(`${target}`).then((element) => {
      var observer = new MutationObserver(function(mutations, observer) {
        if (document.querySelector(`${target}`) != null) {
          if (document.querySelector(`${target}`).querySelector(`${addition}`) == null) {
              callback(`${target}`);
          }
        }
      });
      observer.observe(document, {subtree: true, attributes: true});
    });
  }
};

export default Zehn;