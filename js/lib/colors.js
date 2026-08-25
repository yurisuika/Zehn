export const COLORS = {
  convertAccentColors,
  colorScrollbarGlyphs
};
export default COLORS;

/* COLORS ----------------------------------------------------------------------------------------------------------- */

function convertAccentColors() {
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

function colorScrollbarGlyphs() {
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