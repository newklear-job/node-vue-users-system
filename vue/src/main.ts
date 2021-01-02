import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store";
import { VueCookieNext } from "vue-cookie-next";
import { setup } from "@/setup";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(VueCookieNext);

setup(app);

app.mount("#app");
