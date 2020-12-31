import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store";
import { VueCookieNext } from "vue-cookie-next";

import axios from "axios";

axios.interceptors.request.use(function(config) {
  if (store.getters.isLoggedIn) {
    const token = store.getters.token;
    config.headers.Authorization = token;
  }
  return config;
});

createApp(App)
  .use(store)
  .use(router)
  .use(VueCookieNext)
  .mount("#app");

VueCookieNext.config({ expire: "7d" });
