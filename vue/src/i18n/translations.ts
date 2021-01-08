import enTranslations from "./en";
import uaTranslations from "./ua";

export default {
  en: formatTranslations(enTranslations),
  ua: formatTranslations(uaTranslations)
};

function formatTranslations(byFiles: {
  [key: string]: { [key: string]: string };
}) {
  let translations: { [key: string]: string } = {};
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
  fileTranslations: {
    [key: string]: string;
  }
) {
  const translations: { [key: string]: string } = {};
  for (const [translationKey, translationValue] of Object.entries(
    fileTranslations
  )) {
    translations[`${fileName}.${translationKey}`] = translationValue;
  }
  return translations;
}
