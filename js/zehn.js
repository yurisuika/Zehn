export const ZEHN = {
  addUserAgent,
  localize,
  createSwitchLabels,
  setGlyphColor,
  findRootsAndTargets,
  findTargets,
  handleOnMutation,
  storeTargetHeightAsVariable,
  toggleClassWithPresence,
  nameElement,
  createSpinner,
  createButton,
  createTextButton,
  createText,
  createIconTextContainer,
  createIconContainer,
  createTextContainer,
  createTextWrapper,
  createWrapper,
  createContainer,
  createAdjacentElement,
  addRootClassOnToggle,
  checkButtonToggle,
  checkTargetToggle,
  moveAppend,
  moveAppendAndObserve,
  movePrepend,
  movePrependAndObserve,
  moveBefore,
  moveBeforeAndObserve,
  moveAfter,
  moveAfterAndObserve,
  removeDuplicatedElement
};
export default ZEHN;

function addUserAgent() {
  if (navigator.userAgent.includes('Linux')) {
    document.documentElement.classList.add('Linux');
  } else if (navigator.userAgent.includes('Windows')) {
    document.documentElement.classList.add('Windows');
  } else if (navigator.userAgent.includes('Macintosh')) {
    document.documentElement.classList.add('Macintosh');
  }
};

function localize(langCode, langKey) {
  const SCRIPT_ELEMENT = document.currentScript || (() => {
    const SCRIPTS = document.getElementsByTagName('script');
    return SCRIPTS[SCRIPTS.length - 1];
  })();
  const SCRIPT_SRC = SCRIPT_ELEMENT && SCRIPT_ELEMENT.src ? SCRIPT_ELEMENT.src : window.location.href;
  const SCRIPT_DIR = SCRIPT_SRC.replace(/\/[^/]*$/, '/');

  const resolveRelativeToScript = rel => new URL(rel, SCRIPT_DIR).href;

  async function loadJson(relativePath) {
    const RESPOSNE = await fetch(relativePath);
    if (!RESPOSNE.ok) throw new Error(`Failed to load JSON...`);
    return RESPOSNE.json();
  }

  function getValue(obj, langCode, langKey) {
    return obj?.[langCode]?.[langKey];
  }

  return (async () => {
    const DATA = await loadJson(
      resolveRelativeToScript("./../data/localization.json")
    );

    return getValue(DATA, langCode, langKey);
  })();
};

function createSwitchLabels() {
  async function labelPair(switchSelector) {
    let localOn = await ZEHN.localize(document.documentElement.lang, "Dialog_On");
    let localOff = await ZEHN.localize(document.documentElement.lang, "Dialog_Off");

    ZEHN.createText('html', switchSelector, ['.zehnLabelOn'], localOn);
    ZEHN.createText('html', switchSelector, ['.zehnLabelOff'], localOff);
  }

  labelPair('._9Ql-oVe_j8E-vsDdyVdWo'); // GAMEPAD
  labelPair('._3Sl0QHQ69uK7ZMQo5vBfrA'); // WHAT'S NEW & FRIENDS SETTINGS
  labelPair('.DialogToggleField_OptionPanel'); // OLD CHAT DIALOGS
};

function setGlyphColor() {
  const LIGHT_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--zehn-color-scrollbar-glyph-light').trim();
  const DARK_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--zehn-color-scrollbar-glyph-dark').trim();

  const LIGHT_ACTIVE_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--zehn-color-scrollbar-glyph-active-light').trim();
  const DARK_ACTIVE_COLOR = getComputedStyle(document.documentElement).getPropertyValue('--zehn-color-scrollbar-glyph-active-dark').trim();

  const DOWN_LIGHT = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-down-light' style='fill:${LIGHT_COLOR}' viewBox='0 0 16 16'><path d='M 8 12.945 L 0.1953 5.1403 L 1.1406 4.195 L 8 11.0544 L 14.8594 4.195 L 15.8047 5.1403 Z'/></svg>`;
  const LEFT_LIGHT = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-left-light' style='fill:${LIGHT_COLOR}' viewBox='0 0 16 16'><path d='M 10.8594 15.8044 L 3.0547 7.9997 L 10.8594 0.195 L 11.8047 1.1403 L 4.9453 7.9997 L 11.8047 14.8591 Z'/></svg>`;
  const RIGHT_LIGHT = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-right-light' style='fill:${LIGHT_COLOR}' viewBox='0 0 16 16'><path d='M 5.1406 15.8044 L 4.1953 14.8591 L 11.0547 7.9997 L 4.1953 1.1403 L 5.1406 0.195 L 12.9453 7.9997 Z'/></svg>`;
  const UP_LIGHT = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-up-light' style='fill:${LIGHT_COLOR}' viewBox='0 0 16 16'><path d='M 14.8594 11.805 L 8 4.9456 L 1.1406 11.805 L 0.1953 10.8597 L 8 3.055 l 7.8047 7.8047 Z'/></svg>`;

  const DOWN_ACTIVE_LIGHT = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-down-active-light' style='fill:${LIGHT_ACTIVE_COLOR}' viewBox='0 0 16 16'><path d='M 8 12.945 L 0.1953 5.1403 L 1.1406 4.195 L 8 11.0544 L 14.8594 4.195 L 15.8047 5.1403 Z'/></svg>`;
  const LEFT_ACTIVE_LIGHT = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-left-active-light' style='fill:${LIGHT_ACTIVE_COLOR}' viewBox='0 0 16 16'><path d='M 10.8594 15.8044 L 3.0547 7.9997 L 10.8594 0.195 L 11.8047 1.1403 L 4.9453 7.9997 L 11.8047 14.8591 Z'/></svg>`;
  const RIGHT_ACTIVE_LIGHT = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-right-active-light' style='fill:${LIGHT_ACTIVE_COLOR}' viewBox='0 0 16 16'><path d='M 5.1406 15.8044 L 4.1953 14.8591 L 11.0547 7.9997 L 4.1953 1.1403 L 5.1406 0.195 L 12.9453 7.9997 Z'/></svg>`;
  const UP_ACTIVE_LIGHT = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-up-active-light' style='fill:${LIGHT_ACTIVE_COLOR}' viewBox='0 0 16 16'><path d='M 14.8594 11.805 L 8 4.9456 L 1.1406 11.805 L 0.1953 10.8597 L 8 3.055 l 7.8047 7.8047 Z'/></svg>`;

  const DOWN_DARK = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-down-dark' style='fill:${DARK_COLOR}' viewBox='0 0 16 16'><path d='M 8 12.945 L 0.1953 5.1403 L 1.1406 4.195 L 8 11.0544 L 14.8594 4.195 L 15.8047 5.1403 Z'/></svg>`;
  const LEFT_DARK = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-left-dark' style='fill:${DARK_COLOR}' viewBox='0 0 16 16'><path d='M 10.8594 15.8044 L 3.0547 7.9997 L 10.8594 0.195 L 11.8047 1.1403 L 4.9453 7.9997 L 11.8047 14.8591 Z'/></svg>`;
  const RIGHT_DARK = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-right-dark' style='fill:${DARK_COLOR}' viewBox='0 0 16 16'><path d='M 5.1406 15.8044 L 4.1953 14.8591 L 11.0547 7.9997 L 4.1953 1.1403 L 5.1406 0.195 L 12.9453 7.9997 Z'/></svg>`;
  const UP_DARK = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-up-dark' style='fill:${DARK_COLOR}' viewBox='0 0 16 16'><path d='M 14.8594 11.805 L 8 4.9456 L 1.1406 11.805 L 0.1953 10.8597 L 8 3.055 l 7.8047 7.8047 Z'/></svg>`;

  const DOWN_ACTIVE_DARK = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-down-active-dark' style='fill:${DARK_ACTIVE_COLOR}' viewBox='0 0 16 16'><path d='M 8 12.945 L 0.1953 5.1403 L 1.1406 4.195 L 8 11.0544 L 14.8594 4.195 L 15.8047 5.1403 Z'/></svg>`;
  const LEFT_ACTIVE_DARK = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-left-active-dark' style='fill:${DARK_ACTIVE_COLOR}' viewBox='0 0 16 16'><path d='M 10.8594 15.8044 L 3.0547 7.9997 L 10.8594 0.195 L 11.8047 1.1403 L 4.9453 7.9997 L 11.8047 14.8591 Z'/></svg>`;
  const RIGHT_ACTIVE_DARK = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-right-active-dark' style='fill:${DARK_ACTIVE_COLOR}' viewBox='0 0 16 16'><path d='M 5.1406 15.8044 L 4.1953 14.8591 L 11.0547 7.9997 L 4.1953 1.1403 L 5.1406 0.195 L 12.9453 7.9997 Z'/></svg>`;
  const UP_ACTIVE_DARK = `<svg xmlns='http://www.w3.org/2000/svg' id='icon-scroll-up-active-dark' style='fill:${DARK_ACTIVE_COLOR}' viewBox='0 0 16 16'><path d='M 14.8594 11.805 L 8 4.9456 L 1.1406 11.805 L 0.1953 10.8597 L 8 3.055 l 7.8047 7.8047 Z'/></svg>`;

  const CSS = `:root {
  --zehn-icon-scroll-down-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DOWN_LIGHT)}");
  --zehn-icon-scroll-left-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(LEFT_LIGHT)}");
  --zehn-icon-scroll-right-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(RIGHT_LIGHT)}");
  --zehn-icon-scroll-up-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(UP_LIGHT)}");

  --zehn-icon-scroll-down-active-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DOWN_ACTIVE_LIGHT)}");
  --zehn-icon-scroll-left-active-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(LEFT_ACTIVE_LIGHT)}");
  --zehn-icon-scroll-right-active-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(RIGHT_ACTIVE_LIGHT)}");
  --zehn-icon-scroll-up-active-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(UP_ACTIVE_LIGHT)}");
      
  --zehn-icon-scroll-down-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DOWN_DARK)}");
  --zehn-icon-scroll-left-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(LEFT_DARK)}");
  --zehn-icon-scroll-right-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(RIGHT_DARK)}");
  --zehn-icon-scroll-up-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(UP_DARK)}");

  --zehn-icon-scroll-down-active-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DOWN_ACTIVE_DARK)}");
  --zehn-icon-scroll-left-active-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(LEFT_ACTIVE_DARK)}");
  --zehn-icon-scroll-right-active-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(RIGHT_ACTIVE_DARK)}");
  --zehn-icon-scroll-up-active-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(UP_ACTIVE_DARK)}");
}`;

  const STYLE = document.createElement('style');
  STYLE.id = 'zehnGlyphs';
  STYLE.textContent = CSS;
  document.head.appendChild(STYLE);
};

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

function findTargets(root, targetSelector, callback, shouldDisconnect = true) {
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

  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
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

function storeTargetHeightAsVariable(rootSelector, targetSelector, variableName) {
  this.handleOnMutation(rootSelector, targetSelector, (root, target) => {
    root.style.setProperty(variableName, `${target.offsetHeight}px`);
  }, { shouldObserveTarget: true, shouldDisconnect: false, shouldAddAttributeFilter: true });
};

function toggleClassWithPresence(rootSelector, targetSelector, presentSelector, toggleName) {
  this.handleOnMutation(rootSelector, targetSelector, (root, target) => {
    const PRESENT = !!root.querySelector(presentSelector);
    target.classList.toggle(toggleName, PRESENT);
  }, { shouldObserveTarget: true, shouldDisconnect: true,  shouldAddAttributeFilter: true });
};

function nameElement(element, nameSelector) {
  const NAME = nameSelector.slice(1);
  const IS_ID = nameSelector.charAt(0) === '#';

  if (IS_ID) {
    element.id = NAME;
  } else {
    element.classList.add(NAME);
  }
};

function createSpinner(rootSelector, targetSelector) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const SPINNER = document.createElement('div');
    SPINNER.classList.add('zehnSpinner');

    const HOLDER = document.createElement('div');
    HOLDER.classList.add('zehnHolder');
    SPINNER.appendChild(HOLDER);

    for (let i = 1; i <= 6; i++) {
      const DOT = document.createElement('div');
      DOT.className = `zehnDot${i}`;
      HOLDER.appendChild(DOT);
    }

    target.prepend(SPINNER);
    return SPINNER;
  });
};

function createButton(rootSelector, targetSelector, nameSelectors, callback, shouldAppend = true) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const BUTTON = document.createElement('button');
    BUTTON.name = 'button';
    BUTTON.onclick = () => callback(root, target, BUTTON);
    nameSelectors.forEach((nameSelector) => {
      this.nameElement(BUTTON, nameSelector);
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

function createTextButton(rootSelector, targetSelector, nameSelectors, text, callback, shouldAppend = true) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const BUTTON = document.createElement('button');
    BUTTON.name = 'button';
    BUTTON.innerHTML = text;
    BUTTON.onclick = () => callback(root, target, BUTTON);
    nameSelectors.forEach((nameSelector) => {
      this.nameElement(BUTTON, nameSelector);
    });
    if (shouldAppend) {
      target.append(BUTTON);
    } else {
      target.prepend(BUTTON);
    }
  });
};

function createText(rootSelector, targetSelector, nameSelectors, text, shouldAppend = true) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const DIV = document.createElement('div');
    DIV.innerHTML = text;
    nameSelectors.forEach((nameSelector) => {
      this.nameElement(DIV, nameSelector);
    });
    if (shouldAppend) {
      target.append(DIV);
    } else {
      target.prepend(DIV);
    }
  });
};

function createIconTextContainer(rootSelector, targetSelector, nameSelectors, shouldAppend = true) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    if (target.children.length == 0) {
      const CONTAINER = document.createElement('div');
      nameSelectors.forEach((nameSelector) => {
        this.nameElement(CONTAINER, nameSelector);
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

function createIconContainer(rootSelector, targetSelector, nameSelectors, shouldAppend = true) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      this.nameElement(CONTAINER, nameSelector);
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

function createTextContainer(rootSelector, targetSelector, nameSelectors, shouldAppend = true) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const CONTAINER = document.createElement('div');
      nameSelectors.forEach((nameSelector) => {
        this.nameElement(CONTAINER, nameSelector);
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
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      this.nameElement(CONTAINER, nameSelector);
    });

    CONTAINER.textContent = target.textContent;
    for (const NODE of [...target.childNodes]) {
      if (NODE.nodeType === Node.TEXT_NODE) NODE.remove();
    }
    target.appendChild(CONTAINER);
  });
};

function createWrapper(rootSelector, targetSelector, nameSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      this.nameElement(CONTAINER, nameSelector);
    });

    while (target.firstChild) {
      CONTAINER.appendChild(target.firstChild);
    }
    target.appendChild(CONTAINER);
  });
};

function createContainer(rootSelector, targetSelector, nameSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      this.nameElement(CONTAINER, nameSelector);
    });

    target.parentNode.insertBefore(CONTAINER, target);
    CONTAINER.appendChild(target);
  });
};

function createAdjacentElement(rootSelector, targetSelector, nameSelectors, shouldPlaceBefore = true) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const ELEMENT = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      this.nameElement(ELEMENT, nameSelector);
    });
    if (shouldPlaceBefore) {
      target.before(ELEMENT || '');
    } else {
      target.after(ELEMENT || '');
    }
  });
};

function addRootClassOnToggle(root, target, button, buttonTargetToggleName) {
  button.classList.toggle('zehnToggled');
  root.classList.toggle(buttonTargetToggleName, button.classList.contains('zehnToggled'));
};

function checkButtonToggle(rootSelector, targetSelector, additionName) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    if (root.classList.contains(additionName)) target.classList.toggle('zehnToggled', true);
  });
};

function checkTargetToggle(rootSelector, targetSelector, additionName, toggleSelector) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const TOGGLE = root.querySelector(toggleSelector);
    if (target.classList.contains('zehnToggled')) TOGGLE.classList.toggle(additionName, true);
  });
};

function moveAppend(rootSelector, targetSelector, movingSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      root.querySelectorAll(movingSelector).forEach((moving) => {
        target.append(moving);
      });
    });
  });
};

function moveAppendAndObserve(rootSelector, targetSelector, movingSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      this.findTargets(root, movingSelector, (moving) => {
        target.append(moving);
      });
    });
  });
};

function movePrepend(rootSelector, targetSelector, movingSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      root.querySelectorAll(movingSelector).forEach((moving) => {
        target.prepend(moving || '');
      })
    });
  });
};

function movePrependAndObserve(rootSelector, targetSelector, movingSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      this.findTargets(root, movingSelector, (moving) => {
        target.prepend(moving || '');
      })
    });
  });
};

function moveBefore(rootSelector, targetSelector, movingSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      root.querySelectorAll(movingSelector).forEach((moving) => {
        target.before(moving || '');
      })
    });
  });
};

function moveBeforeAndObserve(rootSelector, targetSelector, movingSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      this.findTargets(root, movingSelector, (moving) => {
        target.before(moving || '');
      })
    });
  });
};

function moveAfter(rootSelector, targetSelector, movingSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      root.querySelectorAll(movingSelector).forEach((moving) => {
        target.after(moving || '');
      })
    });
  });
};

function moveAfterAndObserve(rootSelector, targetSelector, movingSelectors) {
  this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      this.findTargets(root, movingSelector, (moving) => {
        target.after(moving || '');
      })
    });
  });
};

function removeDuplicatedElement(rootSelector, targetSelector, removeableSelector, ordinal) {
  this.handleOnMutation(rootSelector, targetSelector, (root, target) => {
    const REMOVABLES = target.querySelectorAll(removeableSelector);
    if (REMOVABLES.length > 1) {
      REMOVABLES[ordinal].remove();
    }
  }, { shouldObserveTarget: false, shouldDisconnect: false, shouldAddAttributeFilter: false });
};