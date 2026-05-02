import Zehn from './../js/zehn.js';
import Options from './../js/options.js';

/* ADD USER AGENT --------------------------------------------------------------------------------------------------- */

Zehn.addUserAgent();

/* ENABLE CONFIG WITHOUT MILLENNIUM --------------------------------------------------------------------------------- */

Options.setOptions();

/* SET SCROLLBAR GLYPH COLORS --------------------------------------------------------------------------------------- */

Zehn.setGlyphColor();

/* REVEAL CONTEXT EXTENDIUM ----------------------------------------------------------------------------------------- */

Zehn.addRevealClass('.extendium.Extensions .ContextMenuPopupBody', [
  '.eKmEXJCm_lgme24Fp_HWt._2HuzvKQ2QMUJ-JJOeApaF1 ._3jMlJm4PQCA8SfNlUR99Fo' // CONTEXT ENTRY
]);

Zehn.revealSelf('.eKmEXJCm_lgme24Fp_HWt._2HuzvKQ2QMUJ-JJOeApaF1 ._3jMlJm4PQCA8SfNlUR99Fo.zehnReveal');