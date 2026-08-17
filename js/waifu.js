export const WAIFU = {
  findWaifu
};
export default WAIFU;

async function findWaifu() {
  const STEAM_LIST_URL = 'https://steamloopback.host/waifus/waifus.json';
  const FALLBACK_URL = './../waifus.json';
  const SCRIPT_ELEMENT = document.currentScript || (() => {
    const SCRIPTS = document.getElementsByTagName('script');
    return SCRIPTS[SCRIPTS.length - 1];
  })();
  const SCRIPT_SRC = SCRIPT_ELEMENT && SCRIPT_ELEMENT.src ? SCRIPT_ELEMENT.src : window.location.href;
  const SCRIPT_DIR = SCRIPT_SRC.replace(/\/[^/]*$/, '/');

  const resolveRelativeToScript = rel => new URL(rel, SCRIPT_DIR).href;

  const tryList = async url => {
    try {
      const RESPONSE = await fetch(url);
      if (!RESPONSE.ok) throw new Error('Fetching waifu JSON failed!');
      const LIST = await RESPONSE.json();
      if (!Array.isArray(LIST) || LIST.length === 0) throw new Error('JSON has empty waifu list!');
      return LIST;
    } catch {
      console.warn('Cannot find a valid waifu JSON at ' + url + '.');
      return null;
    }
  };

  const STEAM_LIST = await tryList(STEAM_LIST_URL);
  if (!STEAM_LIST) console.warn('Attempting to use fallback waifu JSON in Zehn directory...');
  const FALLBACK_LIST = STEAM_LIST ? null : await tryList(resolveRelativeToScript(FALLBACK_URL));
  const LIST = STEAM_LIST || FALLBACK_LIST;
  if (!LIST) {
    console.warn('No valid waifu list available!');
    return;
  }

  setRandomWaifu(LIST);
};

async function setRandomWaifu(list) {
  const REMAINING = list.slice();

  while (REMAINING.length) {
    const IDX = Math.floor(Math.random() * REMAINING.length);
    const CANDIDATE = REMAINING.splice(IDX, 1)[0];

    const OK = await imageLoads(CANDIDATE);
    if (OK) {
      const LINES = [
        `:root {`,
        `  --zehn-waifu: url("${CANDIDATE}");`,
        `}`
      ];

      const EL = document.createElement('style');
      EL.id = 'zehnWaifu';
      EL.textContent = LINES.join("\n");
      document.head.appendChild(EL);

      console.info('Using ' + CANDIDATE + ' for your waifu!')
      return;
    }

    console.warn(CANDIDATE + ' is not a valid waifu, attempting to find another...');
  }

  console.warn('No valid waifu found!');
};

function imageLoads(src, timeout = 5000) {
  return new Promise(resolve => {
    const IMG = new Image();
    let completed = false;

    const done = result => {
      if (completed) return;
      completed = true;
      clearTimeout(TIMER);
      IMG.onload = IMG.onerror = null;
      resolve(result);
    };

    IMG.onload = () => done(true);
    IMG.onerror = () => done(false);

    const TIMER = setTimeout(() => done(false), timeout);
    IMG.src = src;
  });
};