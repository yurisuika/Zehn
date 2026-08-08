import Zehn from './zehn.js';

export const Reveal = {
  addRevealClass,
  revealInner,
  revealSelf,
  reveal
};
export default Reveal;

function addRevealClass(rootSelector, targetSelectors, additionalNames = []) {
  targetSelectors.forEach((targetSelector) => {
    Zehn.handleOnMutation(rootSelector, targetSelector, (root, target) => {
      target.classList.toggle('zehnReveal', true);
      additionalNames.forEach(name => {target.classList.toggle(name, true)});
    }, { shouldObserveTarget: false, shouldDisconnect: true, shouldAddAttributeFilter: true });
  });
};

function revealInner(containerSelector) {
  Zehn.handleOnMutation(containerSelector, '.zehnReveal', (container, revealed) => {
    this.reveal(container, revealed);
  });
};

function revealSelf(selfSelector) {
  Zehn.findTargets(document, selfSelector, (revealed) => {
    this.reveal(revealed, revealed);
  }, false);
};

function reveal(container, revealed) {
  if (getComputedStyle(document.documentElement).getPropertyValue('--zehn-transparency-effects-reveal').trim() == 0) return;

  const targets = [revealed];
  const maskSize = 150;
  const halfMask = maskSize / 2;

  let containerRect = container.getBoundingClientRect();
  let targetOffsets = new Map();
  let pending = false;
  let pointerX = 0, pointerY = 0;
  let pointerInside = false;

  function refreshRects() {
    containerRect = container.getBoundingClientRect();
    targetOffsets.clear();
    for (const t of targets) {
      const r = t.getBoundingClientRect();
      targetOffsets.set(t, {
        left: r.left - containerRect.left,
        top: r.top - containerRect.top,
        width: r.width,
        height: r.height,
      });
    }
  }

  function applyMaskToTarget(t, px, py) {
    t.style.setProperty('--mX', `${px}px`);
    t.style.setProperty('--mY', `${py}px`);
    t.style.setProperty('--mSize', `${maskSize}px`);
  }

  function hideMaskOnTarget(t) {
    t.style.setProperty('--mX', `0px`);
    t.style.setProperty('--mY', `0px`);
    t.style.setProperty('--mSize', `0px`);
  }

  function updateMasks() {
    if (!pointerInside) {
      for (const t of targets) hideMaskOnTarget(t);
    } else {
      for (const t of targets) {
        const off = targetOffsets.get(t);
        if (!off) continue;

        const px = Math.round(pointerX - off.left - halfMask);
        const py = Math.round(pointerY - off.top - halfMask);

        const key = `${px},${py}`;
        if (t.__lastMaskPos === key) continue;
        t.__lastMaskPos = key;

        applyMaskToTarget(t, px, py);
      }
    }
    pending = false;
  }

  container.addEventListener('pointermove', (e) => {
    pointerX = e.clientX - containerRect.left;
    pointerY = e.clientY - containerRect.top;

    pointerInside =
      pointerX >= 0 &&
      pointerX <= containerRect.width &&
      pointerY >= 0 &&
      pointerY <= containerRect.height;

    if (!pending) {
      pending = true;
      requestAnimationFrame(updateMasks);
    }
  }, { passive: true });

  container.addEventListener('pointerleave', () => {
    pointerInside = false;
    if (!pending) {
      pending = true;
      requestAnimationFrame(updateMasks);
    }
  });

  container.addEventListener('pointerenter', () => {
    refreshRects();
    pointerInside = true;
  });

  const RIPPLE_POOL_SIZE = 5;
  const SLOW = 1;
  const FAST = 10;

  if (!container.__rippleTargets) container.__rippleTargets = new Set();
  container.__rippleTargets.add(revealed);

  function ensureRipplePool(t) {
    if (t.__ripplePool) return;

    const pool = [];
    for (let i = 0; i < RIPPLE_POOL_SIZE; i++) {
      const r = document.createElement('span');
      r.className = 'zehnRipple';
      r.style.display = 'none';
      t.appendChild(r);
      pool.push(r);
    }
    t.__ripplePool = pool;
    t.__rippleIndex = 0;
  }

  function spawnRipple(t, x, y) {
    ensureRipplePool(t);

    const pool = t.__ripplePool;
    const idx = (t.__rippleIndex = (t.__rippleIndex + 1) % pool.length);
    const ripple = pool[idx];

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.display = 'block';

    const anim = ripple.animate(
      [
        { transform: 'translate(-50%, -50%) scale(50)', opacity: 1, '--crest': '0%' },
        { transform: 'translate(-50%, -50%) scale(150)', opacity: 1, '--crest': '50%' }
      ],
      { duration: 5000, easing: 'ease-out', fill: 'forwards' }
    );

    anim.playbackRate = SLOW;
    ripple.__rippleAnim = anim;

    anim.onfinish = () => {
      ripple.style.display = 'none';
      ripple.__rippleAnim = null;
    };

    return ripple;
  }

  if (!container.__rippleClickBound) {
    container.__rippleClickBound = true;

    let isDown = false;

    container.addEventListener('pointerdown', (e) => {
      const t = e.target.closest('.zehnRevealRipple');
      if (!t) return;
      if (!container.__rippleTargets.has(t)) return;

      isDown = true;

      const rect = t.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = spawnRipple(t, x, y);

      container.__activeRipple = ripple;
    }, { passive: true });

    const speedUp = () => {
      isDown = false;
      const ripple = container.__activeRipple;
      if (!ripple) return;

      const anim = ripple.__rippleAnim;
      if (anim) anim.playbackRate = FAST;
    };

    container.addEventListener('pointerup', speedUp, { passive: true });
    container.addEventListener('pointercancel', speedUp, { passive: true });
  }

  let refreshTimer = 100;
  function scheduleRefreshRects() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshRects, 100);
  }
  window.addEventListener('resize', scheduleRefreshRects, { passive: true });
  window.addEventListener('scroll', scheduleRefreshRects, { passive: true });

  refreshRects();
};