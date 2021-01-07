import { ref, provide, inject } from "vue";

const createI18n = (config: Config): I18n => ({
  locale: ref(config.locale),
  messages: config.messages,
  $t(key) {
    return this.messages[this.locale.value][key];
  }
});

const i18nSymbol = Symbol();

export function provideI18n(i18nConfig: Config): I18n {
  const i18n = createI18n(i18nConfig);
  provide(i18nSymbol, i18n);
  return i18n;
}

export function useI18n(): I18n {
  const i18n: I18n | undefined = inject(i18nSymbol);
  if (!i18n) throw new Error("No i18n provided!!!");
  return i18n;
}

interface Config {
  locale: string;
  messages: { [key: string]: { [key: string]: string } };
}

interface Ref<T> {
  value: T;
}

interface I18n {
  locale: Ref<string>;
  $t(key: string): string;
  messages: { [key: string]: { [key: string]: string } };
}
