import { useI18n } from "@/i18n";
import moment from "moment";
import { provide, inject } from "vue";

const formatters = {
  gender(value: string) {
    const i18n = useI18n();
    if (!i18n) return;
    if (value === "m") {
      return i18n.$t("users.male");
    }
    if (value === "f") {
      return i18n.$t("users.female");
    }
    i18n.$t("users.unknown");
  },
  dateTime(value: string) {
    return moment.utc(value).format("YYYY-MM-DD HH:mm:ss");
  }
};

export function provideFormatters() {
  provide("formatters", formatters);
  return formatters;
}

export function useFormatters() {
  return inject("formatters");
}
