import './shared/base.js';
import './shared/slider.js';
import './shared/soundtrack.js';
import './shared/context.js';
import { FIND, STORE, TOGGLE, CREATE, MOVE } from './lib/util.js';
import REVEAL from './lib/reveal.js';

/* ADD SEPARATOR ELEMENT IN NOTIFICATIONS DROPDOWN ------------------------------------------------------------------ */

CREATE.createElement('._1UgM1Pm8SbTWX7_2f-crGt', '.MCa4RMSvWJwwWjcZP2wTT', ['.zehnContextSeparator'], { placement: 'after' });

/* MOVE SUPERNAV AND ROOT MENU LIST ITEMS INTO CONTAINERS ----------------------------------------------------------- */

CREATE.createIconContainer('.Store_Supernav', '.contextMenuItem', ['.zehnSuperNavEntry'], ['.zehnContextIcon'], { placement: 'prepend' });
CREATE.createIconContainer('.Library_Supernav', '.contextMenuItem', ['.zehnSuperNavEntry'], ['.zehnContextIcon'], { placement: 'prepend' });
CREATE.createIconContainer('.Community_Supernav', '.contextMenuItem', ['.zehnSuperNavEntry'], ['.zehnContextIcon'], { placement: 'prepend' });
CREATE.createIconContainer('.Profile_Supernav', '.contextMenuItem', ['.zehnSuperNavEntry'], ['.zehnContextIcon'], { placement: 'prepend' });

CREATE.createIconContainer('.Steam_Root_Menu', '.contextMenuItem', ['.zehnRootMenuEntry'], ['.zehnContextIcon'], { placement: 'prepend' });
CREATE.createIconContainer('.View_Root_Menu', '.contextMenuItem', ['.zehnRootMenuEntry'], ['.zehnContextIcon'], { placement: 'prepend' });
CREATE.createIconContainer('.Friends_Root_Menu', '.contextMenuItem', ['.zehnRootMenuEntry'], ['.zehnContextIcon'], { placement: 'prepend' });
CREATE.createIconContainer('.Games_Root_Menu', '.contextMenuItem', ['.zehnRootMenuEntry'], ['.zehnContextIcon'], { placement: 'prepend' });
CREATE.createIconContainer('.Help_Root_Menu', '.contextMenuItem', ['.zehnRootMenuEntry'], ['.zehnContextIcon'], { placement: 'prepend' });

/* OPEN MILLENNIUM SETTINGS ----------------------------------------------------------------------------------------- */

FIND.findRootsAndTargets('.Steam_Root_Menu', '._2EstNjFIIZm_WUSKm5Wt7n .contextMenuItem:nth-of-type(7)', (root, millenniumEntry) => {
  const CH = new BroadcastChannel('millennium-settings-sync');

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