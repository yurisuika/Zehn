import { FIND, STORE, TOGGLE, CREATE, MOVE } from '../lib/util.js';
import LOCALIZATION from '../lib/localization.js';
import { CURRENT_LANG, LOCALIZATION_JSON } from './data.js';

/* CREATE LOCALIZED ON/OFF LABELS FOR SWITCHES ---------------------------------------------------------------------- */

async function addLocalizedLabels(...switchSelector) {
  let localOn = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Dialog_On");
  let localOff = await LOCALIZATION.localize(LOCALIZATION_JSON, CURRENT_LANG, "Dialog_Off");
  
  for (var sel of [...switchSelector]) {
    CREATE.createText('html', sel, ['.zehnLabelOn'], localOn);
    CREATE.createText('html', sel, ['.zehnLabelOff'], localOff);
  }
};

addLocalizedLabels(
  '._9Ql-oVe_j8E-vsDdyVdWo', // GAMEPAD
  '._3Sl0QHQ69uK7ZMQo5vBfrA', // WHAT'S NEW & FRIENDS SETTINGS
  '.DialogToggleField_OptionPanel' // OLD CHAT DIALOGS
);