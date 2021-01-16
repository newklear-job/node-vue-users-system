import { useI18n, I18n } from "@/i18n";
import moment from "moment";

let i18n: I18n | undefined;

const formatters = {
  gender(value: string) {
    if (!i18n) return;
    if (value === "m") {
      return i18n.$t("users.male");
    }
    if (value === "f") {
      return i18n.$t("users.female");
    }
    return i18n.$t("users.unknown");
  },
  dateTime(value: string) {
    return moment.utc(value).format("YYYY-MM-DD HH:mm:ss");
  }
};

export function useFormatters() {
  if (!i18n) i18n = useI18n();
  return formatters;
}
