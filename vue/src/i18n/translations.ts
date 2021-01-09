import enTranslationsByFiles from "./en";
import uaTranslationsByFiles from "./ua";

export default {
  en: formatTranslations(enTranslationsByFiles),
  ua: formatTranslations(uaTranslationsByFiles)
};

function formatTranslations(byFiles: {
  [fileName: string]: Translations;
}): Translations {
  let translations: Translations = {};
  for (const [fileName, fileTranslations] of Object.entries(byFiles)) {
    translations = {
      ...translations,
      ...prefixTranslationKeysWithFileNames(fileName, fileTranslations)
    };
  }
  return translations;
}

function prefixTranslationKeysWithFileNames(
  fileName: string,
  fileTranslations: Translations
): Translations {
  const translations: Translations = {};
  for (const [translationKey, translationValue] of Object.entries(
    fileTranslations
  )) {
    translations[`${fileName}.${translationKey}`] = translationValue;
  }
  return translations;
}

interface Translations {
  [translationKey: string]: string;
}
