import LOCALIZATION from '../lib/localization.js';

/* LOAD LOCALIZATION JSON ------------------------------------------------------------------------------------------- */

const CURRENT_LANG = document.documentElement.lang;
const LOCALIZATION_JSON = await LOCALIZATION.getLocalizationJson();

export { CURRENT_LANG, LOCALIZATION_JSON };