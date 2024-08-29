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
      document.querySelector(`${target}`).appendChild(document.querySelector(`${name}`));
    });
  },

  prependElements(target, classes) {
    classes.forEach((name) => {
      document.querySelector(`${target}`).prepend(document.querySelector(`${name}`));
    });
  },

  appendChildElements(target, classes) {
    classes.forEach((name) => {
      document.querySelector(`${target}`).firstChild.appendChild(document.querySelector(`${name}`));
    });
  }
};
export default Zehn;