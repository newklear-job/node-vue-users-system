import { ref, provide, inject } from "vue";

interface Config {
  [key: string]: any;
}

const createI18n = (config: Config) => ({
  locale: ref(config.locale),
  messages: config.messages,
  $t(key: string) {
    return this.messages[this.locale.value][key];
  }
});

const i18nSymbol = Symbol();

export function provideI18n(i18nConfig: Config) {
  const i18n = createI18n(i18nConfig);
  provide(i18nSymbol, i18n);
}

export function useI18n() {
  const i18n = inject(i18nSymbol);
  console.log(i18n);
  if (!i18n) throw new Error("No i18n provided!!!");

  return i18n;
}
