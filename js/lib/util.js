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
  createTooltipButton,
  createTextButton,
  createText,
  createIconTextContainer,
  createIconContainer,
  createTextContainer,
  createTextWrapper,
  createWrapper,
  createContainer,
  createElement
};
export const MOVE = {
  moveElement
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
}

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
}

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
}










/* STORE ------------------------------------------------------------------------------------------------------------- */

function storeTargetHeightAsVariable(rootSelector, targetSelector, variableName) {
  handleOnMutation(rootSelector, targetSelector, (root, target) => {
    root.style.setProperty(variableName, `${target.offsetHeight}px`);
  }, { shouldObserveTarget: true, shouldDisconnect: false, shouldAddAttributeFilter: true });
}










/* TOGGLE ------------------------------------------------------------------------------------------------------------- */

function toggleClassWithPresence(rootSelector, targetSelector, presentSelector, toggleName) {
  handleOnMutation(rootSelector, targetSelector, (root, target) => {
    const PRESENT = !!root.querySelector(presentSelector);
    target.classList.toggle(toggleName, PRESENT);
  }, { shouldObserveTarget: true, shouldDisconnect: true, shouldAddAttributeFilter: true });
}

function addRootClassOnToggle(root, target, button, buttonTargetToggleName) {
  button.classList.toggle('zehnToggled');
  root.classList.toggle(buttonTargetToggleName, button.classList.contains('zehnToggled'));
}

function checkButtonToggle(rootSelector, targetSelector, additionName) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    if (root.classList.contains(additionName)) target.classList.toggle('zehnToggled', true);
  });
}

function checkTargetToggle(rootSelector, targetSelector, additionName, toggleSelector) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const TOGGLE = root.querySelector(toggleSelector);
    if (target.classList.contains('zehnToggled')) TOGGLE.classList.toggle(additionName, true);
  });
}










/* CREATE ----------------------------------------------------------------------------------------------------------- */

function createButton(rootSelector, targetSelector, nameSelectors, callback, {
  placement = 'append',
  toggleSelector = null
} = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const BUTTON = document.createElement('button');
    BUTTON.name = 'button';
    BUTTON.onclick = () => callback(root, target, BUTTON);
    nameSelectors.forEach((nameSelector) => {
      name(BUTTON, nameSelector);
    });

    if (toggleSelector) {
      if (root.classList.contains(toggleSelector)) BUTTON.classList.toggle('zehnToggled', true);
    }

    insert(target, BUTTON, placement);

    const ICON = document.createElement('svg');
    ICON.classList.add(`zehnIcon`);
    BUTTON.append(ICON);
  });
}

function createTooltipButton(rootSelector, targetSelector, nameSelectors, callback, {
  placement = 'append',
  toggleSelector = null,
  activeTooltipText = 'Off',
  inactiveTooltipText = 'On'
} = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const SOURCE = document.createElement('div');
    SOURCE.className = 'tool-tip-source Focusable';

    const BUTTON = document.createElement('button');
    BUTTON.name = 'button';
    BUTTON.onclick = () => {
      callback(root, target, BUTTON);
      syncTooltipText();
    };
    nameSelectors.forEach((nameSelector) => {
      name(BUTTON, nameSelector);
    });

    if (toggleSelector) {
      if (root.classList.contains(toggleSelector)) BUTTON.classList.toggle('zehnToggled', true);
    }

    SOURCE.appendChild(BUTTON);

    insert(target, SOURCE, placement);

    const ICON = document.createElement('svg');
    ICON.classList.add(`zehnIcon`);
    BUTTON.append(ICON);

    let hovered = false;
    let focused = false;
    let readyTimer;

    let outerPosition = null;
    let position = null;
    let tooltip = null;

    function syncTooltipText() {
      if (!tooltip) return;

      tooltip.textContent = BUTTON.classList.contains('zehnToggled') ? activeTooltipText : inactiveTooltipText;
    }

    function reposition() {
      if (!outerPosition || !position || !tooltip) return;

      const BUTTON_RECT = BUTTON.getBoundingClientRect();
      const TOOLTIP_RECT = tooltip.getBoundingClientRect();
      const EDGE = 8;

      const X = Math.max(
        EDGE,
        Math.min(
          BUTTON_RECT.left + (BUTTON_RECT.width / 2) - (TOOLTIP_RECT.width / 2),
          window.innerWidth - TOOLTIP_RECT.width - EDGE
        )
      );

      const GAP = 8;
      let y = BUTTON_RECT.top - TOOLTIP_RECT.height - GAP;

      if (y < EDGE) {
        y = BUTTON_RECT.bottom + GAP;
      }

      position.style.inset = `${y}px auto auto ${X}px`;
    }

    function createTooltip() {
      if (outerPosition) return;

      outerPosition = document.createElement('div');
      outerPosition.className = '_2_lmTz0tA4NOSle5WaO1PZ'; // HoverPositionOuter
      outerPosition.setAttribute('popover', 'manual');

      position = document.createElement('div');
      position.className = '_3vg1vYU7iTWqONciv9cuJN'; // HoverPosition

      tooltip = document.createElement('div');
      tooltip.className = '_2FxbHJzYoH024ko7zqcJOf'; // TextToolTip
      tooltip.setAttribute('role', 'tooltip');
      syncTooltipText();

      position.appendChild(tooltip);
      outerPosition.appendChild(position);
      SOURCE.appendChild(outerPosition);

      outerPosition.showPopover();
      reposition();

      const CURRENT_POSITION = position;
      clearTimeout(readyTimer);

      readyTimer = setTimeout(() => {
        requestAnimationFrame(() => {
          if (position === CURRENT_POSITION && outerPosition?.isConnected) {
            CURRENT_POSITION.classList.add('_1Ye_0niF2UqB8uQTbm8B6B'); // Ready
          }
        });
      }, 300);

      window.addEventListener('resize', reposition);
      window.addEventListener('scroll', reposition, true);
    }

    function removeTooltip() {
      if (hovered || focused || !outerPosition) return;

      clearTimeout(readyTimer);

      window.removeEventListener('resize', reposition);
      window.removeEventListener('scroll', reposition, true);

      outerPosition.hidePopover();
      outerPosition.remove();

      outerPosition = null;
      position = null;
      tooltip = null;
    }

    function syncTooltip() {
      if (hovered || focused) {
        createTooltip();
      } else {
        removeTooltip();
      }
    }

    BUTTON.addEventListener('mouseenter', () => {
      hovered = true;
      syncTooltip();
    });

    BUTTON.addEventListener('mouseleave', () => {
      hovered = false;
      syncTooltip();
    });

    BUTTON.addEventListener('focus', () => {
      focused  = BUTTON.matches(':focus-visible');
      syncTooltip();
    });

    BUTTON.addEventListener('blur', () => {
      focused = false;
      syncTooltip();
    });
  });
}

function createTextButton(rootSelector, targetSelector, nameSelectors, text, callback, {
  placement = 'append'
} = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const BUTTON = document.createElement('button');
    BUTTON.name = 'button';
    BUTTON.innerHTML = text;
    BUTTON.onclick = () => callback(root, target, BUTTON);
    nameSelectors.forEach((nameSelector) => {
      name(BUTTON, nameSelector);
    });

    insert(target, BUTTON, placement);
  });
}

function createText(rootSelector, targetSelector, nameSelectors, text, {
  placement = 'append'
} = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const ELEMENT = document.createElement('div');
    ELEMENT.innerHTML = text;
    nameSelectors.forEach((nameSelector) => {
      name(ELEMENT, nameSelector);
    });

    insert(target, ELEMENT, placement);
  });
}

function createIconTextContainer(rootSelector, targetSelector, nameSelectors, {
  placement = 'append'
} = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    if (target.children.length === 0) {
      const CONTAINER = document.createElement('div');
      nameSelectors.forEach((nameSelector) => {
        name(CONTAINER, nameSelector);
      });

      insert(target, CONTAINER, placement);

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
}

function createIconContainer(rootSelector, targetSelector, nameSelectors, {
  placement = 'append'
} = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      name(CONTAINER, nameSelector);
    });

    insert(target, CONTAINER, placement);

    const ICON = document.createElement('svg');
    ICON.classList.add('zehnIcon');
    CONTAINER.prepend(ICON);
  });
}

function createTextContainer(rootSelector, targetSelector, nameSelectors, {
  placement = 'append'
} = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const CONTAINER = document.createElement('div');
      nameSelectors.forEach((nameSelector) => {
        name(CONTAINER, nameSelector);
      });

      insert(target, CONTAINER, placement);

      const TITLE = document.createElement('div');
      TITLE.classList.add('zehnText');
      CONTAINER.append(TITLE);
      TITLE.textContent = target.childNodes[0].textContent;
      target.childNodes[0].remove();
  });
}

function createTextWrapper(rootSelector, targetSelector, nameSelectors) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      name(CONTAINER, nameSelector);
    });

    CONTAINER.textContent = target.textContent;
    for (const NODE of [...target.childNodes]) {
      if (NODE.nodeType === Node.TEXT_NODE) NODE.remove();
    }
    target.appendChild(CONTAINER);
  });
}

function createWrapper(rootSelector, targetSelector, nameSelectors) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      name(CONTAINER, nameSelector);
    });

    while (target.firstChild) {
      CONTAINER.appendChild(target.firstChild);
    }
    target.appendChild(CONTAINER);
  });
}

function createContainer(rootSelector, targetSelector, nameSelectors) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const CONTAINER = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      name(CONTAINER, nameSelector);
    });

    target.parentNode.insertBefore(CONTAINER, target);
    CONTAINER.appendChild(target);
  });
}

function createElement(rootSelector, targetSelector, nameSelectors, {
  placement = 'append',
  shouldClearExisting = false
} = {}) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const ELEMENT = document.createElement('div');
    nameSelectors.forEach((nameSelector) => {
      if (shouldClearExisting) {
        document.querySelector(nameSelector)?.remove();
      }

      name(ELEMENT, nameSelector);
    });

    insert(target, ELEMENT, placement);
  });
}









/* MOVE ------------------------------------------------------------------------------------------------------------- */

function moveElement(rootSelector, targetSelector, movingSelectors, {
  shouldObserve = false,
  placement = 'append'
} = {}) {
  move(rootSelector, targetSelector, movingSelectors, shouldObserve, (target, moving) => {
    insert(target, moving, placement)
  });
}










/* INTERNAL --------------------------------------------------------------------------------------------------------- */

function name(element, nameSelector) {
  const NAME = nameSelector.slice(1);
  const IS_ID = nameSelector.charAt(0) === '#';

  if (IS_ID) {
    element.id = NAME;
  } else {
    element.classList.add(NAME);
  }
}

function move(rootSelector, targetSelector, movingSelectors, shouldObserve, movement) {
  findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    movingSelectors.forEach((movingSelector) => {
      if (shouldObserve) {
        findTargets(root, movingSelector, (moving) => {
          movement(target, moving);
        });
      } else {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          movement(target, moving);
        });
      }
    });
  });
}

function insert(insertion_point, inserted, placement) {
  switch (placement) {
    case 'prepend':
      insertion_point.prepend(inserted);
      break;
    case 'before':
      insertion_point.before(inserted);
      break;
    case 'after':
      insertion_point.after(inserted);
      break;
    default:
      insertion_point.append(inserted);
  }
}