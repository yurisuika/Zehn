export const FIND = {
  findRootsAndTargets,
  findTargets,
  handleOnMutation
};
export const STORE = {
  storeTargetHeightAsVariable
};
export const TOGGLE = {
  toggleClassWithPresence,
  addRootClassOnToggle,
  checkButtonToggle,
  checkTargetToggle
};
export const CREATE = {
  createButton,
  createTextButton,
  createText,
  createIconTextContainer,
  createIconContainer,
  createTextContainer,
  createTextWrapper,
  createWrapper,
  createContainer,
  createAdjacentElement
};
export const MOVE = {
  moveAppend,
  movePrepend,
  moveBefore,
  moveAfter
};
export default { FIND, STORE, TOGGLE, CREATE, MOVE };

/* FIND ------------------------------------------------------------------------------------------------------------- */

function findRootsAndTargets(rootSelector, targetSelector, callback) {
  const PROCESSED = new WeakSet();
  const ROOT_OBSERVERS = new Map();

  function handleTarget(root, target) {
    if (PROCESSED.has(target)) return;
    PROCESSED.add(target);
    try { callback(root, target); } catch (e) { console.error(e); }
  }

  function scanAndObserveRoot(root) {
    if (ROOT_OBSERVERS.has(root)) return;
    root.querySelectorAll(targetSelector).forEach(target => handleTarget(root, target));

    const ROOT_OBSERVER = new MutationObserver(mutations => {
      for (const MUTATION of mutations) {
        if (MUTATION.type === 'childList') {
          for (const NODE of MUTATION.addedNodes) {
            if (!(NODE instanceof Element)) continue;
            if (NODE.matches && NODE.matches(targetSelector)) handleTarget(root, NODE);
            if (NODE.querySelectorAll) NODE.querySelectorAll(targetSelector).forEach(n => handleTarget(root, n));
          }
        }
      }
    });
    ROOT_OBSERVER.observe(root, { childList: true, subtree: true });
    ROOT_OBSERVERS.set(root, ROOT_OBSERVER);
  }

  document.querySelectorAll(rootSelector).forEach(scanAndObserveRoot);

  const DOCUMENT_OBSERVER = new MutationObserver(mutations => {
    for (const MUTATION of mutations) {
      if (MUTATION.type === 'childList') {
        for (const NODE of MUTATION.addedNodes) {
          if (!(NODE instanceof Element)) continue;
          if (NODE.matches && NODE.matches(rootSelector)) scanAndObserveRoot(NODE);
          if (NODE.querySelectorAll) NODE.querySelectorAll(rootSelector).forEach(scanAndObserveRoot);
        }
      }
    }
  });
  DOCUMENT_OBSERVER.observe(document.body || document, { childList: true, subtree: true });

  return {
    disconnect() {
      DOCUMENT_OBSERVER.disconnect();
      for (const ROOT_OBSERVER of ROOT_OBSERVERS.values()) ROOT_OBSERVER.disconnect();
      ROOT_OBSERVERS.clear();
    }
  };
};

function findTargets(root, targetSelector, callback, { shouldDisconnect = true } = {}) {
  const PROCESSED = new WeakSet();

  function handleTarget(target) {
    if (PROCESSED.has(target)) return;
    PROCESSED.add(target);
    try { callback(target); } catch (e) { console.error(e); }
  }

  document.querySelectorAll(targetSelector).forEach(t => handleTarget(t));

  const OBSERVER = new MutationObserver(mutations => {
    for (const MUTATION of mutations) {
      if (MUTATION.type === 'childList') {
        for (const NODE of MUTATION.addedNodes) {
          if (!(NODE instanceof Element)) continue;
            if (NODE.matches && NODE.matches(targetSelector)) handleTarget(NODE);
            if (NODE.querySelectorAll) NODE.querySelectorAll(targetSelector).forEach(n => handleTarget(n));
        }
      }
    }
  });
  OBSERVER.observe(root, { childList: true, subtree: true });

  return shouldDisconnect ? OBSERVER : { observer: OBSERVER, disconnect: () => OBSERVER.disconnect() };
};

function handleOnMutation(rootSelector, targetSelector, callback, options = {}) {
  const DEFAULTS = {
    shouldObserveTarget: false,
    shouldDisconnect: true,
    shouldAddAttributeFilter: false
  };
  const CONFIG = { ...DEFAULTS, ...options };

  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const update = () => callback(root, target);

    update();

    const OBSERVER = new MutationObserver(update);
    OBSERVER.observe((CONFIG.shouldObserveTarget ? target : root), {
      childList: true,
      subtree: true,
      ...(CONFIG.shouldAddAttributeFilter ? { attributeFilter: ['class', 'id'] } : {})
    });

    return CONFIG.shouldDisconnect ? OBSERVER : { observer: OBSERVER, disconnect: () => OBSERVER.disconnect() };
  });
};










/* STORE ------------------------------------------------------------------------------------------------------------- */

function storeTargetHeightAsVariable(rootSelector, targetSelector, variableName) {
  handleOnMutation(rootSelector, targetSelector, (root, target) => {
    root.style.setProperty(variableName, `${target.offsetHeight}px`);
  }, { shouldObserveTarget: true, shouldDisconnect: false, shouldAddAttributeFilter: true });
};










/* TOGGLE ------------------------------------------------------------------------------------------------------------- */

function toggleClassWithPresence(rootSelector, targetSelector, presentSelector, toggleName) {
  handleOnMutation(rootSelector, targetSelector, (root, target) => {
    const PRESENT = !!root.querySelector(presentSelector);
    target.classList.toggle(toggleName, PRESENT);
  }, { shouldObserveTarget: true, shouldDisconnect: true, shouldAddAttributeFilter: true });
};

function addRootClassOnToggle(root, target, button, buttonTargetToggleName) {
  button.classList.toggle('zehnToggled');
  root.classList.toggle(buttonTargetToggleName, button.classList.contains('zehnToggled'));
};

function checkButtonToggle(rootSelector, targetSelector, additionName) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    if (root.classList.contains(additionName)) target.classList.toggle('zehnToggled', true);
  });
};

function checkTargetToggle(rootSelector, targetSelector, additionName, toggleSelector) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const TOGGLE = root.querySelector(toggleSelector);
    if (target.classList.contains('zehnToggled')) TOGGLE.classList.toggle(additionName, true);
  });
};










/* CREATE ----------------------------------------------------------------------------------------------------------- */

function createButton(rootSelector, targetSelector, nameSelectors, callback, { shouldAppend = true } = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const BUTTON = document.createElement('button');
    BUTTON.name = 'button';
    BUTTON.onclick = () => callback(root, target, BUTTON);
    nameSelectors.forEach((nameSelector) => {
      nameElement(BUTTON, nameSelector);
    });
    if (shouldAppend) {
      target.append(BUTTON);
    } else {
      target.prepend(BUTTON);
    }

    const ICON = document.createElement('svg');
    ICON.classList.add(`zehnIcon`);
    BUTTON.append(ICON);
  });
};

function createTextButton(rootSelector, targetSelector, nameSelectors, text, callback, { shouldAppend = true } = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const BUTTON = document.createElement('button');
    BUTTON.name = 'button';
    BUTTON.innerHTML = text;
    BUTTON.onclick = () => callback(root, target, BUTTON);
    nameSelectors.forEach((nameSelector) => {
      nameElement(BUTTON, nameSelector);
    });
    if (shouldAppend) {
      target.append(BUTTON);
    } else {
      target.prepend(BUTTON);
    }
  });
};

function createText(rootSelector, targetSelector, nameSelectors, text, { shouldAppend = true } = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const DIV = document.createElement('div');
    DIV.innerHTML = text;
    nameSelectors.forEach((nameSelector) => {
      nameElement(DIV, nameSelector);
    });
    if (shouldAppend) {
      target.append(DIV);
    } else {
      target.prepend(DIV);
    }
  });
};

function createIconTextContainer(rootSelector, targetSelector, nameSelectors, { shouldAppend = true } = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    if (target.children.length == 0) {
      const CONTAINER = document.createElement('div');
      nameSelectors.forEach((nameSelector) => {
        nameElement(CONTAINER, nameSelector);
      });
      if (shouldAppend) {
        target.append(CONTAINER);
      } else {
        target.prepend(CONTAINER);
      }

      const TITLE = document.createElement('div');
      TITLE.classList.add('zehnText');
      CONTAINER.append(TITLE);
      TITLE.textContent = target.childNodes[0].textContent;
      target.childNodes[0].remove();

      const ICON = document.createElement('svg');
      ICON.classList.add('zehnIcon');
      CONTAINER.prepend(ICON);
    }
  });
};

function createIconContainer(rootSelector, targetSelector, nameSelectors, { shouldAppend = true } = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      nameElement(CONTAINER, nameSelector);
    });
    if (shouldAppend) {
      target.append(CONTAINER);
    } else {
      target.prepend(CONTAINER);
    }

    const ICON = document.createElement('svg');
    ICON.classList.add('zehnIcon');
    CONTAINER.prepend(ICON);
  });
};

function createTextContainer(rootSelector, targetSelector, nameSelectors, { shouldAppend = true } = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const CONTAINER = document.createElement('div');
      nameSelectors.forEach((nameSelector) => {
        nameElement(CONTAINER, nameSelector);
      });
      if (shouldAppend) {
        target.append(CONTAINER);
      } else {
        target.prepend(CONTAINER);
      }

      const TITLE = document.createElement('div');
      TITLE.classList.add('zehnText');
      CONTAINER.append(TITLE);
      TITLE.textContent = target.childNodes[0].textContent;
      target.childNodes[0].remove();
  });
};

function createTextWrapper(rootSelector, targetSelector, nameSelectors) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      nameElement(CONTAINER, nameSelector);
    });

    CONTAINER.textContent = target.textContent;
    for (const NODE of [...target.childNodes]) {
      if (NODE.nodeType === Node.TEXT_NODE) NODE.remove();
    }
    target.appendChild(CONTAINER);
  });
};

function createWrapper(rootSelector, targetSelector, nameSelectors) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      nameElement(CONTAINER, nameSelector);
    });

    while (target.firstChild) {
      CONTAINER.appendChild(target.firstChild);
    }
    target.appendChild(CONTAINER);
  });
};

function createContainer(rootSelector, targetSelector, nameSelectors) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      nameElement(CONTAINER, nameSelector);
    });

    target.parentNode.insertBefore(CONTAINER, target);
    CONTAINER.appendChild(target);
  });
};

function createAdjacentElement(rootSelector, targetSelector, nameSelectors, { shouldPlaceBefore = true } = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const ELEMENT = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      nameElement(ELEMENT, nameSelector);
    });
    if (shouldPlaceBefore) {
      target.before(ELEMENT || '');
    } else {
      target.after(ELEMENT || '');
    }
  });
};









/* MOVE ------------------------------------------------------------------------------------------------------------- */

function moveAppend(rootSelector, targetSelector, movingSelectors, { shouldObserve = false } = {}) {
  move(rootSelector, targetSelector, movingSelectors, shouldObserve, (target, moving) => {
    target.append(moving);
  });
};

function movePrepend(rootSelector, targetSelector, movingSelectors, { shouldObserve = false } = {}) {
  move(rootSelector, targetSelector, movingSelectors, shouldObserve, (target, moving) => {
    target.prepend(moving);
  });
};


function moveBefore(rootSelector, targetSelector, movingSelectors, { shouldObserve = false } = {}) {
  move(rootSelector, targetSelector, movingSelectors, shouldObserve, (target, moving) => {
    target.before(moving);
  });
};

function moveAfter(rootSelector, targetSelector, movingSelectors, { shouldObserve = false } = {}) {
  move(rootSelector, targetSelector, movingSelectors, shouldObserve, (target, moving) => {
    target.after(moving);
  });
};










/* INTERNAL --------------------------------------------------------------------------------------------------------- */

function nameElement(element, nameSelector) {
  const NAME = nameSelector.slice(1);
  const IS_ID = nameSelector.charAt(0) === '#';

  if (IS_ID) {
    element.id = NAME;
  } else {
    element.classList.add(NAME);
  }
};

function move(rootSelector, targetSelector, movingSelectors, shouldObserve, movement) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      if (shouldObserve) {
        findTargets(root, movingSelector, (moving) => {
          movement(target, moving || '');
        });
      } else {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          movement(target, moving || '');
        });
      }
    });
  });
}