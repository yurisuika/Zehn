const Zehn = {
  addUserAgent() {
    if (navigator.userAgent.includes('Linux')) {
      document.documentElement.classList.add('Linux');
    } else if (navigator.userAgent.includes('Windows')) {
      document.documentElement.classList.add('Windows');
    }
  },

  findRootsAndTargets(rootSelector, targetSelector, callback) {
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
              if (node.querySelectorAll) node.querySelectorAll(targetSelector).forEach(n => handleTarget(root, n));
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

  findTargets(root, targetSelector, callback, shouldDisconnect = true) {
    const processed = new WeakSet();

    function handleTarget(target) {
      if (processed.has(target)) return;
      processed.add(target);
      try { callback(target); } catch (e) { console.error(e); }
    }

    document.querySelectorAll(targetSelector).forEach(t => handleTarget(t));

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;
              if (node.matches && node.matches(targetSelector)) handleTarget(node);
              if (node.querySelectorAll) node.querySelectorAll(targetSelector).forEach(n => handleTarget(n));
          }
        }
      }
    });
    observer.observe(root, { childList: true, subtree: true });

    if (shouldDisconnect) {
      return {
        disconnect() {
          observer.disconnect();
        }
      };
    } else {
      return observer;
    }
  },

  handleOnMutation(rootSelector, targetSelector, callback, shouldObserveTarget = false) {
    Zehn.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const update = () => callback(root, target);

      update();

      const observer = new MutationObserver(update);
      observer.observe((shouldObserveTarget ? target : root), { childList: true, subtree: true });

      return observer;
    });
  },

  handleOnFirstMutation(rootSelector, targetSelector, callback, shouldObserveTarget = false) {
    Zehn.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const update = () => callback(root, target);

      update();

      const observer = new MutationObserver(update);
      observer.observe((shouldObserveTarget ? target : root), { childList: true, subtree: true, attributeFilter: ['class', 'id', 'style'] });

      return {
        observer,
        disconnect: () => observer.disconnect()
      };
    });
  },

  storeTargetHeightAsVariable(rootSelector, targetSelector, variableName) {
    Zehn.handleOnMutation(rootSelector, targetSelector, (root, target) => {
      document.documentElement.style.setProperty(variableName, `${target.offsetHeight}px`);
    }, true);
  },

  toggleClassWithPresence(rootSelector, targetSelector, pageSelector, toggleName) {
    this.handleOnMutation(rootSelector, targetSelector, (root, target) => {
      const present = !!document.querySelector(pageSelector);
      target.classList.toggle(toggleName, present);
    });
  },

  nameElement(element, nameSelector) {
    const name = nameSelector.slice(1);
    const isId = nameSelector.charAt(0) === '#';

    if (isId) {
      element.id = name;
    } else {
      element.classList.add(name);
    }
  },

  createButton(rootSelector, targetSelector, nameSelectors, callback, shouldAppend = true) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const button = document.createElement('button');
      button.name = 'button';
      button.onclick = () => callback(root, target, button);
      nameSelectors.forEach((nameSelector) => {
        this.nameElement(button, nameSelector);
      });
      if (shouldAppend) {
        target.append(button);
      } else {
        target.prepend(button);
      }

      const icon = document.createElement('div');
      icon.classList.add(`zehnIcon`);
      button.append(icon);
    });
  },

  createIconTitleContainer(rootSelector, targetSelector, shouldAppend = true) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      if (target.children.length == 0) {
        const container = document.createElement('div');
        container.classList.add('zehnListContainer');
        if (shouldAppend) {
          target.append(container);
        } else {
          target.prepend(container);
        }

        const title = document.createElement('div');
        title.classList.add('zehnListTitle');
        container.append(title);
        title.textContent = target.childNodes[0].textContent;
        target.childNodes[0].remove();

        const icon = document.createElement('div');
        icon.classList.add('zehnListIcon');
        container.prepend(icon);
      }
    });
  },

  createIconContainer(targetSelector, nameSelectors, shouldAppend = true) {
    this.findTargets(document, targetSelector, (target) => {
      const container = document.createElement('div');
      container.classList.add('zehnContainer');
      nameSelectors.forEach((nameSelector) => {
        this.nameElement(container, nameSelector);
      });
      if (shouldAppend) {
        target.append(container);
      } else {
        target.prepend(container);
      }

      const icon = document.createElement('div');
      icon.classList.add('zehnIcon');
      container.prepend(icon);
    });
  },

  createContainer(rootSelector, targetSelector, nameSelectors, shouldAppend = true) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const container = document.createElement('div');
      container.classList.add('zehnContainer');
      nameSelectors.forEach((nameSelector) => {
        this.nameElement(container, nameSelector);
      });
      if (shouldAppend) {
        root.append(container);
      } else {
        root.prepend(container);
      }

      container.append(target);
    });
  },

  createAdjacentElement(rootSelector, targetSelector, nameSelectors, shouldPlaceBefore = true, elementType = 'div') {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const element = document.createElement(elementType);
      nameSelectors.forEach((nameSelector) => {
        this.nameElement(element, nameSelector);
      });
      if (shouldPlaceBefore) {
        target.before(element || '');
      } else {
        target.after(element || '');
      }
    });
  },

  addRootClassOnToggle(root, target, button, buttonTargetToggleName) {
    button.classList.toggle('zehnToggled');
    root.classList.toggle(buttonTargetToggleName, button.classList.contains('zehnToggled'));
  },

  checkButtonToggle(rootSelector, targetSelector, additionName) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      if (root.classList.contains(additionName)) target.classList.toggle('zehnToggled', true);
    });
  },

  checkTargetToggle(rootSelector, targetSelector, additionName, toggleSelector) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      const toggle = root.querySelector(toggleSelector);
      if (target.classList.contains('zehnToggled')) toggle.classList.toggle(additionName, true);
    });
  },

  moveAppend(rootSelector, targetSelector, movingSelectors) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.append(moving);
        });
      });
    });
  },

  moveAppendAndObserve(rootSelector, targetSelector, movingSelectors) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        this.findTargets(root, movingSelector, (moving) => {
          target.append(moving);
        });
      });
    });
  },

  movePrepend(rootSelector, targetSelector, movingSelectors) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.prepend(moving || '');
        })
      });
    });
  },

  movePrependAndObserve(rootSelector, targetSelector, movingSelectors) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        this.findTargets(root, movingSelector, (moving) => {
          target.prepend(moving || '');
        })
      });
    });
  },

  moveBefore(rootSelector, targetSelector, movingSelectors) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        root.querySelectorAll(movingSelector).forEach((moving) => {
          target.before(moving || '');
        })
      });
    });
  },

  moveBeforeAndObserve(rootSelector, targetSelector, movingSelectors) {
    this.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
      movingSelectors.forEach((movingSelector) => {
        this.findTargets(root, movingSelector, (moving) => {
          target.before(moving || '');
        })
      });
    });
  },

  removeDuplicatedElement(rootSelector, targetSelector, removeableSelector, ordinal) {
    this.handleOnMutation(rootSelector, targetSelector, (root, target) => {
      const removables = target.querySelectorAll(removeableSelector);
      if (removables.length > 1) {
        removables[ordinal].remove();
      }
    });
  },

  addRevealClass(rootSelector, targetSelectors, additionalNames = []) {
    targetSelectors.forEach((targetSelector) => {
      this.handleOnFirstMutation(rootSelector, targetSelector, (root, target) => {
        target.classList.toggle('zehnReveal', true);
        additionalNames.forEach(name => {target.classList.toggle(name, true)});
      });
    });
  },

  revealInner(containerSelector) {
    if (getComputedStyle(document.documentElement).getPropertyValue('--zehn-reveal').trim() == 0) return;

    this.findRootsAndTargets(containerSelector, '.zehnReveal', (container, revealed) => {
      this.reveal(container, revealed);
    });
  },

  revealSelf(selfSelector) {
    if (getComputedStyle(document.documentElement).getPropertyValue('--zehn-reveal').trim() == 0) return;

    this.findTargets(document, selfSelector, (revealed) => {
      this.reveal(revealed, revealed);
    }, false);
  },

  reveal(container, revealed) {
    const targets = [revealed];
    const maskSize = 200;
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

    let refreshTimer = 100;
    function scheduleRefreshRects() {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(refreshRects, 100);
    }
    window.addEventListener('resize', scheduleRefreshRects, { passive: true });
    window.addEventListener('scroll', scheduleRefreshRects, { passive: true });

    refreshRects();
  }
};

export default Zehn;