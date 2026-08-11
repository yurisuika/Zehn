import ZEHN from './zehn.js';

export const REVEAL = {
  addRevealClass,
  revealInner,
  revealSelf,
  reveal
};
export default REVEAL;

function addRevealClass(rootSelector, targetSelectors, additionalNames = []) {
  targetSelectors.forEach((targetSelector) => {
    ZEHN.handleOnMutation(rootSelector, targetSelector, (root, target) => {
      target.classList.toggle('zehnReveal', true);
      additionalNames.forEach(name => {target.classList.toggle(name, true)});
    }, { shouldObserveTarget: false, shouldDisconnect: true, shouldAddAttributeFilter: true });
  });
};

function revealInner(containerSelector, maskSize) {
  ZEHN.handleOnMutation(containerSelector, '.zehnReveal', (container, revealed) => {
    this.reveal(container, revealed, maskSize);
  });
};

function revealSelf(selfSelector, maskSize) {
  ZEHN.findTargets(document, selfSelector, (revealed) => {
    this.reveal(revealed, revealed, maskSize);
  }, false);
};

function reveal(container, revealed, maskSize = 150) {
  if (getComputedStyle(document.documentElement).getPropertyValue('--zehn-transparency-effects-reveal').trim() == 0) return;

  const TARGETS = [revealed];
  const MASK_SIZE = maskSize;
  const HALF_MASK = MASK_SIZE / 2;

  let containerRect = container.getBoundingClientRect();
  let targetOffsets = new Map();
  let pending = false;
  let pointerX = 0, pointerY = 0;
  let pointerInside = false;

  function refreshRects() {
    containerRect = container.getBoundingClientRect();
    targetOffsets.clear();
    for (const T of TARGETS) {
      const RECT = T.getBoundingClientRect();
      targetOffsets.set(T, {
        left: RECT.left - containerRect.left,
        top: RECT.top - containerRect.top,
        width: RECT.width,
        height: RECT.height,
      });
    }
  }

  function applyMaskToTarget(t, px, py) {
    t.style.setProperty('--mX', `${px}px`);
    t.style.setProperty('--mY', `${py}px`);
    t.style.setProperty('--mSize', `${MASK_SIZE}px`);
  }

  function hideMaskOnTarget(t) {
    t.style.setProperty('--mX', `0px`);
    t.style.setProperty('--mY', `0px`);
    t.style.setProperty('--mSize', `0px`);
  }

  function updateMasks() {
    if (!pointerInside) {
      for (const T of TARGETS) hideMaskOnTarget(T);
    } else {
      for (const T of TARGETS) {
        const OFF = targetOffsets.get(T);
        if (!OFF) continue;

        const PX = Math.round(pointerX - OFF.left - HALF_MASK);
        const PY = Math.round(pointerY - OFF.top - HALF_MASK);

        const KEY = `${PX},${PY}`;
        if (T.__lastMaskPos === KEY) continue;
        T.__lastMaskPos = KEY;

        applyMaskToTarget(T, PX, PY);
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

    const POOL = [];
    for (let i = 0; i < RIPPLE_POOL_SIZE; i++) {
      const RIPPLE = document.createElement('span');
      RIPPLE.className = 'zehnRipple';
      RIPPLE.style.display = 'none';
      t.appendChild(RIPPLE);
      POOL.push(RIPPLE);
    }
    t.__ripplePool = POOL;
    t.__rippleIndex = 0;
  }

  function spawnRipple(t, x, y) {
    ensureRipplePool(t);

    const POOL = t.__ripplePool;
    const IDX = (t.__rippleIndex = (t.__rippleIndex + 1) % POOL.length);
    const RIPPLE = POOL[IDX];

    RIPPLE.style.left = `${x}px`;
    RIPPLE.style.top = `${y}px`;
    RIPPLE.style.display = 'block';

    const ANIM = RIPPLE.animate(
      [
        { transform: 'translate(-50%, -50%) scale(50)', opacity: 1, '--crest': '0%' },
        { transform: 'translate(-50%, -50%) scale(150)', opacity: 1, '--crest': '50%' }
      ],
      { duration: 5000, easing: 'ease-out', fill: 'forwards' }
    );

    ANIM.playbackRate = SLOW;
    RIPPLE.__rippleAnim = ANIM;

    ANIM.onfinish = () => {
      RIPPLE.style.display = 'none';
      RIPPLE.__rippleAnim = null;
    };

    return RIPPLE;
  }

  if (!container.__rippleClickBound) {
    container.__rippleClickBound = true;

    let isDown = false;

    container.addEventListener('pointerdown', (e) => {
      const T = e.target.closest('.zehnRevealRipple');
      if (!T) return;
      if (!container.__rippleTargets.has(T)) return;

      isDown = true;

      const RECT = T.getBoundingClientRect();
      const X = e.clientX - RECT.left;
      const Y = e.clientY - RECT.top;

      const RIPPLE = spawnRipple(T, X, Y);

      container.__activeRipple = RIPPLE;
    }, { passive: true });

    const speedUp = () => {
      isDown = false;
      const RIPPLE = container.__activeRipple;
      if (!RIPPLE) return;

      const ANIM = RIPPLE.__rippleAnim;
      if (ANIM) ANIM.playbackRate = FAST;
    };

    container.addEventListener('pointerup', speedUp, { passive: true });
    container.addEventListener('pointercancel', speedUp, { passive: true });
  }

  let refreshTimer = 10;
  function scheduleRefreshRects() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshRects, 10);
  }
  window.addEventListener('resize', scheduleRefreshRects, { passive: true });
  window.addEventListener('scroll', scheduleRefreshRects, { passive: true });

  refreshRects();
};