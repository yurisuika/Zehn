export const Waifu = {
  findWaifu
};
export default Waifu;

async function findWaifu() {
  const steamListUrl = 'https://steamloopback.host/waifus/waifus.json';
  const fallbackRelative = './../waifus.json';
  const scriptEl = document.currentScript || (() => {
    const scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  const scriptSrc = scriptEl && scriptEl.src ? scriptEl.src : window.location.href;
  const scriptDir = scriptSrc.replace(/\/[^/]*$/, '/');

  const resolveRelativeToScript = rel => new URL(rel, scriptDir).href;

  const tryList = async url => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Fetch failed!');
      const list = await res.json();
      if (!Array.isArray(list) || list.length === 0) throw new Error('Empty waifu list!');
      return list;
    } catch {
      return null;
    }
  };

  const listA = await tryList(steamListUrl);
  if (!listA) console.warn('Cannot find a waifu JSON at ' + steamListUrl + ', attempting to use fallback in Zehn directory...');
  const listB = listA ? null : await tryList(resolveRelativeToScript(fallbackRelative));
  const list = listA || listB;
  if (!list) {
    console.warn('No waifu lists available!');
    return;
  }

  setRandomWaifu(list);
};

async function setRandomWaifu(list) {
  const remaining = list.slice();

  while (remaining.length) {
    const idx = Math.floor(Math.random() * remaining.length);
    const candidate = remaining.splice(idx, 1)[0];

    const ok = await imageLoads(candidate);
    if (ok) {
      document.documentElement.style.setProperty('--zehn-waifu', `url("${candidate}")`);

      console.info('Using ' + candidate + ' for your waifu!')
      return;
    }

    console.warn(candidate + ' is not a valid waifu, attempting to find another...');
  }

  console.warn('No valid waifus found!');
};

function imageLoads(src, timeout = 5000) {
  return new Promise(resolve => {
    const img = new Image();
    let completed = false;

    const done = result => {
      if (completed) return;
      completed = true;
      clearTimeout(timer);
      img.onload = img.onerror = null;
      resolve(result);
    };

    img.onload = () => done(true);
    img.onerror = () => done(false);

    const timer = setTimeout(() => done(false), timeout);
    img.src = src;
  });
};