import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store";
import { VueCookieNext } from "vue-cookie-next";
import { setup } from "@/setup";

createApp(App)
  .use(store)
  .use(router)
  .use(VueCookieNext)
  .mount("#app");

setup();
