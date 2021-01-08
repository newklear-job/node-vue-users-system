import axios from "axios";
import { useStore } from "@/store";
import { VueCookieNext } from "vue-cookie-next";
import moment from "moment";
import { App } from "vue";
import { notify } from "@/services/notify";
import { useI18n } from "@/i18n";

function setup(app: App) {
  const store = useStore();

  VueCookieNext.config({ expire: "7d" });

  axios.interceptors.request.use(function(config) {
    if (store.getters.isLoggedIn) {
      const token = store.getters.token;
      config.headers.Authorization = token;
    }
    return config;
  });

  axios.interceptors.response.use(undefined, function(error) {
    return new Promise(function(resolve, reject) {
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        notify.error(error.response.data.errors[0].message);
        store.dispatch("logout", null);
        // you can also redirect to /login if needed !
      }
      reject(error);
    });
  });

  app.config.globalProperties.$format = {
    gender(value: string) {
      const i18n = useI18n();
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
}

export { setup };
