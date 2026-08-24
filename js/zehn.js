export const ZEHN = {
  addUserAgent,
  convertAccents,
  getLocalizationJson,
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

function convertAccents() {
  const STYLE_ELEMENT_ID = 'zehnAccents';
  const OBSERVE_SUBTREE = true;
  const OBSERVER_IDS = ['SystemAccentColorInject', 'SystemAccentColorInjection'];
  const STYLE_ID_SET = new Set(OBSERVER_IDS);

  const computeAndWrite = () => {
    function hexToRgbTriplet(hex) {
      const H = hex.startsWith("#") ? hex.slice(1) : hex;
      if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(H)) {
        throw new Error("Expected hex like #RRGGBB or #RRGGBBAA (6 or 8 hex digits).");
      }

      const RR = parseInt(H.slice(0, 2), 16);
      const GG = parseInt(H.slice(2, 4), 16);
      const BB = parseInt(H.slice(4, 6), 16);

      return `${RR}, ${GG}, ${BB}`;
    };

    const VAR_MAP = {
      "--SystemAccentColor": "--rgb-accent",
      "--SystemAccentColorLight1": "--rgb-accent-light1",
      "--SystemAccentColorLight2": "--rgb-accent-light2",
      "--SystemAccentColorLight3": "--rgb-accent-light3",
      "--SystemAccentColorDark1": "--rgb-accent-dark1",
      "--SystemAccentColorDark2": "--rgb-accent-dark2",
      "--SystemAccentColorDark3": "--rgb-accent-dark3"
    };

    const ROOT_STYLE = getComputedStyle(document.documentElement);
    
    let cssText = ":root{\n";
    for (const [SRC_VAR, DST_VAR] of Object.entries(VAR_MAP)) {
      const HEX = ROOT_STYLE.getPropertyValue(SRC_VAR).trim();
      if (!HEX) throw new Error(`Missing CSS variable value for ${SRC_VAR}`);

      const TRIPLET = hexToRgbTriplet(HEX);
      cssText += `  ${DST_VAR}: ${TRIPLET};\n`;
    }
    cssText += "}\n";

    let el = STYLE_ELEMENT_ID ? document.getElementById(STYLE_ELEMENT_ID) : null;
    if (!el) {
      el = document.createElement("style");
      if (STYLE_ELEMENT_ID) el.id = STYLE_ELEMENT_ID;
      document.head.appendChild(el);
    }
    el.textContent = cssText;
  };

  computeAndWrite();

  const MO = new MutationObserver(() => {
    computeAndWrite();
  });

  const TARGETS = ['SystemAccentColorInject', 'SystemAccentColorInjection']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  for (const EL of TARGETS) {
    MO.observe(EL, {
      characterData: true,
      subtree: OBSERVE_SUBTREE,
      childList: true,
      attributes: true,
      attributeFilter: ["id", "class", "media", "type"],
    });
  }

  const HEAD_OBSERVER = new MutationObserver((mutations) => {
    let relevant = false;

    for (const M of mutations) {
      for (const NODE of [...M.addedNodes, ...M.removedNodes]) {
        if (NODE && NODE.nodeType === 1) {
          const TAG = NODE.tagName ? NODE.tagName.toLowerCase() : "";
          const NODE_ID = NODE.id || "";
          if (TAG === "style" && STYLE_ID_SET.has(NODE_ID)) relevant = true;

          if (NODE.querySelectorAll && TAG === "style") {
          }
        }
        if (NODE && NODE.querySelectorAll) {
          const FOUND = NODE.querySelectorAll("style[id]");
          for (const ST of FOUND) {
            if (STYLE_ID_SET.has(ST.id)) relevant = true;
          }
        }
      }
    }

    if (!relevant) return;

    computeAndWrite();

    MO.disconnect();
    const NEW_TARGETS = ['SystemAccentColorInject', 'SystemAccentColorInjection']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    for (const el of NEW_TARGETS) {
      MO.observe(el, {
        characterData: true,
        subtree: OBSERVE_SUBTREE,
        childList: true,
        attributes: true,
        attributeFilter: ["id", "class", "media", "type"],
      });
    }
  });

  HEAD_OBSERVER.observe(document.head, { childList: true, subtree: true });

  return {
    disconnect() {
      MO.disconnect();
      HEAD_OBSERVER.disconnect();
    },
    recompute() {
      computeAndWrite();
    },
  };
};

async function getLocalizationJson() {
  const RESPONSE = await fetch(
    new URL("./../data/localization.json", import.meta.url)
  );
  if (!RESPONSE.ok) {
    throw new Error("Failed to load localization JSON");
  }
  return await RESPONSE.json();
};

async function localize(data, langCode, langKey) {
  let translations = data[langCode];

  if (!translations) {
    console.warn(`Language "${langCode}" was not found, falling back to English...`);
    translations = data.en;
  }

  if (!Object.hasOwn(translations, langKey)) {
    throw new Error(`Localization key "${langKey}" was not found`);
  }

  return translations[langKey];
};

function createSwitchLabels(data) {
  let currentLang = document.documentElement.lang;

  async function labelPair(...switchSelector) {
    let localOn = await ZEHN.localize(data, currentLang, "Dialog_On");
    let localOff = await ZEHN.localize(data, currentLang, "Dialog_Off");
    
    for (var sel of [...switchSelector]) {
      ZEHN.createText('html', sel, ['.zehnLabelOn'], localOn);
      ZEHN.createText('html', sel, ['.zehnLabelOff'], localOff);
    }
  }

  labelPair('._9Ql-oVe_j8E-vsDdyVdWo', '._3Sl0QHQ69uK7ZMQo5vBfrA', '.DialogToggleField_OptionPanel'); // GAMEPAD, WHAT'S NEW & FRIENDS SETTINGS, OLD CHAT DIALOGS
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

  const CSS = [
    `:root {`,
    `  --zehn-icon-scroll-down-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DOWN_LIGHT)}");`,
    `  --zehn-icon-scroll-left-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(LEFT_LIGHT)}");`,
    `  --zehn-icon-scroll-right-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(RIGHT_LIGHT)}");`,
    `  --zehn-icon-scroll-up-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(UP_LIGHT)}");`,
    ``,
    `  --zehn-icon-scroll-down-active-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DOWN_ACTIVE_LIGHT)}");`,
    `  --zehn-icon-scroll-left-active-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(LEFT_ACTIVE_LIGHT)}");`,
    `  --zehn-icon-scroll-right-active-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(RIGHT_ACTIVE_LIGHT)}");`,
    `  --zehn-icon-scroll-up-active-light: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(UP_ACTIVE_LIGHT)}");`,
    ``,
    `  --zehn-icon-scroll-down-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DOWN_DARK)}");`,
    `  --zehn-icon-scroll-left-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(LEFT_DARK)}");`,
    `  --zehn-icon-scroll-right-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(RIGHT_DARK)}");`,
    `  --zehn-icon-scroll-up-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(UP_DARK)}");`,
    ``,
    `  --zehn-icon-scroll-down-active-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(DOWN_ACTIVE_DARK)}");`,
    `  --zehn-icon-scroll-left-active-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(LEFT_ACTIVE_DARK)}");`,
    `  --zehn-icon-scroll-right-active-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(RIGHT_ACTIVE_DARK)}");`,
    `  --zehn-icon-scroll-up-active-dark: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(UP_ACTIVE_DARK)}");`,
  `}`
];

  const STYLE = document.createElement('style');
  STYLE.id = 'zehnGlyphs';
  STYLE.textContent = CSS.join("\n");
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