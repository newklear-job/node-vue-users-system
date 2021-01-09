import { ref } from "vue";
import Translations from "@/i18n/translations";

let i18n: I18n | undefined;

const createI18n = ({ locale, messages = Translations }: Config): I18n => ({
  locale: ref(locale),
  messages: messages,
  $t(key) {
    return this.messages[this.locale.value][key];
  }
});

export function initI18n(i18nConfig: Config): I18n {
  i18n = createI18n(i18nConfig);
  return i18n;
}

export function useI18n(): I18n {
  if (!i18n) throw new Error("i18n not initialised!!!");
  return i18n;
}

export interface Config {
  locale: string;
  messages?: { [key: string]: { [key: string]: string } };
}

export interface Ref<T> {
  value: T;
}

export interface I18n {
  locale: Ref<string>;
  $t(key: string): string;
  messages: { [key: string]: { [key: string]: string } };
}
