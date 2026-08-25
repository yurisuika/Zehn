import './shared/base.js';
import './shared/slider.js';
import './shared/soundtrack.js';
import './shared/context.js';
import { FIND, STORE, TOGGLE, CREATE, MOVE } from './lib/util.js';
import REVEAL from './lib/reveal.js';

/* ADD SEPARATOR ELEMENT IN NOTIFICATIONS DROPDOWN ------------------------------------------------------------------ */

CREATE.createAdjacentElement('._1UgM1Pm8SbTWX7_2f-crGt', '.MCa4RMSvWJwwWjcZP2wTT', ['.zehnContextSeparator'], { shouldPlaceBefore: false });

/* MOVE SUPERNAV AND ROOT MENU LIST ITEMS INTO CONTAINERS ----------------------------------------------------------- */

CREATE.createIconTextContainer('.Store_Supernav', '.contextMenuItem', ['.zehnSupernav']);
CREATE.createIconTextContainer('.Library_Supernav', '.contextMenuItem', ['.zehnSupernav']);
CREATE.createIconTextContainer('.Community_Supernav', '.contextMenuItem', ['.zehnSupernav']);
CREATE.createIconTextContainer('.Profile_Supernav', '.contextMenuItem', ['.zehnSupernav']);

CREATE.createIconTextContainer('.Steam_Root_Menu', '.contextMenuItem', ['.zehnRootmenu']);
CREATE.createIconTextContainer('.View_Root_Menu', '.contextMenuItem', ['.zehnRootmenu']);
CREATE.createIconTextContainer('.Friends_Root_Menu', '.contextMenuItem', ['.zehnRootmenu']);
CREATE.createIconTextContainer('.Games_Root_Menu', '.contextMenuItem', ['.zehnRootmenu']);
CREATE.createIconTextContainer('.Help_Root_Menu', '.contextMenuItem', ['.zehnRootmenu']);

/* OPEN MILLENNIUM SETTINGS ----------------------------------------------------------------------------------------- */

FIND.findRootsAndTargets('.Steam_Root_Menu', '._2EstNjFIIZm_WUSKm5Wt7n .contextMenuItem:nth-of-type(7)', (root, millenniumEntry) => {
  document.addEventListener('click', (e) => {
    if (e.target === millenniumEntry || millenniumEntry.contains(e.target)) {
      CH.postMessage({
        type: 'APPLY_STYLE',
        style: { display: 'flex' }
      });
    }
  });
});










/* REVEAL NOTIFICATION MENU ----------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._2EstNjFIIZm_WUSKm5Wt7n', [
  '.QFW0BtI4l77AFmv1xLAkx', // ALL
  '._3B8wRA4H7e_oSksYNqpSPv', // STANDARD
  '._25gii5r23MmAqXvLZj24tK', // PINNED WEB
  '._3k90ug209sE23xAMqcM74s' // PINNED DESKTOP
], [
  'zehnRevealRipple'
]);

REVEAL.revealSelf('.QFW0BtI4l77AFmv1xLAkx');
REVEAL.revealSelf('._3B8wRA4H7e_oSksYNqpSPv');
REVEAL.revealSelf('._25gii5r23MmAqXvLZj24tK');
REVEAL.revealSelf('._3k90ug209sE23xAMqcM74s');