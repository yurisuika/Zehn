import './shared/base.js';
import './shared/slider.js';
import './shared/spinner.js';
import './shared/switch.js';
import './shared/context.js';
import './shared/pagelist.js';
import { FIND, STORE, TOGGLE, CREATE, MOVE } from './lib/util.js';
import REVEAL from './lib/reveal.js';

/* ADD ICON ELEMENTS TO GROUP CHAT SETTINGS PAGELIST ---------------------------------------------------------------- */

CREATE.createIconTextContainer('.LegacyPopup', '._2YV0m3IRCNOoUV9YhJNFnV', ['.zehnPagelist']);

/* WRAP LEAVE GROUP CHAT TEXT --------------------------------------------------------------------------------------- */

CREATE.createTextWrapper('.LegacyPopup', '._1NqKTWvxtFgflRlqLTtv7e', ['.zehnLeave']);

/* NOTIFICATION SETTINGS MOVE INTO TITLEBAR ------------------------------------------------------------------------- */

MOVE.moveAppend('.LegacyPopup', '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', [
  '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout' // CHAT ROOM NAME
]);










/* REVEAL GROUP CHAT SETTINGS --------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.xSTLmzylFJdIfak7ZdhuA', [
  '._2YV0m3IRCNOoUV9YhJNFnV', // LIST ENTRY
  '._1NqKTWvxtFgflRlqLTtv7e' // LEAVE
], [
  'zehnRevealBackgroundOnly',
  'zehnRevealRipple'
]);

REVEAL.revealInner('.xSTLmzylFJdIfak7ZdhuA');