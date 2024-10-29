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

  setOptions() {
    // var root = document.querySelector(':root');
    // if (getComputedStyle(root).getPropertyValue('--option-avatar-shape').trim() == 'square') {
    //   console.log('Avatars set to square.');
    //   root.style.setProperty('--mask-avatar', 'var(--mask-avatar-square)');
    //   root.style.setProperty('--mask-avatar-status', 'var(--mask-avatar-square-status)');
    //   root.style.setProperty('--mask-avatar-status-mobile', 'var(--mask-avatar-square-status-mobile)');
    //   root.style.setProperty('--group-radius', '0');
    // } else {
    //   console.log('Avatars set to round.');
    //   root.style.setProperty('--mask-avatar', 'var(--mask-avatar-round)');
    //   root.style.setProperty('--mask-avatar-status', 'var(--mask-avatar-round-status)');
    //   root.style.setProperty('--mask-avatar-status-mobile', 'var(--mask-avatar-round-status-mobile)');
    //   root.style.setProperty('--group-radius', '50%');
    // }
  }
};

export default Zehn;