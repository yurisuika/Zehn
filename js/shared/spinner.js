import { FIND, STORE, TOGGLE, CREATE, MOVE } from '../lib/util.js';

/* CREATE SPINNER --------------------------------------------------------------------------------------------------- */

function createSpinner(rootSelector, targetSelector) {
  FIND.findRootsAndTargets(rootSelector, targetSelector, (root, target) => {
    const SPINNER = document.createElement('div');
    SPINNER.classList.add('zehnSpinner');

    const HOLDER = document.createElement('div');
    HOLDER.classList.add('zehnHolder');
    SPINNER.appendChild(HOLDER);

    for (let i = 1; i <= 6; i++) {
      const DOT = document.createElement('div');
      DOT.className = `zehnDot${i}`;
      HOLDER.appendChild(DOT);
    }

    target.prepend(SPINNER);
    return SPINNER;
  });
};

createSpinner('html', '.VicgWmz2sj_UUd0XKXvFQ'); // BROWSER
createSpinner('html', '._3CN5DkgNMvdtT9fJhNOj_v'); // LOGIN
createSpinner('html', '._2wAKy-0ZkO_vhbiQCP9MgE'); // CHAT