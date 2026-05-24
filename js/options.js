export const Options = {
  applyOptions
};
export default Options;

async function applyOptions(options = {}) {
  const {
    source = 'https://steamloopback.host/skins/Zehn/options.json',
    baseDir = 'https://steamloopback.host/skins/Zehn/option/',
    ext = '.css',
    booleanNameMap = { true: 'on', false: 'off' },
    sanitizeSegments = true,
    containerSelector = 'head',
    attributePrefix = 'data-zehn-',
    checkExists = false,
    skipNull = true,
    checkStyleId = 'MillenniumQuickCss',
    forceApplyWhenVarsPresent = false,
    variableStyleId = 'zehnVarOptions',
    units = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'ch', 'ex', 'cm', 'mm', 'in', 'pt', 'pc']
  } = options;

  const container = document.querySelector(containerSelector) || document.head;
  const linkStore = new Map();
  const generatedMapping = {};
  const varMap = {};

  const unitPattern = new RegExp(`^[-+]?\\d*\\.?\\d+(?:${units.map(u => u.replace(/[%.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$`, 'i');

  function normalizePath(keyPath) {
    if (Array.isArray(keyPath)) return keyPath.slice();
    return String(keyPath).split('.').map(s => s.trim()).filter(Boolean);
  }

  function safeSegmentKeepSpaces(seg) {
    let s = String(seg).trim();
    if (!sanitizeSegments) return s;
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
    const segments = keyPathArray.map(safeSegmentKeepSpaces).filter(Boolean);
    let valueSegment;
    if (typeof value === 'boolean') valueSegment = booleanNameMap[value ? 'true' : 'false'];
    else if (value === null || value === undefined) valueSegment = 'null';
    else valueSegment = String(value);
    valueSegment = safeSegmentKeepSpaces(valueSegment);

    const parts = [baseDir.replace(/\/+$/, '')].concat(segments).concat([valueSegment]);
    return parts.join('/') + ext;
  }

  function makeAttrName(keyPath) {
    return `${attributePrefix}${String(keyPath).replace(/\./g, '-').replace(/\s+/g, '-')}`;
  }

  function addLink(keyPath, href, rawValue) {
    removeLink(keyPath);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    const attrName = makeAttrName(keyPath);
    const attrValue = rawValue === null || rawValue === undefined ? '' : String(rawValue);
    link.setAttribute(attrName, attrValue);
    container.appendChild(link);
    linkStore.set(String(keyPath), link);
  }

  function removeLink(keyPath) {
    const k = String(keyPath);
    const existing = linkStore.get(k) || container.querySelector(`link[${makeAttrName(keyPath)}]`);
    if (existing) {
      existing.remove();
      linkStore.delete(k);
    }
  }

  async function maybeAddLink(keyPath, href, rawValue, varsPresent) {
    if (varsPresent && !forceApplyWhenVarsPresent) {
      removeLink(keyPath);
      return false;
    }
    if (!checkExists) {
      addLink(keyPath, href, rawValue);
      return true;
    }
    try {
      const resp = await fetch(href, { method: 'HEAD', cache: 'no-store' });
      if (resp.ok) { addLink(keyPath, href, rawValue); return true; }
      removeLink(keyPath);
      return false;
    } catch (e) {
      removeLink(keyPath);
      return false;
    }
  }

  async function loadData(src) {
    if (typeof src === 'object' && src !== null) return src;
    const resp = await fetch(String(src), { cache: 'no-store' });
    if (!resp.ok) throw new Error('Failed to load JSON: ' + resp.status);
    return await resp.json();
  }

  function collectLeaves(obj, prefix = []) {
    const leaves = [];
    if (obj == null || typeof obj !== 'object' || Array.isArray(obj)) {
      leaves.push([prefix, obj]);
      return leaves;
    }
    for (const [k, v] of Object.entries(obj)) {
      const next = prefix.concat([k]);
      if (v != null && typeof v === 'object' && !Array.isArray(v)) {
        leaves.push(...collectLeaves(v, next));
      } else {
        leaves.push([next, v]);
      }
    }
    return leaves;
  }

  function applyRootVars(styleId = variableStyleId, prefix = 'theme') {
    const styleEl = document.getElementById(styleId) || (() => {
      const s = document.createElement('style');
      s.id = styleId;
      document.head.appendChild(s);
      return s;
    })();

    const lines = [];
    for (const [varName, val] of Object.entries(varMap)) {
      const safeVal = typeof val === 'string' && /\s/.test(val) && !/^["'].*["']$/.test(val) ? `"${val.replace(/"/g, '\\"')}"` : String(val);
      lines.push(`  --${prefix}-${varName}: ${safeVal};`);
    }
    styleEl.textContent = `:root {\n${lines.join('\n')}\n}`;
  }

  async function applyFrom(src) {
    const data = await loadData(src);
    const leaves = collectLeaves(data);

    Object.keys(generatedMapping).forEach(k => delete generatedMapping[k]);
    Object.keys(varMap).forEach(k => delete varMap[k]);

    const varsPresent = !!document.getElementById(checkStyleId);

    const tasks = leaves.map(async ([pathArray, value]) => {
      const keyPath = pathArray.join('.');
      if (skipNull && (value === null || value === undefined)) {
        removeLink(keyPath);
        return false;
      }

      const isUnitValue = (typeof value === 'string' || typeof value === 'number') && unitPattern.test(String(value).trim());
      if (isUnitValue) {
        const finalSeg = pathArray[pathArray.length - 1] || 'unnamed';
        const varName = safeVarNameFromFinalSegment(finalSeg);
        varMap[varName] = String(value).trim();
        removeLink(keyPath);
        generatedMapping[keyPath] = { value, href: null, type: 'var', varName };
        return true;
      }

      const href = buildHrefFromPath(pathArray, value);
      generatedMapping[keyPath] = { value, href, type: 'link' };
      return await maybeAddLink(keyPath, href, value, varsPresent);
    });

    await Promise.all(tasks);

    if (!varsPresent || forceApplyWhenVarsPresent) {
      if (Object.keys(varMap).length > 0) {
        applyRootVars(variableStyleId, 'option');
      } else {
        const existingStyle = document.getElementById(variableStyleId);
        if (existingStyle) existingStyle.remove();
      }
    } else {
      const existingStyle = document.getElementById(variableStyleId);
      if (existingStyle) existingStyle.remove();
    }

    return {
      appliedLinks: Array.from(linkStore.keys()),
      mapping: { ...generatedMapping },
      varsApplied: { ...varMap },
      varsPresent
    };
  }

  const result = await applyFrom(source);

  return {
    appliedLinks: result.appliedLinks,
    mapping: result.mapping,
    varsApplied: result.varsApplied,
    varsPresent: result.varsPresent,
    refresh: async (newSource = source) => await applyFrom(newSource),
    removeAll: () => {
      for (const k of Array.from(linkStore.keys())) removeLink(k);
      const styleEl = document.getElementById(variableStyleId);
      if (styleEl) styleEl.remove();
    }
  };
};