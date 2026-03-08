const Zehn = {
  addUserAgent() {
    if (navigator.userAgent.includes('Linux')) {
      document.documentElement.classList.add('Linux');
    } else if (navigator.userAgent.includes('Windows')) {
      document.documentElement.classList.add('Windows');
    }
  },

  waitAndCallback(rootSelector, targetSelector, callback) {
    const roots = document.querySelectorAll(rootSelector);
    if (roots.length > 0) {
      roots.forEach((root) => {
        const targets = root.querySelectorAll(targetSelector);
        
        return new Promise((resolve) => {
            if (root && targets.length > 0) {
                targets.forEach((target) => callback(root, target));
                return resolve(targets);
            }

            const observer = new MutationObserver((mutations) => {
                const newTargets = root.querySelectorAll(targetSelector);
                if (newTargets.length > 0) {
                    newTargets.forEach((target) => callback(root, target));
                    observer.disconnect();
                    resolve(newTargets);
                }
            });

            observer.observe(document.body, { childList: true, subtree: true });
        }).then((elements) => {
            const observer = new MutationObserver(() => {
                const updatedTargets = root.querySelectorAll(targetSelector);
                updatedTargets.forEach((target) => callback(root, target));
            });
            observer.observe(document, { subtree: true, attributes: true });
        });
      });
    }
  },

  waitAndCheckAdditionAndCallback(rootSelector, targetSelector, additionSelector, callback) {
    Zehn.waitAndCallback(rootSelector, targetSelector, (root, target) => {
      const addition = target.querySelector(additionSelector);
      if (!addition) {
        callback(root, target, additionSelector);
      }
    });
  },

  addButton(rootSelector, targetSelector, additionSelector, position, defaultToggled, callback) {
    Zehn.waitAndCheckAdditionAndCallback(rootSelector, targetSelector, additionSelector, (root, target, additionSelector) => {
      const button = document.createElement('button');
      const buttonName = additionSelector.slice(1);
      const buttonSelectorIsId = additionSelector.charAt(0) === '#';

      button.classList.add('zehnButton');
      if (buttonSelectorIsId) {
        button.id = buttonName;
      } else {
        button.classList.add(buttonName);
      }
      if (defaultToggled) {
        button.classList.add('zehnToggled');
      }
      button.name = 'button';
      button.onclick = () => callback(root, target, button);
      if (position) {
        target.append(button);
      } else {
        target.prepend(button);
      }

      const icon = document.createElement('div');
      if (buttonSelectorIsId) {
        icon.id = `${buttonName}Icon`;
      } else {
        icon.classList.add(`${buttonName}Icon`);
      }
      button.append(icon);
    });
  },

  addRootClassOnToggle(root, target, button, buttonTargetToggleName) {
    button.classList.toggle('zehnToggled');
    if (button.classList.contains('zehnToggled')) {
      if (!root.classList.contains(`${buttonTargetToggleName}`)) {
        root.classList.add(`${buttonTargetToggleName}`);
      }
    } else {
      if (root.classList.contains(`${buttonTargetToggleName}`)) {
        root.classList.remove(`${buttonTargetToggleName}`);
      }
    }
  },

  checkButtonToggle(rootSelector, targetSelector, buttonSelector, additionName) {
    Zehn.waitAndCallback(rootSelector, targetSelector, (root, target) => {
      if (target) {
        if (target.classList.contains(additionName)) {
          const button = target.querySelector(buttonSelector);
          if (button) {
            if (!button.classList.contains('zehnToggled')) {
              button.classList.add('zehnToggled');
            }
          }
        }
      }
    });
  },

  moveAppend(rootSelector, targetSelector, movingSelectors) {
    Zehn.waitAndCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((selector) => {
        root.querySelectorAll(selector).forEach((element) => {
          target.appendChild(element || '');
        })
      });
    });
  },

  movePrepend(rootSelector, targetSelector, movingSelectors) {
    Zehn.waitAndCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((selector) => {
        root.querySelectorAll(selector).forEach((element) => {
          target.prepend(element || '');
        })
      });
    });
  },

  moveBefore(rootSelector, targetSelector, movingSelectors) {
    Zehn.waitAndCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((selector) => {
        root.querySelectorAll(selector).forEach((element) => {
          target.before(element || '');
        })
      });
    });
  },

  removeTarget(rootSelector, targetSelector, count, last) {
    Zehn.waitAndCallback(rootSelector, targetSelector, (root, target) => {
      if (target && target.hasChildNodes && target.childElementCount > count) {
        target[count - last].remove();
      }
    });
  }
};

export default Zehn;