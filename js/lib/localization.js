export const LOCALIZATION = {
  getLocalizationJson,
  localize,
};
export default LOCALIZATION;

/* LOCALIZATION ----------------------------------------------------------------------------------------------------- */

async function getLocalizationJson() {
  const RESPONSE = await fetch(
    new URL("../../data/localization.json", import.meta.url)
  );
  if (!RESPONSE.ok) {
    throw new Error("Failed to load localization JSON");
  }
  return await RESPONSE.json();
};

async function localize(data, langCode, langKey) {
  let translations = data[langCode];

  if (!translations) {
    console.warn(`Language "${langCode}" was not found, falling back to English...`);
    translations = data.en;
  }

  if (!Object.hasOwn(translations, langKey)) {
    throw new Error(`Localization key "${langKey}" was not found`);
  }

  return translations[langKey];
};