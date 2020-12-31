import { VueCookieNext } from "vue-cookie-next";

export const state = {
  token: VueCookieNext.getCookie("token") || ""
};

export type State = typeof state;
