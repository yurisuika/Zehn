export const OPTION = {
  applyOptions
};
export default OPTION;

/* OPTION ----------------------------------------------------------------------------------------------------------- */

async function applyOptions() {
  if (document.getElementById('MillenniumQuickCss')) return;

  const VARIABLE_STYLE_ID = 'VariableOptions';
  const BOOLEAN_NAME_MAP = { true: 'on', false: 'off' };
  const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'ch', 'ex', 'cm', 'mm', 'in', 'pt', 'pc'];

  const MATCH = import.meta.url.match(/\/skins\/([^\/]+)\//);
  const THEME_FOLDER = MATCH ? MATCH[1] : 'Zehn';

  const SOURCE = `https://steamloopback.host/skins/${THEME_FOLDER}/options.json`;
  const BASE_DIR = `https://steamloopback.host/skins/${THEME_FOLDER}/option/`;

  const CONTAINER = document.querySelector('head') || document.head;
  const LINK_STORE = new Map();
  const GENERATED_MAPPING = {};
  const VAR_MAP = {};

  const UNIT_PATTERN = new RegExp(`^[-+]?\\d*\\.?\\d+(?:${UNITS.map(u => u.replace(/[%.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`, 'i');

  function safeSegmentKeepSpaces(seg) {
    let s = String(seg).trim();
    s = s.replace(/[^\w\s\-\._]/g, '');
    s = s.replace(/\s+/g, ' ');
    return s;
  }

  function safeVarNameFromFinalSegment(seg) {
    return String(seg)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-_]/g, '')
      .replace(/^-+/, '')
      .replace(/-+$/, '') || 'unnamed';
  }

  function buildHrefFromPath(keyPathArray, value) {
    const SEGMENTS = keyPathArray.map(safeSegmentKeepSpaces).filter(Boolean);
    let valueSegment;
    if (typeof value === 'boolean') valueSegment = BOOLEAN_NAME_MAP[value ? 'true' : 'false'];
    else if (value === null || value === undefined) valueSegment = 'null';
    else valueSegment = String(value);
    valueSegment = safeSegmentKeepSpaces(valueSegment);

    const PARTS = [BASE_DIR.replace(/\/+$/, '')].concat(SEGMENTS).concat([valueSegment]);
    return PARTS.join('/') + '.css';
  }

  function makeAttrName(keyPath) {
    return `data-${String(keyPath).replace(/\./g, '-').replace(/\s+/g, '-')}`;
  }

  function addLink(keyPath, href, rawValue) {
    removeLink(keyPath);
    const LINK = document.createElement('link');
    LINK.rel = 'stylesheet';
    LINK.href = href;
    const ATTR_NAME = makeAttrName(keyPath);
    const ATTR_VALUE = rawValue === null || rawValue === undefined ? '' : String(rawValue);
    LINK.setAttribute(ATTR_NAME, ATTR_VALUE);
    CONTAINER.appendChild(LINK);
    LINK_STORE.set(String(keyPath), LINK);
  }

  function removeLink(keyPath) {
    const KEY = String(keyPath);
    const EXISTING = LINK_STORE.get(KEY) || CONTAINER.querySelector(`link[${makeAttrName(keyPath)}]`);
    if (EXISTING) {
      EXISTING.remove();
      LINK_STORE.delete(KEY);
    }
  }

  async function maybeAddLink(keyPath, href, rawValue) {
    addLink(keyPath, href, rawValue);
    return true;
  }

  async function loadData(src) {
    if (typeof src === 'object' && src !== null) return src;
    const RESPONSE = await fetch(String(src), { cache: 'no-store' });
    if (!RESPONSE.ok) throw new Error('Failed to load JSON: ' + RESPONSE.status);
    return await RESPONSE.json();
  }

  function collectLeaves(obj, prefix = []) {
    const LEAVES = [];
    if (obj == null || typeof obj !== 'object' || Array.isArray(obj)) {
      LEAVES.push([prefix, obj]);
      return LEAVES;
    }
    for (const [KEY, VALUE] of Object.entries(obj)) {
      const NEXT = prefix.concat([KEY]);
      if (VALUE != null && typeof VALUE === 'object' && !Array.isArray(VALUE)) {
        LEAVES.push(...collectLeaves(VALUE, NEXT));
      } else {
        LEAVES.push([NEXT, VALUE]);
      }
    }
    return LEAVES;
  }

  function applyRootVars() {
    const STYLE = document.getElementById(VARIABLE_STYLE_ID) || (() => {
      const STYLE = document.createElement('style');
      STYLE.dataset.variableOptions = "";
      STYLE.id = VARIABLE_STYLE_ID;
      document.head.appendChild(STYLE);
      return STYLE;
    })();

    const CSS_TEXT = [];
    for (const [VAR_NAME, VAL] of Object.entries(VAR_MAP)) {
      const SAFE_VAL = typeof VAL === 'string' && /\s/.test(VAL) && !/^["'].*["']$/.test(VAL) ? `"${VAL.replace(/"/g, '\\"')}"` : String(VAL);
      CSS_TEXT.push(`  --option-${VAR_NAME}: ${SAFE_VAL};`);
    }
    STYLE.textContent = `:root {\n${CSS_TEXT.join('\n')}\n}`;
  }

  async function applyFrom(src) {
    const DATA = await loadData(src);
    const LEAVES = collectLeaves(DATA);

    Object.keys(GENERATED_MAPPING).forEach(k => delete GENERATED_MAPPING[k]);
    Object.keys(VAR_MAP).forEach(k => delete VAR_MAP[k]);

    const TASKS = LEAVES.map(async ([pathArray, value]) => {
      const KEY_PATH = pathArray.join('.');
      if (value === null || value === undefined) {
        removeLink(KEY_PATH);
        return false;
      }

      const IS_UNIT_VALUE = (typeof value === 'string' || typeof value === 'number') && UNIT_PATTERN.test(String(value).trim());
      if (IS_UNIT_VALUE) {
        const FINAL_SEGMENT = pathArray[pathArray.length - 1] || 'unnamed';
        const VAR_NAME = safeVarNameFromFinalSegment(FINAL_SEGMENT);
        VAR_MAP[VAR_NAME] = String(value).trim();
        removeLink(KEY_PATH);
        GENERATED_MAPPING[KEY_PATH] = { value, href: null, type: 'var', varName: VAR_NAME };
        return true;
      }

      const HREF = buildHrefFromPath(pathArray, value);
      GENERATED_MAPPING[KEY_PATH] = { value, href: HREF, type: 'link' };
      return await maybeAddLink(KEY_PATH, HREF, value);
    });

    await Promise.all(TASKS);

    if (Object.keys(VAR_MAP).length > 0) {
      applyRootVars();
    } else {
      const EXISTING_STYLE = document.getElementById(VARIABLE_STYLE_ID);
      if (EXISTING_STYLE) EXISTING_STYLE.remove();
    }

    return {
      appliedLinks: Array.from(LINK_STORE.keys()),
      mapping: { ...GENERATED_MAPPING },
      varsApplied: { ...VAR_MAP }
    };
  }

  const RESULT = await applyFrom(SOURCE);

  return {
    appliedLinks: RESULT.appliedLinks,
    mapping: RESULT.mapping,
    varsApplied: RESULT.varsApplied,
    refresh: async (newSource = SOURCE) => await applyFrom(newSource)
  };
}