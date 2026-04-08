const Zehn = {
  addUserAgent() {
    if (navigator.userAgent.includes('Linux')) {
      document.documentElement.classList.add('Linux');
    } else if (navigator.userAgent.includes('Windows')) {
      document.documentElement.classList.add('Windows');
    }
  },

  waitAndCallback(rootSelector, targetSelector, callback) {
    const processed = new WeakSet();
    const rootObservers = new Map();

    function handleTarget(root, target) {
      if (processed.has(target)) return;
      processed.add(target);
      try { callback(root, target); } catch (e) {}
    }

    function scanAndObserveRoot(root) {
      if (rootObservers.has(root)) return;
      root.querySelectorAll(targetSelector).forEach(target => handleTarget(root, target));

      const rootObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
              if (!(node instanceof Element)) continue;
              if (node.matches && node.matches(targetSelector)) handleTarget(root, node);
              if (node.querySelectorAll) node.querySelectorAll(targetSelector).forEach(i => handleTarget(root, i));
            }
          }
        }
      });
      rootObserver.observe(root, { childList: true, subtree: true });
      rootObservers.set(root, rootObserver);
    }

    document.querySelectorAll(rootSelector).forEach(scanAndObserveRoot);

    const documentObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (node.matches && node.matches(rootSelector)) scanAndObserveRoot(node);
            if (node.querySelectorAll) node.querySelectorAll(rootSelector).forEach(scanAndObserveRoot);
          }
        }
      }
    });
    documentObserver.observe(document.body || document, { childList: true, subtree: true });

    return {
      disconnect() {
        documentObserver.disconnect();
        for (const rootObserver of rootObservers.values()) rootObserver.disconnect();
        rootObservers.clear();
      }
    };
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

  removeDuplicatedElement(rootSelector, targetSelector, removeableSelector, ordinal) {
    Zehn.waitAndCallback(rootSelector, targetSelector, (root, target) => {
      const removables = target.querySelectorAll(removeableSelector);
      if (removables.length > 1) {
        removables[ordinal].remove();
      }
    });
  }
};

export default Zehn;