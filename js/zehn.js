const Zehn = {
  addUserAgent() {
    if (navigator.userAgent.includes('Linux')) {
      document.documentElement.classList.add('Linux');
    } else if (navigator.userAgent.includes('Windows')) {
      document.documentElement.classList.add('Windows');
    }
  },

  observeRootForCallback(rootSelector, targetSelector, callback) {
    const processed = new WeakSet();
    const rootObservers = new Map();

    function handleTarget(root, target) {
      if (processed.has(target)) return;
      processed.add(target);
      try { callback(root, target); } catch (e) { console.error(e); }
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

  observeForCallback(root, targetSelector, callback) {
    const processed = new WeakSet();

    function handleTarget(target) {
      if (processed.has(target)) return;
      processed.add(target);
      try { callback(root, target); } catch (e) { console.error(e); }
    }

    if (root instanceof Element) {
      root.querySelectorAll(targetSelector).forEach(handleTarget);
    }

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type !== 'childList') continue;
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches && node.matches(targetSelector)) handleTarget(node);
          if (node.querySelectorAll) node.querySelectorAll(targetSelector).forEach(handleTarget);
        }
      }
    });

    observer.observe(root, { childList: true, subtree: true });

    return {
      disconnect() {
        observer.disconnect();
      }
    };
  },

  observeForCallbackIfMissing(rootSelector, targetSelector, additionSelector, callback) {
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      const addition = target.querySelector(additionSelector);
      if (!addition) {
        callback(root, target, additionSelector);
      }
    });
  },

  addButton(rootSelector, targetSelector, additionSelector, position, defaultToggled, callback) {
    Zehn.observeForCallbackIfMissing(rootSelector, targetSelector, additionSelector, (root, target, additionSelector) => {
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
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
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
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.append(moving);
        });
      });
    });
  },

  observeAndMoveAppend(rootSelector, targetSelector, movingSelectors) {
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        Zehn.observeForCallback(root, movingSelector, (root, moving) => {
          target.append(moving);
        });
      });
    });
  },

  movePrepend(rootSelector, targetSelector, movingSelectors) {
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.prepend(moving || '');
        })
      });
    });
  },

  observedAndMovePrepend(rootSelector, targetSelector, movingSelectors) {
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        Zehn.observeForCallback(root, movingSelector, (root, moving) => {
          target.prepend(moving || '');
        })
      });
    });
  },

  moveBefore(rootSelector, targetSelector, movingSelectors) {
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.before(moving || '');
        })
      });
    });
  },

  observeAndMoveBefore(rootSelector, targetSelector, movingSelectors) {
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        Zehn.observeForCallback(root, movingSelector, (root, moving) => {
          target.before(moving || '');
        })
      });
    });
  },

  removeDuplicatedElement(rootSelector, targetSelector, removeableSelector, ordinal) {
    Zehn.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      const removables = target.querySelectorAll(removeableSelector);
      if (removables.length > 1) {
        removables[ordinal].remove();
      }
    });
  }
};

export default Zehn;