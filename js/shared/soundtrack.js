import { FIND, STORE, TOGGLE, CREATE, MOVE } from '../lib/util.js';

/* CREATE MISSING SLIDER HANDLE (SUCH AS SOUNDTRACK) ---------------------------------------------------------------- */

FIND.findRootsAndTargets('._198v6zB5mZ5FWG0wpQU_3m.SliderControlPanelGroup', '._1udlGGE4F5pggcpxovorUd.SliderControl', (root, target) => {
  if (!target.querySelector("._8xNY6EWVZsDfOfUqDrus-.SliderHandleContainer")) {
    const CONTAINER = document.createElement('div');
    const HANDLE = document.createElement('div');

    CONTAINER.classList.add("_8xNY6EWVZsDfOfUqDrus-", "SliderHandleContainer");
    HANDLE.classList.add("_11PBfip2UlKlY3vWSz8PA4", "SliderHandle");

    CONTAINER.appendChild(HANDLE);
    target.appendChild(CONTAINER);
  }
});