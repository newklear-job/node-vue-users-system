import enTranslations from "./en";
import uaTranslations from "./ua";

function prefixTranslationKeysWithFileNames(byFiles: {
  [key: string]: { [key: string]: string };
}) {
  const translations: { [key: string]: string } = {};
  for (const [fileName, fileTranslations] of Object.entries(byFiles)) {
    for (const [translationKey, translationValue] of Object.entries(
      fileTranslations
    )) {
      translations[`${fileName}.${translationKey}`] = translationValue;
    }
  }
  return translations;
}

export default {
  en: prefixTranslationKeysWithFileNames(enTranslations),
  ua: prefixTranslationKeysWithFileNames(uaTranslations)
};
