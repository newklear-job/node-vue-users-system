import axios from "axios";
import { useStore } from "@/store";
import { VueCookieNext } from "vue-cookie-next";
import { App } from "vue";
import { notify } from "@/services/notify";

function setup(_app: App) {
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
        error.response &&
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
}
export { setup };
