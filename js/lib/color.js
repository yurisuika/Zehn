export const COLOR = {
  generateAccentColors,
  colorScrollbarGlyphs
};
export default COLOR;

/* COLOR ------------------------------------------------------------------------------------------------------------ */

function generateAccentColors({
  source = '--SystemAccentColor',
  prefix = '--rgb-accent',
  sheet
} = {}) {
  const ACCENT_VALUE = getComputedStyle(document.documentElement).getPropertyValue(source).trim();
  const RGB = parseCssColor(ACCENT_VALUE);
  const HSL = rgbToHsl(RGB);

  const LIGHTS = [
    createVariant(HSL, {
      lightness: 0.135,
      saturationScale: 0.974
    }),
    createVariant(HSL, {
      lightness: 0.270,
      saturationScale: 0.881
    }),
    createVariant(HSL, {
      lightness: 0.465,
      saturationScale: 0.767
    })
  ];

  const DARKS = [
    createVariant(HSL, {
      lightness: -0.083,
      saturationScale: 0.991
    }),
    createVariant(HSL, {
      lightness: -0.160,
      saturationScale: 1.110
    }),
    createVariant(HSL, {
      lightness: -0.271,
      saturationScale: 1.027
    })
  ];

  const DECLARATIONS = [
    [
      prefix,
      toRgbTriplet(RGB)
    ],

    ...LIGHTS.map((color, index) => [
      `${prefix}-light-${index + 1}`,
      toRgbTriplet(color)
    ]),

    ...DARKS.map((color, index) => [
      `${prefix}-dark-${index + 1}`,
      toRgbTriplet(color)
    ])
  ];

  const CSS_TEXT = DECLARATIONS.map(([name, value]) => `  ${name}: ${value};`).join("\n");

  if (sheet) {
    for (let i = sheet.cssRules.length - 1; i >= 0; i--) {
      const RULE = sheet.cssRules[i];

      if (
        RULE.selectorText === ':root' &&
        RULE.style.getPropertyValue(`${prefix}`)
      ) {
        sheet.deleteRule(i);
      }
    }

    sheet.insertRule(`:root {\n${CSS_TEXT}\n}`, sheet.cssRules.length);
    return sheet;
  }

  const STYLE = document.createElement('style');
  STYLE.dataset.accentColors = '';
  STYLE.id = 'Accents';
  STYLE.textContent = `:root {\n${CSS_TEXT}\n}`;
  document.head.appendChild(STYLE);

  return STYLE;
}

// function convertAccentColors() {
//   const STYLE_ELEMENT_ID = 'zehnAccents';
//   const OBSERVE_SUBTREE = true;
//   const OBSERVER_IDS = ['SystemAccentColorInject', 'SystemAccentColorInjection'];
//   const STYLE_ID_SET = new Set(OBSERVER_IDS);

//   const computeAndWrite = () => {
//     function hexToRgbTriplet(hex) {
//       const H = hex.startsWith("#") ? hex.slice(1) : hex;
//       if (!/^[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(H)) {
//         throw new Error("Expected hex like #RRGGBB or #RRGGBBAA (6 or 8 hex digits).");
//       }

//       const RR = parseInt(H.slice(0, 2), 16);
//       const GG = parseInt(H.slice(2, 4), 16);
//       const BB = parseInt(H.slice(4, 6), 16);

//       return `${RR}, ${GG}, ${BB}`;
//     };

//     const VAR_MAP = {
//       "--SystemAccentColor": "--rgb-accent",
//       "--SystemAccentColorLight1": "--rgb-accent-light1",
//       "--SystemAccentColorLight2": "--rgb-accent-light2",
//       "--SystemAccentColorLight3": "--rgb-accent-light3",
//       "--SystemAccentColorDark1": "--rgb-accent-dark1",
//       "--SystemAccentColorDark2": "--rgb-accent-dark2",
//       "--SystemAccentColorDark3": "--rgb-accent-dark3"
//     };

//     const ROOT_STYLE = getComputedStyle(document.documentElement);
    
//     let cssText = ":root{\n";
//     for (const [SRC_VAR, DST_VAR] of Object.entries(VAR_MAP)) {
//       const HEX = ROOT_STYLE.getPropertyValue(SRC_VAR).trim();
//       if (!HEX) throw new Error(`Missing CSS variable value for ${SRC_VAR}`);

//       const TRIPLET = hexToRgbTriplet(HEX);
//       cssText += `  ${DST_VAR}: ${TRIPLET};\n`;
//     }
//     cssText += "}\n";

//     let el = STYLE_ELEMENT_ID ? document.getElementById(STYLE_ELEMENT_ID) : null;
//     if (!el) {
//       el = document.createElement("style");
//       if (STYLE_ELEMENT_ID) el.id = STYLE_ELEMENT_ID;
//       document.head.appendChild(el);
//     }
//     el.textContent = cssText;
//   };

//   computeAndWrite();

//   const MO = new MutationObserver(() => {
//     computeAndWrite();
//   });

//   const TARGETS = ['SystemAccentColorInject', 'SystemAccentColorInjection']
//     .map((id) => document.getElementById(id))
//     .filter(Boolean);

//   for (const EL of TARGETS) {
//     MO.observe(EL, {
//       characterData: true,
//       subtree: OBSERVE_SUBTREE,
//       childList: true,
//       attributes: true,
//       attributeFilter: ["id", "class", "media", "type"],
//     });
//   }

//   const HEAD_OBSERVER = new MutationObserver((mutations) => {
//     let relevant = false;

//     for (const M of mutations) {
//       for (const NODE of [...M.addedNodes, ...M.removedNodes]) {
//         if (NODE && NODE.nodeType === 1) {
//           const TAG = NODE.tagName ? NODE.tagName.toLowerCase() : "";
//           const NODE_ID = NODE.id || "";
//           if (TAG === "style" && STYLE_ID_SET.has(NODE_ID)) relevant = true;

//           if (NODE.querySelectorAll && TAG === "style") {
//           }
//         }
//         if (NODE && NODE.querySelectorAll) {
//           const FOUND = NODE.querySelectorAll("style[id]");
//           for (const ST of FOUND) {
//             if (STYLE_ID_SET.has(ST.id)) relevant = true;
//           }
//         }
//       }
//     }

//     if (!relevant) return;

//     computeAndWrite();

//     MO.disconnect();
//     const NEW_TARGETS = ['SystemAccentColorInject', 'SystemAccentColorInjection']
//       .map((id) => document.getElementById(id))
//       .filter(Boolean);

//     for (const el of NEW_TARGETS) {
//       MO.observe(el, {
//         characterData: true,
//         subtree: OBSERVE_SUBTREE,
//         childList: true,
//         attributes: true,
//         attributeFilter: ["id", "class", "media", "type"],
//       });
//     }
//   });

//   HEAD_OBSERVER.observe(document.head, { childList: true, subtree: true });

//   return {
//     disconnect() {
//       MO.disconnect();
//       HEAD_OBSERVER.disconnect();
//     },
//     recompute() {
//       computeAndWrite();
//     },
//   };
// }

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

  const GLYPHS = [
    ['down-light', DOWN_LIGHT],
    ['left-light', LEFT_LIGHT],
    ['right-light', RIGHT_LIGHT],
    ['up-light', UP_LIGHT],
    ['down-active-light', DOWN_ACTIVE_LIGHT],
    ['left-active-light', LEFT_ACTIVE_LIGHT],
    ['right-active-light', RIGHT_ACTIVE_LIGHT],
    ['up-active-light', UP_ACTIVE_LIGHT],
    ['down-dark', DOWN_DARK],
    ['left-dark', LEFT_DARK],
    ['right-dark', RIGHT_DARK],
    ['up-dark', UP_DARK],
    ['down-active-dark', DOWN_ACTIVE_DARK],
    ['left-active-dark', LEFT_ACTIVE_DARK],
    ['right-active-dark', RIGHT_ACTIVE_DARK],
    ['up-active-dark', UP_ACTIVE_DARK]
  ];

  const CSS_TEXT = GLYPHS.map(([name, value]) => `  --zehn-icon-scroll-${name}: url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(value)})");`).join("\n");

  const STYLE = document.createElement('style');
  STYLE.dataset.scrollbarGlyphs = '';
  STYLE.id = 'ScrollbarGlyphs';
  STYLE.textContent = `:root {\n${CSS_TEXT}\n}`;
  document.head.appendChild(STYLE);
}










/* INTERNAL --------------------------------------------------------------------------------------------------------- */

function createVariant(hsl, {
  lightness,
  saturationScale
}) {
  let l;

  if (lightness >= 0) {
    l = hsl.l + (1 - hsl.l) * lightness;
  } else {
    l = hsl.l * (1 + lightness);
  }

  const VARIANT = {
    h: hsl.h,
    s: clamp(hsl.s * saturationScale, 0, 1),
    l: clamp(l, 0, 1)
  };

  return hslToRgb(VARIANT);
}

function rgbToHsl({ r, g, b }) {
  r /= 255;
  g /= 255;
  b /= 255;

  const MAX = Math.max(r, g, b);
  const MIN = Math.min(r, g, b);
  const DELTA = MAX - MIN;

  let h = 0;
  let s = 0;
  const L = (MAX + MIN) / 2;

  if (DELTA !== 0) {
    s = DELTA / (1 - Math.abs(2 * L - 1));

    switch (MAX) {
      case r:
        h = ((g - b) / DELTA) % 6;
        break;
      case g:
        h = (b - r) / DELTA + 2;
        break;
      default:
        h = (r - g) / DELTA + 4;
    }

    h *= 60;

    if (h < 0) {
      h += 360;
    }
  }

  return { h, s, l: L };
}

function hslToRgb({ h, s, l }) {
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs((h / 60) % 2 - 1));
  const M = l - C / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) {
    r = C;
    g = X;
  } else if (h < 120) {
    r = X;
    g = C;
  } else if (h < 180) {
    g = C;
    b = X;
  } else if (h < 240) {
    g = X;
    b = C;
  } else if (h < 300) {
    r = X;
    b = C;
  } else {
    r = C;
    b = X;
  }

  return {
    r: (r + M) * 255,
    g: (g + M) * 255,
    b: (b + M) * 255
  };
}

function parseCssColor(value) {
  const TRIPLET = value.match(/^\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*$/);

  if (TRIPLET) {
    const CHANNELS = TRIPLET.slice(1).map(Number);

    if (CHANNELS.every(channel => channel >= 0 && channel <= 255)) {
      return {
        r: CHANNELS[0],
        g: CHANNELS[1],
        b: CHANNELS[2]
      };
    }

    return null;
  }

  const PROBE = document.createElement('span');
  PROBE.style.color = value;

  if (!PROBE.style.color) {
    return null;
  }

  PROBE.style.position = 'absolute';
  PROBE.style.visibility = 'hidden';
  document.body.appendChild(PROBE);

  const NORMALIZED = getComputedStyle(PROBE).color;
  PROBE.remove();

  const MATCH = NORMALIZED.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);

  if (!MATCH) {
    return null;
  }

  return {
    r: Number(MATCH[1]),
    g: Number(MATCH[2]),
    b: Number(MATCH[3])
  };
}

function toRgbTriplet({ r, g, b }) {
  return [
    Math.round(clamp(r, 0, 255)),
    Math.round(clamp(g, 0, 255)),
    Math.round(clamp(b, 0, 255))
  ].join(", ");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}