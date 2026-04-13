const Zehn = {
  addUserAgent() {
    if (navigator.userAgent.includes('Linux')) {
      document.documentElement.classList.add('Linux');
    } else if (navigator.userAgent.includes('Windows')) {
      document.documentElement.classList.add('Windows');
    }
  },

  observeRootForCallback(rootSelector, targetSelector, callback) {
    const processed = new WeakSet();
    const rootObservers = new Map();

    function handleTarget(root, target) {
      if (processed.has(target)) return;
      processed.add(target);
      try { callback(root, target); } catch (e) { console.error(e); }
    }

    function scanAndObserveRoot(root) {
      if (rootObservers.has(root)) return;
      root.querySelectorAll(targetSelector).forEach(target => handleTarget(root, target));

      const rootObserver = new MutationObserver(mutations => {
        for (const mutation of mutations) {
          if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
              if (!(node instanceof Element)) continue;
              if (node.matches && node.matches(targetSelector)) handleTarget(root, node);
              if (node.querySelectorAll) node.querySelectorAll(targetSelector).forEach(i => handleTarget(root, i));
            }
          }
        }
      });
      rootObserver.observe(root, { childList: true, subtree: true });
      rootObservers.set(root, rootObserver);
    }

    document.querySelectorAll(rootSelector).forEach(scanAndObserveRoot);

    const documentObserver = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (node.matches && node.matches(rootSelector)) scanAndObserveRoot(node);
            if (node.querySelectorAll) node.querySelectorAll(rootSelector).forEach(scanAndObserveRoot);
          }
        }
      }
    });
    documentObserver.observe(document.body || document, { childList: true, subtree: true });

    return {
      disconnect() {
        documentObserver.disconnect();
        for (const rootObserver of rootObservers.values()) rootObserver.disconnect();
        rootObservers.clear();
      }
    };
  },

  observeForCallback(root, targetSelector, callback) {
    const processed = new WeakSet();

    function handleTarget(target) {
      if (processed.has(target)) return;
      processed.add(target);
      try { callback(root, target); } catch (e) { console.error(e); }
    }

    if (root instanceof Element) {
      root.querySelectorAll(targetSelector).forEach(handleTarget);
    }

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type !== 'childList') continue;
        for (const node of mutation.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.matches && node.matches(targetSelector)) handleTarget(node);
          if (node.querySelectorAll) node.querySelectorAll(targetSelector).forEach(handleTarget);
        }
      }
    });

    observer.observe(root, { childList: true, subtree: true });

    return {
      disconnect() {
        observer.disconnect();
      }
    };
  },

  observeForCallbackIfMissing(rootSelector, targetSelector, additionSelector, callback) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      if (!target.querySelector(additionSelector)) callback(root, target, additionSelector);
    });
  },

  addButton(rootSelector, targetSelector, nameSelector, additionalNameSelectors, position, defaultToggled, callback) {
    this.observeForCallbackIfMissing(rootSelector, targetSelector, nameSelector, (root, target, additionSelector) => {
      const button = document.createElement('button');
      const buttonName = additionSelector.slice(1);
      const buttonSelectorIsId = additionSelector.charAt(0) === '#';

      additionalNameSelectors.forEach((additionalNameSelector) => {
        button.classList.add(additionalNameSelector);
      });

      if (buttonSelectorIsId) {
        button.id = buttonName;
      } else {
        button.classList.add(buttonName);
      }
      if (defaultToggled) {
        button.classList.add('zehnToggled');
      }
      button.name = 'button';
      button.onclick = () => callback(root, target, button);
      if (position) {
        target.append(button);
      } else {
        target.prepend(button);
      }

      const icon = document.createElement('div');
      if (buttonSelectorIsId) {
        icon.id = `${buttonName}Icon`;
      } else {
        icon.classList.add(`${buttonName}Icon`);
      }
      button.append(icon);
    });
  },

  addRootClassOnToggle(root, target, button, buttonTargetToggleName) {
    button.classList.toggle('zehnToggled');
    root.classList.toggle(buttonTargetToggleName, button.classList.contains('zehnToggled'));
  },

  checkButtonToggle(rootSelector, targetSelector, additionName) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      if (root.classList.contains(additionName)) target.classList.toggle('zehnToggled', true);
    });
  },

  checkTargetToggle(rootSelector, targetSelector, additionName, toggleSelector) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      const toggle = root.querySelector(toggleSelector);
      if (target.classList.contains('zehnToggled')) toggle.classList.toggle(additionName, true);
    });
  },

  moveAppend(rootSelector, targetSelector, movingSelectors) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.append(moving);
        });
      });
    });
  },

  moveAppendAndObserve(rootSelector, targetSelector, movingSelectors) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        this.observeForCallback(root, movingSelector, (root, moving) => {
          target.append(moving);
        });
      });
    });
  },

  movePrepend(rootSelector, targetSelector, movingSelectors) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.prepend(moving || '');
        })
      });
    });
  },

  movePrependAndObserve(rootSelector, targetSelector, movingSelectors) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        this.observeForCallback(root, movingSelector, (root, moving) => {
          target.prepend(moving || '');
        })
      });
    });
  },

  moveBefore(rootSelector, targetSelector, movingSelectors) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.before(moving || '');
        })
      });
    });
  },

  moveBeforeAndObserve(rootSelector, targetSelector, movingSelectors) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        this.observeForCallback(root, movingSelector, (root, moving) => {
          target.before(moving || '');
        })
      });
    });
  },

  removeDuplicatedElement(rootSelector, targetSelector, removeableSelector, ordinal) {
    this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
      const removables = target.querySelectorAll(removeableSelector);
      if (removables.length > 1) {
        removables[ordinal].remove();
      }
    });
  },

  addRevealClass(rootSelector, targetSelectors, isList = false) {
    if (getComputedStyle(document.documentElement).getPropertyValue('--zehn-reveal').trim() == 0) return;

    targetSelectors.forEach((targetSelector) => {
      this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
        target.classList.toggle('zehnReveal', true);
        if (isList) target.classList.toggle('zehnRevealList', true);
      });
    });
  },

  addRevealClassOnMutation(rootSelector, targetSelectors, isList = false) {
    if (getComputedStyle(document.documentElement).getPropertyValue('--zehn-reveal').trim() == 0) return;

    targetSelectors.forEach((targetSelector) => {
      this.observeRootForCallback(rootSelector, targetSelector, (root, target) => {
        const observer = new MutationObserver((mutations) => {
          if (mutations.length) {
            target.classList.toggle('zehnReveal', true);
            if (isList) target.classList.toggle('zehnRevealList', true);
          }
        });
        observer.observe(target, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'id', 'style'] });

        return {
          observer,
          disconnect: () => observer.disconnect()
        };
      });
    });
  },

  reveal(rootSelector) {
    if (getComputedStyle(document.documentElement).getPropertyValue('--zehn-reveal').trim() == 0) return;

    this.observeRootForCallback(rootSelector, '.zehnReveal', (root, target) => {
      // const targets = Array.from(document.querySelectorAll('.zehnReveal'));
      const targets = [target];
      const maskSize = 200;
      const halfMask = maskSize / 2;

      let rootRect = root.getBoundingClientRect();
      let targetOffsets = new Map();
      let pending = false;
      let pointerX = 0, pointerY = 0;
      let pointerInside = false;

      function refreshRects() {
        rootRect = root.getBoundingClientRect();
        targetOffsets.clear();
        for (const t of targets) {
          const r = t.getBoundingClientRect();
          targetOffsets.set(t, {
            left: r.left - rootRect.left,
            top: r.top - rootRect.top,
            width: r.width,
            height: r.height,
          });
        }
      }

      function applyMaskToTarget(t, px, py) {
        const pos = `${px}px ${py}px`;
        const size = `${maskSize}px ${maskSize}px`;
        t.style.maskPosition = pos;
        t.style.webkitMaskPosition = pos;
        t.style.maskSize = size;
        t.style.webkitMaskSize = size;
      }

      function hideMaskOnTarget(t) {
        const pos = `0px 0px`;
        const size = `0px 0px`;
        t.style.maskPosition = pos;
        t.style.webkitMaskPosition = pos;
        t.style.maskSize = size;
        t.style.webkitMaskSize = size;
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

      root.addEventListener('pointermove', (e) => {
        pointerX = e.clientX - rootRect.left;
        pointerY = e.clientY - rootRect.top;

        pointerInside =
          pointerX >= 0 &&
          pointerX <= rootRect.width &&
          pointerY >= 0 &&
          pointerY <= rootRect.height;

        if (!pending) {
          pending = true;
          requestAnimationFrame(updateMasks);
        }
      }, { passive: true });

      root.addEventListener('pointerleave', () => {
        pointerInside = false;
        if (!pending) {
          pending = true;
          requestAnimationFrame(updateMasks);
        }
      });

      root.addEventListener('pointerenter', () => {
        refreshRects();
        pointerInside = true;
      });

      let refreshTimer = 100;
      function scheduleRefreshRects() {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(refreshRects, 100);
      }
      window.addEventListener('resize', scheduleRefreshRects, { passive: true });
      window.addEventListener('scroll', scheduleRefreshRects, { passive: true });

      refreshRects();

    });
  }
};

export default Zehn;