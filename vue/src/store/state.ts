import { VueCookieNext } from "vue-cookie-next";

export const state = {
  token: VueCookieNext.getCookie("token") || "",
  permissions: [] as Array<string>
};

export type State = typeof state;
