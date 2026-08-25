import './shared/base.js';
import './shared/glyph.js';
import './shared/slider.js';
import './shared/spinner.js';
import './shared/switch.js';
import './shared/context.js';
import './shared/pagelist.js';
import { FIND, STORE, TOGGLE, CREATE, MOVE } from './lib/util.js';
import REVEAL from './lib/reveal.js';

/* WRAP FRIEND PICKER CLOSE SVG ------------------------------------------------------------------------------------- */

CREATE.createContainer('.FriendPicker', '.FriendPicker_ChosenFriend .SVGIcon_X_Line', ['.zehnBlurWrapper']);

/* MOVE SCREENSHOT ELEMENTS ----------------------------------------------------------------------------------------- */

MOVE.moveAppend('._2p9h7sf5EGrEVlsWxtvUPH', '.DKXVRVBokaW_Xxo6kyKq0', [
  '._3-jI6bR_mj4JCTwXNFFuuL' // SCREENSHOT CAPTION
]);
MOVE.moveAppend('._2p9h7sf5EGrEVlsWxtvUPH', '._1gvujtNl7v7FpJK6kaMeKZ', [
  '._2yt71EY8-YdWa8dBEE1DAW' // ARTWORK DESCRIPTION
]);

/* MOVE NOTES DELETE BUTTON ----------------------------------------------------------------------------------------- */

MOVE.movePrepend('._1AL7l2CN6z-vuLfp1iCLa', '.LCeIT0gmFTY8fdfaVgk4j', [
  '._1fu6xumTI1nCY5wc6FG_N2 .tool-tip-source' // NOTES DELETE
], { shouldObserve: true });

/* ADD ICON ELEMENTS TO CLOCK BUTTONS-------------------------------------------------------------------------------- */

CREATE.createIconTextContainer('.jSQQl34mj8a4NOKubD6AT', '.HijmccPB1BKyhOwhX1EVl', ['.zehnClock']);

/* MOVE BROWSER TABS INTO TITLEBAR ---------------------------------------------------------------------------------- */

MOVE.movePrepend('._1UJDmU3N-pkv7oTJ_Zf9nK', '.TabbedPopupBrowser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);
MOVE.movePrepend('._1UJDmU3N-pkv7oTJ_Zf9nK', '.OverlayBrowser_Browser .TitleBar.title-area', [
  '.aqvbkhC1ejt4s8QvWA-c5' // BROWSER TABS
]);

/* ADD ICON ELEMENTS TO GROUP CHAT SETTINGS PAGELIST ---------------------------------------------------------------- */

CREATE.createIconTextContainer('.LegacyPopup', '._2YV0m3IRCNOoUV9YhJNFnV', ['.zehnPagelist']);

/* WRAP LEAVE GROUP CHAT TEXT --------------------------------------------------------------------------------------- */

CREATE.createTextWrapper('.LegacyPopup', '._1NqKTWvxtFgflRlqLTtv7e', ['.zehnLeave']);

/* NOTIFICATION SETTINGS MOVE INTO TITLEBAR ------------------------------------------------------------------------- */

MOVE.moveAppend('.LegacyPopup', '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogHeader', [
  '.ChatRoomNotificationSettingsDialog > .DialogContent_InnerWidth > form > .DialogLabel._DialogLayout' // CHAT ROOM NAME
]);










/* REVEAL MEDIA CONTROLBAR ------------------------------------------------------------------------------------------ */

REVEAL.addRevealClass('.YzIcpcz4oFx-nndxro5jE', [
  '._28eIRmQ229ntDIyQXTn3Ub.QE3sHW9puNTAjiRDY71Xy._32Lfwcdolc3ByZWItfR3ni', // BUTTONS
  '._36KTbApKz0VLY9Q6lGt4aH' // SEARCH
]);

REVEAL.revealInner('._21_rrXIoZ7yQbc0u7rhvkP');

/* REVEAL MEDIA PHASELIST ------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.I7UVqVNnVzbkYXnHmvqS2', [
  '.uCBCZOATxD3vzPCGUgDEp' // BUTTONS
], [
  'zehnRevealBorderOnly'
]);

REVEAL.revealSelf('.uCBCZOATxD3vzPCGUgDEp', 300);

/* REVEAL CLOCK/TIMER ----------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._2j-W28YC1xAizcE7x9KkDT', [
  '.DialogButton' // BUTTONS
]);

REVEAL.revealInner('._2j-W28YC1xAizcE7x9KkDT');

/* REVEAL BROWSER URL BAR ------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._26Gmfe09NRsnF7eprTZYdY', [
  '._1W55urU2WazGofFzN0_jHB .DialogInput_Wrapper', // INPUT WRAPPER
  '._1W55urU2WazGofFzN0_jHB:not(:has(input))' // NO INPUT
], [
  'zehnRevealBorderOnly'
]);

REVEAL.addRevealClass('._26Gmfe09NRsnF7eprTZYdY', [
  '._2UTNf-Ec4o5_3LPJtc2u7M._1oXr_GpvIgjHasLyU3tBn', // BUTTONS
  '.extensions-bar-container .extension-button' // EXTENDIUM
]);

REVEAL.revealInner('._26Gmfe09NRsnF7eprTZYdY');

/* REVEAL BROWSER TABS ---------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._290hvyptb3mP0rOSaapjgZ', [
  '.aqvbkhC1ejt4s8QvWA-c5' // TAB CONTAINER
], [
  'zehnRevealBackgroundOnly'
]);

REVEAL.revealSelf('.aqvbkhC1ejt4s8QvWA-c5');

/* REVEAL SERVERS --------------------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('._341mdPDkZV7JkbIxGBREsd', [
  '.DialogButton' // FOOTER BUTTONS
]);

REVEAL.revealInner('._341mdPDkZV7JkbIxGBREsd');

/* REVEAL GROUP CHAT SETTINGS --------------------------------------------------------------------------------------- */

REVEAL.addRevealClass('.xSTLmzylFJdIfak7ZdhuA', [
  '._2YV0m3IRCNOoUV9YhJNFnV', // LIST ENTRY
  '._1NqKTWvxtFgflRlqLTtv7e' // LEAVE
], [
  'zehnRevealBackgroundOnly',
  'zehnRevealRipple'
]);

REVEAL.revealInner('.xSTLmzylFJdIfak7ZdhuA');

/* REVEAL EXTENDIUM PANELS ------------------------------------------------------------------------------------------ */

REVEAL.addRevealClass('.extension-manager-popup', [
  '.extension-card' // EXTENSION CARD
], [
  'zehnRevealBorderOnly'
]);

REVEAL.revealSelf('.extension-card', 300);