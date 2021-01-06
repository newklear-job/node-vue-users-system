import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store";
import { VueCookieNext } from "vue-cookie-next";
import { setup } from "@/setup";
// @ts-expect-error: No ts declaration
import Toaster from "@meforma/vue-toaster";

const app = createApp(App)
  .use(store)
  .use(router)
  .use(Toaster)
  .use(VueCookieNext);

setup(app);

app.mount("#app");

// @ts-expect-error: No ts declaration
const notify = app.$toast;

export { notify }; //todo: working but bad way to export things. May be undefined in setup functions. Unused.
