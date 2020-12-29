import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store";

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
  .mount("#app");
