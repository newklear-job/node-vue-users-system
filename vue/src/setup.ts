import axios from "axios";
import { useStore } from "@/store";
import { VueCookieNext } from "vue-cookie-next";

function setup() {
  const store = useStore();

  VueCookieNext.config({ expire: "7d" });

  axios.interceptors.request.use(function(config) {
    if (store.getters.isLoggedIn) {
      const token = store.getters.token;
      config.headers.Authorization = token;
    }
    return config;
  });

  axios.interceptors.response.use(undefined, function(err) {
    return new Promise(function(resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        // if you ever get an unauthorized, logout the user
        store.dispatch("logout", null);
        // you can also redirect to /login if needed !
      }
      reject(err);
    });
  });
}

export { setup };
